import { Card } from "react-bootstrap";

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <Card.Body className="d-flex align-items-center p-4">

        <div
          className="rounded-4 d-flex justify-content-center align-items-center me-3"
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: bgColor,
          }}
        >
          {icon}
        </div>

        <div>
          <h6 className="text-uppercase text-secondary mb-2">
            {title}
          </h6>

          <h2 className="fw-bold mb-0">
            {value}
          </h2>
        </div>

      </Card.Body>
    </Card>
  );
};

export default StatCard;