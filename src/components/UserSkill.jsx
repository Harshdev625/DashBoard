import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../Image/Delete.png";
import AddIcon from "../Image/Add.png";
import PenIcon from "../Image/Pen.png";
import {
  selectUserProfile,
  addSkillAsync,
  removeSkillAsync,
  updateSkillAsync,
} from "../features/profile/profileSlice";

const SkillProgressBar = ({ name, level }) => {
  const getProgressBarColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-warning";
      case "Intermediate":
        return "bg-info";
      case "Advanced":
        return "bg-success";
      default:
        return "bg-primary";
    }
  };

  return (
    <div>
      <small>{level}</small>
      <div className="progress mb-3" style={{ height: 5 }}>
        <div
          className={`progress-bar ${getProgressBarColor()}`}
          role="progressbar"
          style={{ width: "100%" }}
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

const getToken = () => {
  return localStorage.getItem("token");
};

const UserSkill = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const token = getToken();
  const [editedSkill, setEditedSkill] = useState({
    id: "",
    name: "",
    level: "",
  });
  const [showSkillModal, setShowSkillModal] = useState(false);

  const handleSkillChange = (field, value) => {
    setEditedSkill((prevSkill) => ({
      ...prevSkill,
      [field]: value,
    }));
  };

  const handleEditClick = (skill) => {
    setEditedSkill({
      id: skill._id,
      name: skill.name,
      level: skill.level,
    });
    setShowSkillModal(true);
  };

  const handleSaveEdit = () => {
    if (editedSkill.id === "new") {
      dispatch(
        addSkillAsync({
          skill: editedSkill,
          id: user.userId,
          token: token,
        })
      );
    } else {
      dispatch(
        updateSkillAsync({
          id: user.userId,
          skillId: editedSkill.id,
          skill: editedSkill,
          token: token,
        })
      );
    }
    setEditedSkill({
      id: "",
      name: "",
      level: "",
    });
    setShowSkillModal(false);
  };

  const handleCloseModal = () => {
    setEditedSkill({
      id: "",
      name: "",
      level: "",
    });
    setShowSkillModal(false);
  };

  return (
    <div className="card-body">
      <h5 className="d-flex align-items-center justify-content-between mb-3">
        <i className="material-icons text-info mr-2">Skills</i>
        <img
          src={AddIcon}
          alt="Add Skill"
          onClick={() => {
            setEditedSkill({
              id: "new",
              name: "",
              level: "",
            });
            setShowSkillModal(true);
          }}
        />
      </h5>

      {user &&
        user.skills.map((skill) => (
          <div key={skill._id} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">{skill.name}</h6>
              <div>
                <img
                  className="edit-icon"
                  alt="Edit"
                  src={PenIcon}
                  onClick={() => handleEditClick(skill)}
                />
                <img
                  className="delete-icon"
                  alt="Delete"
                  src={DeleteIcon}
                  onClick={() => {
                    dispatch(
                      removeSkillAsync({
                        skillId: skill._id,
                        token: token,
                        id: user.userId,
                      })
                    );
                  }}
                />
              </div>
            </div>
            <SkillProgressBar name={skill.name} level={skill.level} />
          </div>
        ))}

      {showSkillModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editedSkill.id === "new" ? "Add Skill" : "Edit Skill"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Skill Name"
                  value={editedSkill.name}
                  onChange={(e) => handleSkillChange("name", e.target.value)}
                />
                <select
                  className="form-control mb-2"
                  value={editedSkill.level}
                  onChange={(e) => handleSkillChange("level", e.target.value)}
                >
                  <option value="" disabled>
                    Select Skill Level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSaveEdit}
                >
                  {editedSkill.id === "new" ? "Add " : "Save "}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSkill;
