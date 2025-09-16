import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px 20px", backgroundColor: "#282c34", color: "#fff" }}>
      <h2 style={{ display: "inline", marginRight: "20px" }}>3D Visualizer</h2>
      <Link to="/" style={{ color: "#61dafb", textDecoration: "none", marginRight: "15px" }}>Gallery</Link>
    </nav>
  );
}
