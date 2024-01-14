import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../Image/Delete.png";
import Add from "../Image/Add.png";
import Pen from "../Image/Pen.png";

import {
  addCompanyAsync,
  deleteCompanyAsync,
  updateCompanyAsync,
  selectUserProfile,
} from "../features/profile/profileSlice";

const getToken = () => {
  return localStorage.getItem("token");
};

const UserCompanies = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const token = getToken();

  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    _id: "",
    name: "",
    position: "",
    location: { address: "", locationtype: "" },
    employment: "",
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

  const years = Array.from({ length: 200 }, (_, index) => 1960 + index);

  const handleCompanyChange = (field, value) => {
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      [field]: value,
    }));
  };

  const handleEditCompany = (company) => {
    setNewCompany({
      _id: company._id,
      name: company.name,
      position: company.position,
      location: { ...company.location },
      employment: company.employment,
      startDate: { ...company.startDate },
      endDate: { ...company.endDate },
    });
    setShowModal(true);
  };

  const handleSaveCompany = () => {
    dispatch(
      newCompany._id
        ? updateCompanyAsync({
            id: user.userId,
            companyId: newCompany._id,
            company: newCompany,
            token: token,
          })
        : addCompanyAsync({
            company: newCompany,
            id: user.userId,
            token: token,
          })
    );

    setNewCompany({
      _id: "",
      name: "",
      position: "",
      location: { address: "", locationtype: "" },
      employment: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
    });

    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setNewCompany({
      _id: "",
      name: "",
      position: "",
      location: { address: "", locationtype: "" },
      employment: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
    });
    setShowModal(false);
  };

  return (
    <div className="card-body">
      <h5 className="d-flex align-items-center justify-content-between mb-3">
        <i className="material-icons text-info mr-2">Companies</i>
        <img
          src={Add}
          onClick={() => {
            setNewCompany({
              _id: "",
              name: "",
              position: "",
              location: { address: "", locationtype: "" },
              employment: "",
              startDate: { month: "", year: "" },
              endDate: { month: "", year: "" },
            });
            setShowModal(true);
          }}
          alt="add"
        ></img>
      </h5>
      {user.companies.map((company) => (
        <div key={company._id} className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{company.name}</h6>
            <div>
              <img
                className="edit-icon"
                alt="Edit"
                src={Pen}
                onClick={() => {
                  handleEditCompany(company);
                }}
              />
              <img
                className="delete-icon"
                alt="Delete"
                src={DeleteIcon}
                onClick={() => {
                  dispatch(
                    deleteCompanyAsync({
                      companyId: company._id,
                      token: token,
                      id: user.userId,
                    })
                  );
                }}
              />
            </div>
          </div>
          <p className="text-muted mb-2">{company.position}</p>
          <p className="text-muted mb-2">
            <strong>Location:</strong> {company.location.address} (
            {company.location.locationtype})
          </p>
          <p className="text-muted mb-2">
            <strong>Employment:</strong> {company.employment}
          </p>
          <div className="row mb-2">
            <div className="col-md-6">
              <p>
                <strong>Start Date:</strong> {company.startDate.month}{" "}
                {company.startDate.year}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>End Date:</strong> {company.endDate.month}{" "}
                {company.endDate.year}
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
                  {newCompany._id ? "Edit Company" : "Add New Company"}
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
                  placeholder="Company Name"
                  value={newCompany.name}
                  onChange={(e) => handleCompanyChange("name", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Position"
                  value={newCompany.position}
                  onChange={(e) =>
                    handleCompanyChange("position", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Location Address"
                  value={newCompany.location.address}
                  onChange={(e) =>
                    handleCompanyChange("location", {
                      ...newCompany.location,
                      address: e.target.value,
                    })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={newCompany.location.locationtype}
                  onChange={(e) =>
                    handleCompanyChange("location", {
                      ...newCompany.location,
                      locationtype: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Please Select Location Type
                  </option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ON-SITE">On-Site</option>
                </select>
                <select
                  className="form-control mb-2"
                  value={newCompany.employment}
                  onChange={(e) =>
                    handleCompanyChange("employment", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Please Select Employment Type
                  </option>
                  <option value="FULL-TIME">Full-Time</option>
                  <option value="PART-TIME">Part-Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="TRAINEE">Trainee</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="SELF-EMPLOYED">Self-Employed</option>
                </select>

                <div className="row mb-2">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={newCompany.startDate.month}
                      onChange={(e) =>
                        handleCompanyChange("startDate", {
                          ...newCompany.startDate,
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
                      value={newCompany.startDate.year}
                      onChange={(e) =>
                        handleCompanyChange("startDate", {
                          ...newCompany.startDate,
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
                      value={newCompany.endDate.month}
                      onChange={(e) =>
                        handleCompanyChange("endDate", {
                          ...newCompany.endDate,
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
                      value={newCompany.endDate.year}
                      onChange={(e) =>
                        handleCompanyChange("endDate", {
                          ...newCompany.endDate,
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
                <button className="btn btn-success" onClick={handleSaveCompany}>
                  {newCompany._id ? "Save " : "Add "}
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

export default UserCompanies;
