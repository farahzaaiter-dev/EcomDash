import MainLayout from "../components/Layout/MainLayout";
import DashboardCards from "../components/DashboardCards/DashboardCards";
import TopProductsTable from "../components/TopProductsTable/TopProductsTable";

import RevenueByCategoryChart from "../components/RevenueByCategoryChart/RevenueByCategoryChart";


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
      <section id="products">

        <TopProductsTable />

      </section>
      {/* Graphiques */}
      <section id="charts" className="mt-5 mb-5" id="categories">

        <Row className="g-4">

          <Col lg={6} xs={12}>
            <RevenueByCategoryChart />
          </Col>

        </Row>

      </section>

     

    </MainLayout>
  );
};

export default Dashboard;