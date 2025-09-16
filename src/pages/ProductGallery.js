import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected API response:", data);
          setProducts([]);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Gallery</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
              }}
            >
              <img src={p.image} alt={p.name} width={180} height={180} />
              <h3>{p.name}</h3>
              <p>Category: {p.category}</p>
              <p>Price: ${p.price}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
