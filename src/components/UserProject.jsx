import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../Image/Delete.png";
import Add from "../Image/Add.png";
import Pen from "../Image/Pen.png";

import {
  addProjectAsync,
  deleteProjectAsync,
  updateProjectAsync,
  selectUserProfile,
} from "../features/profile/profileSlice";

const getToken = () => {
  return localStorage.getItem("token");
};

const UserProject = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const token = getToken();

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    _id: "",
    title: "",
    description: "",
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
    githubLink: "",
    deployedLink: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 200 }, (_, index) => 1960 + index);

  const handleProjectChange = (field, value) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));
  };

  const handleEditProject = (project) => {
    setNewProject({
      _id: project._id,
      title: project.title,
      description: project.description,
      startDate: { ...project.startDate },
      endDate: { ...project.endDate },
      githubLink: project.githubLink,
      deployedLink: project.deployedLink,
    });
    setShowModal(true);
  };

  const handleSaveProject = () => {
    dispatch(
      newProject._id
        ? updateProjectAsync({
            id: user.userId,
            projectId: newProject._id,
            project: newProject,
            token: token,
          })
        : addProjectAsync({
            project: newProject,
            id: user.userId,
            token: token,
          })
    );

    setNewProject({
      _id: "",
      title: "",
      description: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      githubLink: "",
      deployedLink: "",
    });

    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setNewProject({
      _id: "",
      title: "",
      description: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      githubLink: "",
      deployedLink: "",
    });
    setShowModal(false);
  };

  return (
    <div className="card-body">
      <h5 className="d-flex align-items-center justify-content-between mb-3">
        <i className="material-icons text-info mr-2">Projects</i>
        <img
          src={Add}
          onClick={() => {
            setNewProject({
              _id: "",
              title: "",
              description: "",
              startDate: { month: "", year: "" },
              endDate: { month: "", year: "" },
              githubLink: "",
              deployedLink: "",
            });
            setShowModal(true);
          }}
          alt="add"
        ></img>
      </h5>
      {user.projects.map((project) => (
        <div key={project._id} className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{project.title}</h6>
            <div>
              <img
                className="edit-icon"
                alt="Edit"
                src={Pen}
                onClick={() => {
                  handleEditProject(project);
                }}
              />
              <img
                className="delete-icon"
                alt="Delete"
                src={DeleteIcon}
                onClick={() => {
                  dispatch(
                    deleteProjectAsync({
                      projectId: project._id,
                      token: token,
                      id: user.userId,
                    })
                  );
                }}
              />
            </div>
          </div>
          <p className="text-muted mb-2">{project.description}</p>
          <div className="row mb-2">
            <div className="col-md-6">
              <p>
                <strong>Start Date:</strong> {project.startDate.month}{" "}
                {project.startDate.year}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>End Date:</strong> {project.endDate.month}{" "}
                {project.endDate.year}
              </p>
            </div>
          </div>
          {project.githubLink && (
            <p>
              <strong>Github Link:</strong>{" "}
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.githubLink}
              </a>
            </p>
          )}
          {project.deployedLink && (
            <p>
              <strong>Deployed Link:</strong>{" "}
              <a
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.deployedLink}
              </a>
            </p>
          )}
        </div>
      ))}

      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {newProject._id ? "Edit Project" : "Add New Project"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCancelEdit}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => handleProjectChange("title", e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) =>
                    handleProjectChange("description", e.target.value)
                  }
                />
                <div className="row mb-2">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={newProject.startDate.month}
                      onChange={(e) =>
                        handleProjectChange("startDate", {
                          ...newProject.startDate,
                          month: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select Start Month
                      </option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={newProject.startDate.year}
                      onChange={(e) =>
                        handleProjectChange("startDate", {
                          ...newProject.startDate,
                          year: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select Start Year
                      </option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={newProject.endDate.month}
                      onChange={(e) =>
                        handleProjectChange("endDate", {
                          ...newProject.endDate,
                          month: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select End Month
                      </option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={newProject.endDate.year}
                      onChange={(e) =>
                        handleProjectChange("endDate", {
                          ...newProject.endDate,
                          year: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select End Year
                      </option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Github Link"
                  value={newProject.githubLink}
                  onChange={(e) =>
                    handleProjectChange("githubLink", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Deployed Link"
                  value={newProject.deployedLink}
                  onChange={(e) =>
                    handleProjectChange("deployedLink", e.target.value)
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveProject}>
                  {newProject._id ? "Save " : "Add "}
                </button>
                <button
                  className="btn btn-secondary ml-2"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProject;
