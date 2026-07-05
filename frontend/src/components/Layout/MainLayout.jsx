import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: "#F3F4F6" }}
    >
      <Navbar />

      <main className="flex-grow-1 container-fluid px-4 py-4">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;