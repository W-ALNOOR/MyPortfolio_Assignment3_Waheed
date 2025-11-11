// Projects: fetch from backend and render
import { useEffect, useState } from "react";
import axios from "axios";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data || []);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="projects"><h1>My Projects</h1><p>Loading...</p></div>;
  if (error) return <div className="projects"><h1>My Projects</h1><p>{error}</p></div>;

  return (
    <div className="projects">
      <h1>My Projects</h1>
      {projects.length === 0 && <p>No projects yet.</p>}
      {projects.map((p) => (
        <div key={p._id} className="project-card">
          <h3>{p.title}</h3>
          {p.description && <p>{p.description}</p>}
          {p.completion && (
            <small>Completed: {new Date(p.completion).toLocaleDateString()}</small>
          )}
        </div>
      ))}
    </div>
  );
}
