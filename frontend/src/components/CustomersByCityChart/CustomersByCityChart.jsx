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
  Cell,
} from "recharts";
import { getCustomersByCity } from "../../services/kpiService";

const COLORS = [
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#1d4ed8",
  "#1e40af",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
];

const CustomersByCityChart = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getCustomersByCity();

      const top10 = [...data]
        .sort((a, b) => b._count.id - a._count.id)
        .slice(0, 10)
        .map((item) => ({
          city: item.city,
          clients: item._count.id,
        }));

      setCities(top10);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <Card className="shadow-sm border-0 rounded-4 h-100">
      <Card.Body>
        <h5 className="fw-bold mb-4">
          Top 10 des villes par nombre de clients
        </h5>

        <div style={{ width: "100%", height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={cities}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis
                type="category"
                dataKey="city"
                width={110}
              />

              <Tooltip />

              <Bar
                dataKey="clients"
                radius={[0, 8, 8, 0]}
              >
                {cities.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomersByCityChart;