import { useEffect, useState } from "react";
import axios from "axios";

export default function Education() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/qualifications");
        setItems(res.data || []);
      } catch (err) {
        setError("Failed to load qualifications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="education">
      <h1>My Education</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {items.length === 0 && <p>No qualifications yet.</p>}
          {items.map((q) => (
            <li key={q._id}>
              <h3>{q.title}</h3>
              {q.description && <p>{q.description}</p>}
              {q.completion && (
                <small>Completed: {new Date(q.completion).toLocaleDateString()}</small>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
