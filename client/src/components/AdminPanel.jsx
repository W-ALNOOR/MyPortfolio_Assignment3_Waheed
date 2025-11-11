import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useAuthAxios = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }, [token]);
};

const AdminPanel = () => {
  const api = useAuthAxios();
  const [tab, setTab] = useState("projects");

  // Projects state
  const [projects, setProjects] = useState([]);
  const [pForm, setPForm] = useState({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
  const [pLoading, setPLoading] = useState(false);

  // Qualifications state
  const [quals, setQuals] = useState([]);
  const [qForm, setQForm] = useState({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
  const [qLoading, setQLoading] = useState(false);

  // Contacts state (view + delete)
  const [contacts, setContacts] = useState([]);
  const [cLoading, setCLoading] = useState(false);

  // Seeding status
  const [seedMsg, setSeedMsg] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const loadProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data || []);
  };
  const loadQuals = async () => {
    const res = await axios.get("http://localhost:5000/api/qualifications");
    setQuals(res.data || []);
  };
  const loadContacts = async () => {
    const res = await axios.get("http://localhost:5000/api/contacts");
    setContacts(res.data || []);
  };

  useEffect(() => {
    loadProjects();
    loadQuals();
    loadContacts();
  }, []);

  const handlePCreate = async (e) => {
    e.preventDefault();
    setPLoading(true);
    try {
      const payload = { ...pForm };
      if (!payload.completion) delete payload.completion;
      await api.post("/api/projects", payload);
      setPForm({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
      await loadProjects();
    } finally {
      setPLoading(false);
    }
  };

  const handleQCreate = async (e) => {
    e.preventDefault();
    setQLoading(true);
    try {
      const payload = { ...qForm };
      if (!payload.completion) delete payload.completion;
      await api.post("/api/qualifications", payload);
      setQForm({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
      await loadQuals();
    } finally {
      setQLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    setBusy(true); setActionMsg("");
    try {
      await api.delete(`/api/projects/${id}`);
      await loadProjects();
      setActionMsg("Project deleted.");
    } catch (e) {
      setActionMsg(e.response?.data?.error || e.response?.data?.message || e.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  };
  const deleteQual = async (id) => {
    if (!confirm("Delete this qualification?")) return;
    setBusy(true); setActionMsg("");
    try {
      await api.delete(`/api/qualifications/${id}`);
      await loadQuals();
      setActionMsg("Qualification deleted.");
    } catch (e) {
      setActionMsg(e.response?.data?.error || e.response?.data?.message || e.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const updateProject = async (id, fields) => {
    setBusy(true); setActionMsg("");
    try {
      await api.put(`/api/projects/${id}`, fields);
      await loadProjects();
      setActionMsg("Project updated.");
    } catch (e) {
      setActionMsg(e.response?.data?.error || e.response?.data?.message || e.message || "Update failed");
    } finally {
      setBusy(false);
    }
  };
  const updateQual = async (id, fields) => {
    setBusy(true); setActionMsg("");
    try {
      await api.put(`/api/qualifications/${id}`, fields);
      await loadQuals();
      setActionMsg("Qualification updated.");
    } catch (e) {
      setActionMsg(e.response?.data?.error || e.response?.data?.message || e.message || "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const deleteContact = async (id) => {
    setCLoading(true);
    try {
      await api.delete(`/api/contacts/${id}`);
      await loadContacts();
    } finally {
      setCLoading(false);
    }
  };
  const deleteAllContacts = async () => {
    if (!confirm("Delete ALL contacts?")) return;
    setCLoading(true);
    try {
      await api.delete(`/api/contacts`);
      await loadContacts();
    } finally {
      setCLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Admin Panel</h2>
      {seedMsg && <div style={{ background: "#eef", padding: 8, marginBottom: 12 }}>{seedMsg}</div>}
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab("projects")} disabled={tab === "projects"}>Projects</button>
        <button onClick={() => setTab("qualifications")} disabled={tab === "qualifications"} style={{ marginLeft: 8 }}>Qualifications</button>
        <button onClick={() => setTab("contacts")} disabled={tab === "contacts"} style={{ marginLeft: 8 }}>Contacts</button>
      </div>
      {actionMsg && <div style={{ background: "#fee", padding: 8, marginBottom: 12 }}>{actionMsg}</div>}

      {/* Quick seed helpers */}
      <div style={{ marginBottom: 16, padding: 8, border: "1px dashed #ccc" }}>
        <strong>Quick Seed</strong>
        <div style={{ marginTop: 8 }}>
          <button
            onClick={async () => {
              const firstname = prompt("Your first name for project owner fields?", "Waheed") || "Waheed";
              const lastname = prompt("Your last name?", "Alnoor") || "Alnoor";
              const email = prompt("Your email?", "admin@example.com") || "admin@example.com";
              setSeedMsg("Seeding projects...");
              const items = [
                {
                  title: "COVID-19 Data Analysis in Ontario",
                  description:
                    "Analyzed COVID-19 case trends across age groups and regions using real Ontario open data. Built classification and regression models to forecast case trends.\nTechnologies: Python, Pandas, Scikit-Learn, Matplotlib",
                },
                {
                  title: "ServiceLink Web App",
                  description:
                    "Full-stack MERN application connecting customers with local service providers. Designed UI/UX, managed tasks using Trello, and ensured smooth backend API integration.\nTechnologies: MongoDB, Express, React, Node.js, Trello",
                },
                {
                  title: "Bank Marketing Prediction",
                  description:
                    "Machine learning model to predict whether a customer subscribes to a term deposit. Built and tuned classification models using Python and Scikit-learn.\nTechnologies: Python, Logistic Regression, Pandas",
                },
              ];
              try {
                for (const it of items) {
                  await api.post("/api/projects", { ...it, firstname, lastname, email });
                }
                await loadProjects();
                setSeedMsg("Seeded projects successfully.");
              } catch (e) {
                setSeedMsg("Failed to seed projects. Are you signed in as admin?");
              }
            }}
          >
            Seed Projects
          </button>
          <button
            style={{ marginLeft: 8 }}
            onClick={async () => {
              const firstname = prompt("Your first name for qualification owner fields?", "Waheed") || "Waheed";
              const lastname = prompt("Your last name?", "Alnoor") || "Alnoor";
              const email = prompt("Your email?", "admin@example.com") || "admin@example.com";
              setSeedMsg("Seeding qualifications...");
              const items = [
                {
                  title:
                    "Toronto Metropolitan University – Certificate of Data Analytics, Big Data, and Predictive Analytics",
                  description: "Year: 2024",
                },
                {
                  title: "Sudan Open University - Bachelor of Computer Science",
                  description: "Year: 2015",
                },
                {
                  title: "Hitech Institute – Diploma in Computer Science",
                  description: "Year: 2012",
                },
                {
                  title: "DBA training using oracle 10g (SQL, PLSQL).",
                  description: "Year: 2007",
                },
                {
                  title: "University of Gezira - Diploma in Computer Sciences",
                  description: "Year: 2007",
                },
              ];
              try {
                for (const it of items) {
                  await api.post("/api/qualifications", { ...it, firstname, lastname, email });
                }
                await loadQuals();
                setSeedMsg("Seeded qualifications successfully.");
              } catch (e) {
                setSeedMsg("Failed to seed qualifications. Are you signed in as admin?");
              }
            }}
          >
            Seed Qualifications
          </button>
        </div>
      </div>

      {tab === "projects" && (
        <div>
          <h3>Create Project</h3>
          <form onSubmit={handlePCreate} style={{ display: "grid", gap: 8 }}>
            <input placeholder="Title" value={pForm.title} onChange={(e) => setPForm({ ...pForm, title: e.target.value })} required />
            <input placeholder="First name" value={pForm.firstname} onChange={(e) => setPForm({ ...pForm, firstname: e.target.value })} required />
            <input placeholder="Last name" value={pForm.lastname} onChange={(e) => setPForm({ ...pForm, lastname: e.target.value })} required />
            <input placeholder="Email" type="email" value={pForm.email} onChange={(e) => setPForm({ ...pForm, email: e.target.value })} required />
            <input placeholder="Completion (YYYY-MM-DD)" value={pForm.completion} onChange={(e) => setPForm({ ...pForm, completion: e.target.value })} />
            <textarea placeholder="Description" value={pForm.description} onChange={(e) => setPForm({ ...pForm, description: e.target.value })} />
            <button type="submit" disabled={pLoading}>{pLoading ? "Saving..." : "Save Project"}</button>
          </form>

          <h3 style={{ marginTop: 24 }}>Existing Projects</h3>
          {projects.length === 0 && <p>No projects yet.</p>}
          {projects.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ddd", padding: 12, marginTop: 8 }}>
              <strong>{p.title}</strong>
              {p.description && <div>{p.description}</div>}
              <div style={{ marginTop: 8 }}>
                <button onClick={() => deleteProject(p._id)} disabled={busy} style={{ color: "white", background: "red" }}>{busy ? "..." : "Delete"}</button>
                <button onClick={() => updateProject(p._id, { title: prompt("New title", p.title) || p.title })} disabled={busy} style={{ marginLeft: 8 }}>Quick Rename</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "qualifications" && (
        <div>
          <h3>Create Qualification</h3>
          <form onSubmit={handleQCreate} style={{ display: "grid", gap: 8 }}>
            <input placeholder="Title" value={qForm.title} onChange={(e) => setQForm({ ...qForm, title: e.target.value })} required />
            <input placeholder="First name" value={qForm.firstname} onChange={(e) => setQForm({ ...qForm, firstname: e.target.value })} required />
            <input placeholder="Last name" value={qForm.lastname} onChange={(e) => setQForm({ ...qForm, lastname: e.target.value })} required />
            <input placeholder="Email" type="email" value={qForm.email} onChange={(e) => setQForm({ ...qForm, email: e.target.value })} required />
            <input placeholder="Completion (YYYY-MM-DD)" value={qForm.completion} onChange={(e) => setQForm({ ...qForm, completion: e.target.value })} />
            <textarea placeholder="Description" value={qForm.description} onChange={(e) => setQForm({ ...qForm, description: e.target.value })} />
            <button type="submit" disabled={qLoading}>{qLoading ? "Saving..." : "Save Qualification"}</button>
          </form>

          <h3 style={{ marginTop: 24 }}>Existing Qualifications</h3>
          {quals.length === 0 && <p>No qualifications yet.</p>}
          {quals.map((q) => (
            <div key={q._id} style={{ border: "1px solid #ddd", padding: 12, marginTop: 8 }}>
              <strong>{q.title}</strong>
              {q.description && <div>{q.description}</div>}
              <div style={{ marginTop: 8 }}>
                <button onClick={() => deleteQual(q._id)} disabled={busy} style={{ color: "white", background: "red" }}>{busy ? "..." : "Delete"}</button>
                <button onClick={() => updateQual(q._id, { title: prompt("New title", q.title) || q.title })} disabled={busy} style={{ marginLeft: 8 }}>Quick Rename</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "contacts" && (
        <div>
          <h3>Contacts</h3>
          <div style={{ marginBottom: 12 }}>
            <button onClick={deleteAllContacts} disabled={cLoading} style={{ background: "#333", color: "#fff" }}>
              {cLoading ? "Processing..." : "Delete All"}
            </button>
          </div>
          {contacts.length === 0 && <p>No contacts.</p>}
          {contacts.map((c) => (
            <div key={c._id} style={{ border: "1px solid #ddd", padding: 12, marginTop: 8 }}>
              <div><strong>{c.firstname} {c.lastname}</strong></div>
              <div>{c.email}</div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => deleteContact(c._id)} style={{ color: "white", background: "red" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
