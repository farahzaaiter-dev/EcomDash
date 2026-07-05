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

import { getRevenueByCategory } from "../../services/kpiService";

const RevenueByCategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const result = await getRevenueByCategory();

      const chartData = Object.entries(result).map(([category, revenue]) => ({
        category,
        revenue,
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
          CHIFFRE D'AFFAIRES PAR CATÉGORIE
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

    <XAxis
      type="number"
      tickFormatter={(value) =>
        `${(value / 1000000).toFixed(0)} M€`
      }
    />

  <YAxis
  type="category"
  dataKey="category"
  width={110}
  tick={{
    fontSize: 14,
  }}
/>

    <Tooltip />

    <Bar
      dataKey="revenue"
      fill="#6366F1"
      radius={[0, 8, 8, 0]}
    />
  </BarChart>
</ResponsiveContainer>

      </Card.Body>
    </Card>
  );
};

export default RevenueByCategoryChart;