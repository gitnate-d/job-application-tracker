import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import JobCard from "../components/JobCard";

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
}

const statuses = [
  "Applied",
  "Interviewing",
  "Offered",
  "Rejected",
  "Accepted",
  "Withdrawn",
];

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data);
      } else {
        setError(data.error || "Failed to fetch jobs");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  // Delete job handler
  const handleDeleteJob = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== id));
      } else {
        alert("Failed to delete job");
      }
    } catch {
      alert("Network error");
    }
  };

  // Filter jobs by search
  const filteredJobs = jobs.filter(
    job =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase())
  );

  // Organize jobs by status
  const jobsByStatus: { [key: string]: Job[] } = {};
  statuses.forEach((status) => {
    jobsByStatus[status] = filteredJobs.filter((job) => job.status === status);
  });

  // Handle drag and drop
  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const job = jobs.find((j) => j._id === draggableId);
    if (job) {
      const updatedJob = { ...job, status: destination.droppableId };
      // Update backend
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/applications/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJob),
      });
      // Update local state
      setJobs(jobs.map((j) => (j._id === job._id ? updatedJob : j)));
    }
  };

  // Add job form state
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [statusField, setStatusField] = useState("Applied");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company, position, status: statusField }),
      });
      const data = await response.json();
      if (response.ok) {
        setJobs([...jobs, data]);
        setCompany("");
        setPosition("");
        setStatusField("Applied");
        setAddSuccess("Job added!");
        setTimeout(() => setAddSuccess(""), 3000);
      } else {
        setAddError(data.error || "Failed to add job");
      }
    } catch (err) {
      setAddError("Network error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <input
        type="text"
        className="mb-4 w-full p-2 border border-purple-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Search by company or position..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-xl shadow p-4 min-h-[200px]"
                >
                  <h2 className="font-semibold text-lg mb-4 py-2 px-3 rounded bg-purple-200 text-purple-800 border border-purple-400 shadow">
                    {status}
                  </h2>
                  {jobsByStatus[status].map((job, index) => (
                    <Draggable key={job._id} draggableId={job._id} index={index}>
                      {(provided) => (
                        <JobCard
                          job={job}
                          status={status}
                          onDelete={handleDeleteJob}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {/* Add Job Form Below Kanban */}
      <form onSubmit={handleAddJob} className="mt-8 mb-6 flex flex-col md:flex-row md:items-end gap-2">
        <input
          type="text"
          className="p-2 border border-purple-300 rounded shadow flex-1"
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          className="p-2 border border-purple-300 rounded shadow flex-1"
          placeholder="Position"
          value={position}
          onChange={e => setPosition(e.target.value)}
          required
        />
        <select
          className="p-2 border border-purple-300 rounded shadow"
          value={statusField}
          onChange={e => setStatusField(e.target.value)}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded shadow">Add Job</button>
      </form>
      {addError && <div className="text-red-500 mb-2">{addError}</div>}
      {addSuccess && <div className="text-green-500 mb-2">{addSuccess}</div>}
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;