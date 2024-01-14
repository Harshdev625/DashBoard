import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../Image/Delete.png";
import Add from "../Image/Add.png";
import Pen from "../Image/Pen.png";

import {
  addSocialLinkAsync,
  updateSocialLinkAsync,
  removeSocialLinkAsync,
  selectUserProfile,
} from "../features/profile/profileSlice";

const getToken = () => {
  return localStorage.getItem("token");
};

const UserSocialLink = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const token = getToken();

  const [showModal, setShowModal] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({
    _id: "",
    name: "",
    link: "",
  });

  const handleSocialLinkChange = (field, value) => {
    setNewSocialLink((prevSocialLink) => ({
      ...prevSocialLink,
      [field]: value,
    }));
  };

  const handleEditSocialLink = (socialLink) => {
    setNewSocialLink({
      _id: socialLink._id,
      name: socialLink.name,
      link: socialLink.link,
    });
    setShowModal(true);
  };

  const handleSaveSocialLink = () => {
    if (newSocialLink._id === "new") {
      dispatch(
        addSocialLinkAsync({
          name: newSocialLink.name,
          link: newSocialLink.link,
          id: user.userId,
          token: token,
        })
      );
    } else {
      dispatch(
        updateSocialLinkAsync({
          id: user.userId,
          linkId: newSocialLink._id,
          name: newSocialLink.name,
          link: newSocialLink.link,
          token: token,
        })
      );
    }

    setNewSocialLink({
      _id: "",
      name: "",
      link: "",
    });

    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setNewSocialLink({
      _id: "",
      name: "",
      link: "",
    });
    setShowModal(false);
  };

  return (
    <div className="card-body">
      <h5 className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <i className="material-icons text-info mr-2">Social Links</i>
        </div>
        <img
          src={Add}
          onClick={() => {
            setNewSocialLink({
              _id: "new",
              name: "",
              link: "",
            });
            setShowModal(true);
          }}
          alt="add"
        />
      </h5>

      {user.socialLinks.map((socialLink) => (
        <div key={socialLink._id} className="mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {socialLink.faviconUrl && (
                <img
                  src={socialLink.faviconUrl}
                  alt="Favicon"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              )}
              <h6 className="mb-0">{socialLink.name}</h6>
            </div>
            <div>
              <img
                className="edit-icon"
                alt="Edit"
                src={Pen}
                onClick={() => {
                  handleEditSocialLink(socialLink);
                }}
              />
              <img
                className="delete-icon"
                alt="Delete"
                src={DeleteIcon}
                onClick={() => {
                  dispatch(
                    removeSocialLinkAsync({
                      id: user.userId,
                      linkId: socialLink._id,
                      token: token,
                    })
                  );
                }}
              />
            </div>
          </div>
          <p className="text-muted mb-2">
            <a href={socialLink.link} target="_blank" rel="noopener noreferrer">
              {socialLink.link}
            </a>
          </p>
        </div>
      ))}

      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {newSocialLink._id === "new"
                    ? "Add New Social Link"
                    : "Edit Social Link"}
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
                  placeholder="Social Link Name"
                  value={newSocialLink.name}
                  onChange={(e) =>
                    handleSocialLinkChange("name", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Link"
                  value={newSocialLink.link}
                  onChange={(e) =>
                    handleSocialLinkChange("link", e.target.value)
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={handleSaveSocialLink}
                >
                  {newSocialLink._id === "new" ? "Add " : "Save "}
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

export default UserSocialLink;
