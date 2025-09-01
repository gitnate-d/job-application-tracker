import React from "react";

interface JobCardProps {
  job: {
    _id: string;
    company: string;
    position: string;
    status: string;
  };
  status: string;
  onDelete: (id: string) => void;
  provided: any;
}

const JobCard: React.FC<JobCardProps> = ({ job, status, onDelete, provided }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className={
      status === "Rejected"
        ? "mb-2 p-3 bg-blue-200 border border-blue-400 rounded-lg shadow text-gray-800 font-medium relative"
        : "mb-2 p-3 bg-blue-200 border border-blue-400 rounded-lg shadow text-gray-800 font-medium relative"
    }
  >
    <button
      onClick={() => onDelete(job._id)}
      className="absolute -top-1 -right-3 w-2 h-4 flex items-center justify-center bg-transparent text-red-500 text-lg hover:text-red-600 focus:outline-none"
      title="Delete job"
      style={{ zIndex: 10 }}
    >
      ×
    </button>
    {status === "Rejected" ? (
      <div className="font-semibold">{job.company}</div>
    ) : (
      <>
        <div className="font-semibold">{job.company}</div>
        <div>{job.position}</div>
      </>
    )}
  </div>
);

export default JobCard;
