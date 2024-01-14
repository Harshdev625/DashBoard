import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../Image/Delete.png";
import Add from "../Image/Add.png";
import Pen from "../Image/Pen.png";

import {
  addEducationAsync,
  deleteEducationAsync,
  updateEducationAsync,
  selectUserProfile,
} from "../features/profile/profileSlice";

const getToken = () => {
  return localStorage.getItem("token");
};

const UserEducation = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const token = getToken();

  const [showModal, setShowModal] = useState(false);
  const [newEducation, setNewEducation] = useState({
    _id: "",
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
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

  const years = Array.from({ length: 50 }, (_, index) => 1970 + index);

  const handleEducationChange = (field, value) => {
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [field]: value,
    }));
  };

  const handleEditEducation = (education) => {
    setNewEducation({
      _id: education._id,
      school: education.school,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      startDate: { ...education.startDate },
      endDate: { ...education.endDate },
    });
    setShowModal(true);
  };

  const handleSaveEducation = () => {
    dispatch(
      newEducation._id
        ? updateEducationAsync({
            id: user.userId,
            educationId: newEducation._id,
            education: newEducation,
            token: token,
          })
        : addEducationAsync({
            education: newEducation,
            id: user.userId,
            token: token,
          })
    );

    setNewEducation({
      _id: "",
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
    });

    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setNewEducation({
      _id: "",
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
    });
    setShowModal(false);
  };

  return (
    <div className="card-body">
      <h5 className="d-flex align-items-center justify-content-between mb-3">
        <i className="material-icons text-info mr-2">Education</i>
        <img
          src={Add}
          onClick={() => {
            setNewEducation({
              _id: "",
              school: "",
              degree: "",
              fieldOfStudy: "",
              startDate: { month: "", year: "" },
              endDate: { month: "", year: "" },
            });
            setShowModal(true);
          }}
          alt="add"
        ></img>
      </h5>
      {user.education.map((education) => (
        <div key={education._id} className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{education.school}</h6>
            <div>
              <img
                className="edit-icon"
                alt="Edit"
                src={Pen}
                onClick={() => {
                  handleEditEducation(education);
                }}
              />
              <img
                className="delete-icon"
                alt="Delete"
                src={DeleteIcon}
                onClick={() => {
                  dispatch(
                    deleteEducationAsync({
                      educationId: education._id,
                      token: token,
                      id: user.userId,
                    })
                  );
                }}
              />
            </div>
          </div>
          <p className="text-muted mb-2">{education.degree}</p>
          <p className="text-muted mb-2">
            <strong>Field of Study:</strong> {education.fieldOfStudy}
          </p>
          <div className="row mb-2">
            <div className="col-md-6">
              <p>
                <strong>Start Date:</strong> {education.startDate.month}{" "}
                {education.startDate.year}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>End Date:</strong> {education.endDate.month}{" "}
                {education.endDate.year}
              </p>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {newEducation._id ? "Edit Education" : "Add New Education"}
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
                  placeholder="School"
                  value={newEducation.school}
                  onChange={(e) =>
                    handleEducationChange("school", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Degree"
                  value={newEducation.degree}
                  onChange={(e) =>
                    handleEducationChange("degree", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Field of Study"
                  value={newEducation.fieldOfStudy}
                  onChange={(e) =>
                    handleEducationChange("fieldOfStudy", e.target.value)
                  }
                />
                <div className="row mb-2">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={newEducation.startDate.month}
                      onChange={(e) =>
                        handleEducationChange("startDate", {
                          ...newEducation.startDate,
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
                      value={newEducation.startDate.year}
                      onChange={(e) =>
                        handleEducationChange("startDate", {
                          ...newEducation.startDate,
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
                      value={newEducation.endDate.month}
                      onChange={(e) =>
                        handleEducationChange("endDate", {
                          ...newEducation.endDate,
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
                      value={newEducation.endDate.year}
                      onChange={(e) =>
                        handleEducationChange("endDate", {
                          ...newEducation.endDate,
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
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={handleSaveEducation}
                >
                  {newEducation._id ? "Save " : "Add "}
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

export default UserEducation;
