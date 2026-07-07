import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { getPaymentMethods } from "../../services/kpiService";

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const PaymentMethodsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const result = await getPaymentMethods();

      const chartData = result.map((item) => ({
        name: item.paymentMethod,
        value: item._count.id,
      }));

      setData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  // Total des paiements
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="shadow-sm border-0 rounded-4 h-100">
      <Card.Body>
        <h5 className="fw-bold mb-4">
          RÉPARTITION DES MOYENS DE PAIEMENT
        </h5>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: "320px" }}
        >
          {/* Donut Chart */}
          <div style={{ width: "45%", height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => {
                    const percent = total
                      ? ((value / total) * 100).toFixed(1)
                      : 0;

                    return [`${value} paiements (${percent}%)`, "Nombre"];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Légende */}
          <div style={{ width: "45%" }}>
            {data.map((item, index) => {
              const percent = total
                ? ((item.value / total) * 100).toFixed(1)
                : 0;

              return (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-4"
                >
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: COLORS[index % COLORS.length],
                        marginRight: 10,
                      }}
                    />

                    <span>{item.name}</span>
                  </div>

                  <strong>{percent}%</strong>
                </div>
              );
            })}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaymentMethodsChart;