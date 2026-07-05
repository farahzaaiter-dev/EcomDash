import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";

import StatCard from "../StatCard/StatCard";

import {
  getRevenue,
  getTotalOrders,
  getTotalCustomers,
} from "../../services/kpiService";

const DashboardCards = () => {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const revenueData = await getRevenue();
      const ordersData = await getTotalOrders();
      const customersData = await getTotalCustomers();

      setRevenue(Number(revenueData.revenue) || 0);
      setOrders(ordersData.totalOrders);
      setCustomers(customersData.totalCustomers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="g-4">

      <Col xs={12} md={6} xl={4}>
        <StatCard
          title="Chiffre d'affaires"
          value={`${revenue.toLocaleString()} €`}
          icon={<FaMoneyBillWave color="#6C63FF" size={28} />}
          bgColor="#ECEBFF"
        />
      </Col>

      <Col xs={12} md={6} xl={4}>
        <StatCard
          title="Commandes Totales"
          value={orders.toLocaleString()}
          icon={<FaShoppingCart color="#2BB673" size={28} />}
          bgColor="#E8F8F2"
        />
      </Col>

      <Col xs={12} md={6} xl={4}>
        <StatCard
          title="Clients"
          value={customers.toLocaleString()}
          icon={<FaUsers color="#F4A825" size={28} />}
          bgColor="#FFF5E6"
        />
      </Col>

    </Row>
  );
};

export default DashboardCards;
