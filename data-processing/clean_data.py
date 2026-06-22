import pandas as pd
import os

# folders
RAW_DIR = os.path.join(os.path.dirname(__file__), "raw")
PROC_DIR = os.path.join(os.path.dirname(__file__), "processed")
os.makedirs(PROC_DIR, exist_ok=True)


def load(name):
    df = pd.read_csv(os.path.join(RAW_DIR, name))
    print(f"loaded {name} -> {df.shape[0]} rows, {df.shape[1]} cols")
    return df


# ---------------------------------------------------------------
# categories
# ---------------------------------------------------------------
print("\ncategories")
categories = load("categories.csv")
categories.drop_duplicates(inplace=True)
categories["category_name"] = categories["category_name"].str.strip()
categories.to_csv(os.path.join(PROC_DIR, "categories_clean.csv"), index=False)


# ---------------------------------------------------------------
# products
# ---------------------------------------------------------------
print("\nproducts")
products = load("products.csv")
before = len(products)
products.drop_duplicates(inplace=True)

products["product_name"] = products["product_name"].str.strip().str.title()

# price and cost have to be positive numbers, otherwise margin makes no sense
products = products[(products["price"] > 0) & (products["cost_price"] > 0)]

# every product should belong to a category that actually exists
valid_cats = categories["category_id"].tolist()
products = products[products["category_id"].isin(valid_cats)]

# margin per product, used later for profitability stats
products["margin_amount"] = (products["price"] - products["cost_price"]).round(2)
products["margin_pct"] = ((products["margin_amount"] / products["price"]) * 100).round(2)

print(f"removed {before - len(products)} rows (bad prices / unknown category)")
products.to_csv(os.path.join(PROC_DIR, "products_clean.csv"), index=False)


# ---------------------------------------------------------------
# customers
# ---------------------------------------------------------------
print("\ncustomers")
customers = load("customers.csv")
before = len(customers)
customers.drop_duplicates(inplace=True)

customers["name"] = customers["name"].str.strip().str.title()
customers["city"] = customers["city"].str.strip().str.title()
customers["state"] = customers["state"].str.strip().str.title()
customers["email"] = customers["email"].str.strip().str.lower()

customers["signup_date"] = pd.to_datetime(customers["signup_date"], errors="coerce")
customers.dropna(subset=["signup_date"], inplace=True)

# same person can show up more than once with the same email, keep the first one
dup_count = customers["email"].duplicated().sum()
customers.drop_duplicates(subset=["email"], keep="first", inplace=True)
print(f"removed {dup_count} duplicate emails")

print(f"removed {before - len(customers)} rows total")
customers.to_csv(os.path.join(PROC_DIR, "customers_clean.csv"), index=False)


# ---------------------------------------------------------------
# orders
# ---------------------------------------------------------------
print("\norders")
orders = load("orders.csv")
before = len(orders)
orders.drop_duplicates(inplace=True)

# drop orders pointing to a customer_id we no longer have
valid_customers = customers["customer_id"].tolist()
orphan_count = (~orders["customer_id"].isin(valid_customers)).sum()
orders = orders[orders["customer_id"].isin(valid_customers)]
print(f"removed {orphan_count} orders with unknown customer_id")

orders["order_status"] = orders["order_status"].str.strip().str.title()
orders["payment_method"] = orders["payment_method"].str.strip().str.title()

VALID_STATUSES = {"Delivered", "In Transit", "Canceled"}
VALID_PAYMENTS = {"Cash On Delivery", "Net Banking", "Upi", "Loyalty Points"}
orders = orders[
    orders["order_status"].isin(VALID_STATUSES)
    & orders["payment_method"].isin(VALID_PAYMENTS)
]

print(f"removed {before - len(orders)} rows total")
orders.to_csv(os.path.join(PROC_DIR, "orders_clean.csv"), index=False)


# ---------------------------------------------------------------
# order_items
# ---------------------------------------------------------------
print("\norder_items")
order_items = load("order_items.csv")
before = len(order_items)
order_items.drop_duplicates(inplace=True)

valid_orders = orders["order_id"].tolist()
valid_products = products["product_id"].tolist()
orphan_orders = (~order_items["order_id"].isin(valid_orders)).sum()
orphan_products = (~order_items["product_id"].isin(valid_products)).sum()

order_items = order_items[
    order_items["order_id"].isin(valid_orders)
    & order_items["product_id"].isin(valid_products)
]
print(f"removed {orphan_orders} rows with unknown order_id")
print(f"removed {orphan_products} rows with unknown product_id")

# quantity per line is capped 1-5 according to the data spec we got
order_items = order_items[
    (order_items["quantity"] >= 1)
    & (order_items["quantity"] <= 5)
    & (order_items["unit_price"] > 0)
]

order_items["line_total"] = (order_items["quantity"] * order_items["unit_price"]).round(2)

print(f"removed {before - len(order_items)} rows total")
order_items.to_csv(os.path.join(PROC_DIR, "order_items_clean.csv"), index=False)


# ---------------------------------------------------------------
# returns
# ---------------------------------------------------------------
print("\nreturns")
returns = load("returns.csv")
before = len(returns)
returns.drop_duplicates(inplace=True)

valid_items = order_items["order_item_id"].tolist()
orphan_returns = (~returns["order_item_id"].isin(valid_items)).sum()
returns = returns[returns["order_item_id"].isin(valid_items)]
print(f"removed {orphan_returns} returns with unknown order_item_id")

returns["return_date"] = pd.to_datetime(returns["return_date"], errors="coerce")
returns.dropna(subset=["return_date"], inplace=True)
returns = returns[returns["refund_amount"] > 0]

print(f"removed {before - len(returns)} rows total")
returns.to_csv(os.path.join(PROC_DIR, "returns_clean.csv"), index=False)


# ---------------------------------------------------------------
# add order_total / item_count to orders, and total_spent / order_count to customers
# (needed these for the dashboard KPIs, easier to precompute here)
# ---------------------------------------------------------------
print("\nenrichment")

order_totals = (
    order_items.groupby("order_id")
    .agg(order_total=("line_total", "sum"), item_count=("order_item_id", "count"))
    .reset_index()
)
orders = orders.merge(order_totals, on="order_id", how="left")
orders["order_total"] = orders["order_total"].round(2)
orders.to_csv(os.path.join(PROC_DIR, "orders_clean.csv"), index=False)

# only counting delivered orders towards customer lifetime spend
delivered = orders[orders["order_status"] == "Delivered"]
customer_totals = (
    delivered.groupby("customer_id")
    .agg(total_spent=("order_total", "sum"), order_count=("order_id", "count"))
    .reset_index()
)
customers = customers.merge(customer_totals, on="customer_id", how="left")
customers["total_spent"] = customers["total_spent"].fillna(0).round(2)
customers["order_count"] = customers["order_count"].fillna(0).astype(int)
customers.to_csv(os.path.join(PROC_DIR, "customers_clean.csv"), index=False)

print("done - orders_clean and customers_clean updated with extra columns")


# ---------------------------------------------------------------
# final recap
# ---------------------------------------------------------------
print("\n--- summary ---")
files = {
    "categories_clean.csv": "categories",
    "customers_clean.csv": "customers",
    "orders_clean.csv": "orders",
    "order_items_clean.csv": "order_items",
    "products_clean.csv": "products",
    "returns_clean.csv": "returns",
}
for fname, label in files.items():
    df = pd.read_csv(os.path.join(PROC_DIR, fname))
    print(f"{label:12s} {df.shape[0]:>6} rows  {df.shape[1]:>2} cols")
