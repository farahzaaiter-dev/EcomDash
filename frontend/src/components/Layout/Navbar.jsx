import React, { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("general");

  const scrollToSection = (id) => {
    setActive(id);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getButtonStyle = (id) => ({
    backgroundColor: active === id ? "#EEF2FF" : "transparent",
    color: active === id ? "#4F46E5" : "#6B7280",
  });

  return (
    <nav className="navbar bg-white border-bottom sticky-top py-3">
      <div className="container-xl d-flex justify-content-between align-items-center">

        {/* Logo */}
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center justify-content-center text-white rounded-3 me-2 shadow-sm"
            style={{
              backgroundColor: "#4F46E5",
              width: "36px",
              height: "36px",
              fontSize: "18px",
            }}
          >
            📦
          </div>

          <span className="fw-bold text-dark fs-5">
            EcomDash
          </span>
        </div>

        {/* Navigation Desktop */}
        <div className="d-none d-md-flex align-items-center gap-3 ms-auto">

          <div className="d-flex gap-2">

            <button
              type="button"
              className="btn rounded-pill border-0 fw-semibold px-4 py-2"
              style={getButtonStyle("general")}
              onClick={() => scrollToSection("general")}
            >
              Général
            </button>

            <button
              type="button"
              className="btn rounded-pill border-0 fw-semibold px-4 py-2"
              style={getButtonStyle("products")}
              onClick={() => scrollToSection("products")}
            >
              Produits
            </button>

            <button
              type="button"
              className="btn rounded-pill border-0 fw-semibold px-4 py-2"
              style={getButtonStyle("categories")}
              onClick={() => scrollToSection("categories")}
            >
              Categories
            </button>

            <button
              type="button"
              className="btn rounded-pill border-0 fw-semibold px-4 py-2"
              style={getButtonStyle("payments")}
              onClick={() => scrollToSection("payments")}
            >
              Paiements et Clients
            </button>

          </div>

          <div
            className="border-start ms-2"
            style={{ height: "24px" }}
          ></div>

        </div>

      </div>
    </nav>
  );
}