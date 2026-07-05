import DashboardCards from "../components/DashboardCards/DashboardCards";
import TopProductsTable from "../components/TopProductsTable/TopProductsTable";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">

      <DashboardCards />

      <TopProductsTable />

    </div>
  );
};

export default Dashboard;