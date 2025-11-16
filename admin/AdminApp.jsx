import { useEffect, useState, useCallback } from "react";
import {
  adminLogin,
  createProject,
  deleteProject,
  getProjects,
} from "../api.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem("jc_token"));
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // ------------------------------------------------------------
  // REFRESH
  // ------------------------------------------------------------
  const refresh = useCallback(async () => {
    try {
      const d = await getProjects();
      setProjects(d.projects || []);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  }, []);

  useEffect(() => {
    if (token) refresh();
  }, [token, refresh]);

  // ------------------------------------------------------------
  // Login
  // ------------------------------------------------------------
  async function onLogin(e) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);

    try {
      await adminLogin({
        username: f.get("username"),
        password: f.get("password"),
      });

      setToken(localStorage.getItem("jc_token"));
      toast.success("Logged in successfully!");
    } catch {
      setError("Invalid credentials");
      toast.error("Invalid login");
    }
  }

  // ------------------------------------------------------------
  // Handle Thumbnail Input
  // ------------------------------------------------------------
  function handleThumbnailChange(e) {
    const file = e.target.files[0];
    setThumbnailFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  // ------------------------------------------------------------
  // Create Project
  // ------------------------------------------------------------
  async function onCreate(e) {
    e.preventDefault();
    setError("");

    const f = new FormData(e.currentTarget);

    const formData = new FormData();

    formData.append("title", f.get("title"));
    formData.append("description", f.get("description"));
    formData.append("url", f.get("url"));
    formData.append("tags", f.get("tags"));

    // IMPORTANT: thumb field name (matches your backend schema)
    if (thumbnailFile) {
      formData.append("thumb", thumbnailFile);
    }

    try {
      await createProject(formData);
      toast.success("Project created!");

      e.currentTarget.reset();
      setPreview(null);
      setThumbnailFile(null);

      await refresh();
    } catch (err) {
      setError("Create failed");
      toast.error("Failed to create project");
    }
  }

  // ------------------------------------------------------------
  // Delete project
  // ------------------------------------------------------------
  async function onDelete(id) {
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      await refresh();
    } catch {
      toast.error("Delete failed");
    }
  }

  // ------------------------------------------------------------
  // LOGIN PAGE
  // ------------------------------------------------------------
  if (!token)
    return (
      <>
        <ToastContainer />
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={onLogin} className="card w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-3 flex justify-between items-center">
              <span>Admin Login</span>
              <a
                href="/"
                className="text-white-400 hover:text-blue-300 transition"
              >
                Home
              </a>
            </h2>

            <label className="grid gap-2 text-muted font-semibold mb-2">
              <span>Username</span>
              <input
                name="username"
                className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
              />
            </label>

            <label className="grid gap-2 text-muted font-semibold mb-4">
              <span>Password</span>
              <input
                name="password"
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
              />
            </label>

            <button className="btn btn-primary w-full" type="submit">
              Login
            </button>

            {!!error && <p className="text-red-400 mt-2">{error}</p>}
          </form>
        </div>
      </>
    );

  // ------------------------------------------------------------
  // ADMIN DASHBOARD
  // ------------------------------------------------------------
  return (
    <>
      <ToastContainer />

      <div className="min-h-screen container py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <button
            className="btn"
            onClick={() => {
              localStorage.removeItem("jc_token");
              setToken(null);
              toast.info("Logged out");
            }}
          >
            Logout
          </button>
        </div>

        {/* CREATE PROJECT */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Create Project</h2>

          <form onSubmit={onCreate} className="card">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-2 text-muted font-semibold">
                <span>Title</span>
                <input
                  name="title"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                  required
                />
              </label>

              <label className="grid gap-2 text-muted font-semibold">
                <span>URL</span>
                <input
                  name="url"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                  placeholder="https://..."
                />
              </label>

              <label className="md:col-span-2 grid gap-2 text-muted font-semibold">
                <span>Description</span>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                  required
                />
              </label>

              {/* THUMBNAIL UPLOAD */}
              <label className="md:col-span-2 grid gap-2 text-muted font-semibold">
                <span>Thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                />
              </label>

              {/* PREVIEW */}
              {preview && (
                <div className="md:col-span-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                </div>
              )}

              <label className="md:col-span-2 grid gap-2 text-muted font-semibold">
                <span>Tags (comma separated)</span>
                <input
                  name="tags"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                  placeholder="React, Node, SEO"
                />
              </label>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              Publish
            </button>

            {!!error && <p className="text-red-400 mt-3">{error}</p>}
          </form>
        </section>

        {/* PROJECT LIST */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Projects</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <div key={p._id} className="card">
                {/* Show thumbnail if exists */}
                {p.thumb && (
                  <img
                    src={p.thumb}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}

                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-muted text-sm mb-2">{p.description}</p>

                <div className="flex gap-2">
                  <a
                    className="btn"
                    href={p.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>

                  <button className="btn" onClick={() => onDelete(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="card">No projects yet.</div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
