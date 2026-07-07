import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getSalesByCategory } from "../../services/kpiService";

const ProductsByCategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const result = await getSalesByCategory();

      const categoryNames = {
  "Beauty/Cosmetics": "Hauts",
  "Apparel/Fashion": "Bas",
  "Food & Beverages": "Chaussures",
  "Home & Kitchen Furniture": "Accessoires",
  "Electronics": "Tricots",
  "Toys": "Robes",
};

const chartData = Object.entries(result).map(([category, products]) => ({
  category: categoryNames[category] || category,
  products,
}));

      setData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="shadow-sm border-0 rounded-4 h-100">
      <Card.Body>

        <h5 className="fw-bold mb-4">
          PRODUITS VENDUS PAR CATÉGORIE
        </h5>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="category"
              width={140}
              tick={{ fontSize: 14 }}
            />

            <Tooltip />

            <Bar
              dataKey="products"
              fill="#22C55E"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </Card.Body>
    </Card>
  );
};

export default ProductsByCategoryChart;