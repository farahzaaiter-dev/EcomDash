import MainLayout from "../components/Layout/MainLayout";
import DashboardCards from "../components/DashboardCards/DashboardCards";
import TopProductsTable from "../components/TopProductsTable/TopProductsTable";

const Dashboard = () => {
  return (
    <MainLayout>
      {/* Section Général */}
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

      {/* Section Produits */}
      <section id="products">
        <TopProductsTable />
      </section>
    </MainLayout>
  );
};

export default Dashboard;