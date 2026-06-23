# Data Processing - Week 1

This folder has the raw data, the cleaning script, and the cleaned output for EcomDash.

## Folder structure

```
data-processing/
├── Data_Extraction.py     -> pulls/generates the raw csv files
├── clean_data.py          -> cleans everything, run this one
├── raw/                   -> original data, untouched
│   ├── categories.csv
│   ├── customers.csv
│   ├── orders.csv
│   ├── order_items.csv
│   ├── products.csv
│   └── returns.csv
└── processed/              -> output after cleaning
    ├── categories_clean.csv
    ├── customers_clean.csv
    ├── orders_clean.csv
    ├── order_items_clean.csv
    └── products_clean.csv
```

Note: `returns` is not cleaned/processed - we're not using that table for this project, so it's skipped on purpose (the code for it is still in `clean_data.py`, just commented out, in case we need it later).

## How to run it

```bash
cd data-processing
python clean_data.py
```

It reads everything from `raw/` and writes the cleaned files into `processed/`. Needs `pandas` installed (`pip install pandas`).

## What the script does

Went table by table and fixed what was broken:

- **categories**: just removed duplicate rows, kept `category_name` exactly as-is (not modifying it so the dataset still reflects the original wording)
- **products**: removed rows with price or cost <= 0, removed products linked to a category_id that doesn't exist, added `margin_amount` and `margin_pct` columns
- **customers**: cleaned up name/city/state capitalization, lowercased emails, parsed signup_date properly, removed 22 duplicate emails (same person registered more than once)
- **orders**: removed 42 orders linked to a customer_id that isn't in the customers table, removed rows with invalid status or payment method
- **order_items**: removed 71 rows linked to an order_id that got dropped, removed rows with quantity outside 1-5 or price <= 0, added `line_total`
- **returns**: not processed - we don't need this table for the project

After cleaning each table, it also calculates and adds:
- `order_total` and `item_count` on orders (sum/count from order_items)
- `total_spent` and `order_count` on customers (only counting delivered orders)

## Row counts before/after

| Table | Raw rows | Clean rows | Dropped |
|---|---|---|---|
| categories | 6 | 6 | 0 |
| products | 300 | 300 | 0 |
| customers | 5000 | 4978 | 22 |
| orders | 9000 | 8958 | 42 |
| order_items | 15000 | 14929 | 71 |

## Notes

- Dropped rows instead of trying to fix them, since these are broken foreign keys (pointing to records that don't exist) - nothing to "fix", they just shouldn't be there.
- `total_spent` only counts delivered orders on purpose, otherwise it would include canceled/in-transit orders that haven't actually been paid through yet.
