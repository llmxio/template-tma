import { Card, Button } from "tmaui";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card
        // image="https://cdn-icons-png.flaticon.com/512/545/545680.png"
        // imageAlt="Tap to go back"
        style={{ maxWidth: 340, width: "100%", textAlign: "center" }}
      >
        <h2 style={{ margin: "1rem 0 0.5rem 0" }}>404 - Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Sorry, the page you are looking for does not exist.
          <br />
          <span style={{ color: "#888" }}>Tap to go back</span>
        </p>
        <Button stretched size="l" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Card>
    </div>
  );
}

export default NotFound;
