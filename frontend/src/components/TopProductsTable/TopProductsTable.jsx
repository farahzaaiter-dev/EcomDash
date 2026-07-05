import { useEffect, useState } from "react";
import { Card, Table, ProgressBar } from "react-bootstrap";
import { getTopProducts } from "../../services/kpiService";

const TopProductsTable = ({ limit = 4 }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getTopProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const visibleProducts = products.slice(0, limit);
  const maxQuantity =
    products.length > 0
      ? Math.max(...products.map((p) => p.totalQuantity))
      : 0;

  return (
    <Card className="shadow-sm border-0 rounded-4 mt-4">
      <Card.Body>

        <h5 className="fw-bold mb-4">
          TOP 10 PRODUITS LES PLUS VENDUS
        </h5>

        <Table responsive hover borderless className="align-middle">

          <thead>
            <tr className="text-secondary">
              <th style={{ width: "70px" }}>#</th>
              <th>Produit</th>
              <th className="text-end">Quantité</th>
            </tr>
          </thead>

          <tbody>

            {visibleProducts.map((product, index) => (
              <tr key={index}>

                <td>

                  {index < 3 ? (
                    <span
                      className="rounded-circle d-inline-flex justify-content-center align-items-center fw-bold"
                      style={{
                        width: 28,
                        height: 28,
                        background: "#FFF3CD",
                        color:
                          index === 0
                            ? "#E6A700"
                            : index === 1
                            ? "#6C757D"
                            : "#FF6B00",
                      }}
                    >
                      {index + 1}
                    </span>
                  ) : (
                    <span className="fw-bold text-secondary">
                      {index + 1}
                    </span>
                  )}

                </td>

                <td>{product.productName}</td>

                <td>

                  <div className="d-flex align-items-center justify-content-end">

                    <div
                      style={{
                        width: "80px",
                        marginRight: "15px",
                      }}
                    >
                      <ProgressBar
                        now={(product.totalQuantity / maxQuantity) * 100}
                        style={{ height: "6px" }}
                      />
                    </div>

                    <strong>
                      {product.totalQuantity}
                    </strong>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </Table>

      </Card.Body>
    </Card>
  );
};

export default TopProductsTable;
