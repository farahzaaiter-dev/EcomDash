import MainLayout from "../components/Layout/MainLayout";
import DashboardCards from "../components/DashboardCards/DashboardCards";
import TopProductsTable from "../components/TopProductsTable/TopProductsTable";

import RevenueByCategoryChart from "../components/RevenueByCategoryChart/RevenueByCategoryChart";
import CustomersByCityChart from "../components/CustomersByCityChart/CustomersByCityChart";
import ProductsByCategoryChart from "../components/ProductsByCategoryChart/ProductsByCategoryChart";
import PaymentMethodsChart from "../components/PaymentMethodsChart/PaymentMethodsChart";

import { Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <MainLayout>

      {/* Général */}
      <section id="general" className="mb-5">

        <div
          className="mb-4 px-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <h1
            className="fw-bold text-dark m-0"
            style={{
              fontSize: "2.1rem",
              letterSpacing: "-0.5px",
            }}
          >
            Tableau de bord
          </h1>
        </div>

        <DashboardCards />

      </section>

      {/* Produits */}
      <section id="products" className="mb-5">
        <TopProductsTable />
      </section>

      {/* Graphiques */}
      <section id="categories" className="mt-5 mb-5">

        {/* Première ligne */}
        <Row className="g-4 mb-4">

          <Col lg={6} xs={12}>
            <RevenueByCategoryChart />
          </Col>

          <Col lg={6} xs={12}>
            <ProductsByCategoryChart />
          </Col>

        </Row>

        {/* Deuxième ligne */}
        <Row  id ="payments" className="g-4">

          <Col lg={6} xs={12}>
            <CustomersByCityChart />
          </Col>

          <Col lg={6} xs={12}>
            <PaymentMethodsChart />
          </Col>

        </Row>

      </section>

    </MainLayout>
  );
};

export default Dashboard;