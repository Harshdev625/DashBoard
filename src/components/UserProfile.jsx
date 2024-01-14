import React, { useState, useEffect } from "react";
import EditInfo from "../Image/EditInfo.png";
import "./UserProfile.css";
import Upload from "../Image/Upload.png";

import { useDispatch, useSelector } from "react-redux";
import { logOutAsync } from "../features/auth/authSlice";
import {
  getUserProfileAsync,
  selectUserProfile,
  updateHeadlineAndDescriptionAsync,
  updateProfilePictureAsync,
  updateBackgroundPictureAsync,
} from "../features/profile/profileSlice";
import UserSkill from "./UserSkill";
import UserProject from "./UserProject";
import UserCompanies from "./UserCompanies";
import UserEducation from "./UserEducation";
import UserSocialLink from "./UserSocialLinks";
const decodeJwt = (token) => {
  try {
    if (!token) {
      console.error("Token is null");
      return null;
    }
    const parts = token.split(".");
    return JSON.parse(atob(parts[1]));
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

const getToken = () => {
  return localStorage.getItem("token");
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const token = getToken();
  const user = useSelector(selectUserProfile);

  useEffect(() => {
    const decodedToken = decodeJwt(token);
    if (decodedToken && decodedToken.id) {
      const id = decodedToken.id;
      const userInfo = {
        id: id,
        token: token,
      };
      dispatch(getUserProfileAsync(userInfo));
    } else {
      console.error("Invalid or null token");
    }
  }, [dispatch, token]);

  const [headline, setHeadline] = useState(user?.headline || "");
  const [description, setDescription] = useState(user?.description || "");
  const [showEditModal, setShowEditModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (type === "profilePicture") {
      setProfilePicture(file);
    } else if (type === "backgroundPicture") {
      setBackgroundPicture(file);
    }
  };
  const handleSaveImages = async () => {
    if (profilePicture) {
      dispatch(
        updateProfilePictureAsync({
          id: user.userId,
          token: token,
          profilePicture: profilePicture,
        })
      );
      setProfilePicture(null);
    }

    if (backgroundPicture) {
      dispatch(
        updateBackgroundPictureAsync({
          id: user.userId,
          token: token,
          backgroundPicture: backgroundPicture,
        })
      );
      setBackgroundPicture(null);
    }

    setShowUploadModal(false);
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    dispatch(
      updateHeadlineAndDescriptionAsync({
        id: user.userId,
        token: token,
        headline: headline,
        description: description,
      })
    );
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    if (user) {
      setHeadline(user.headline || "");
      setDescription(user.description || "");
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body text-center position-relative">
                <div className="background-image">
                  <div className="pen-info-container">
                    <img
                      className="edit-info"
                      alt="Edit"
                      src={Upload}
                      onClick={handleUploadClick}
                    />
                  </div>
                  <img
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "https://bootdey.com/img/Content/avatar/avatar7.png"
                    }
                    alt="Admin"
                    className="rounded-circle"
                    height={175}
                    width={175}
                  />
                  <div className="edit-info-container">
                    <img
                      className="edit-info"
                      alt="Edit"
                      src={EditInfo}
                      onClick={handleEditClick}
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">{user.headline}</p>
                    <p className="text-muted font-size-sm">
                      {user.description}
                    </p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success"
                onClick={() => dispatch(logOutAsync({ token: getToken() }))}
              >
                SignOut
              </button>
            </div>
            <div className="card mt-3">
              <UserSocialLink />
            </div>
          </div>
          {showEditModal && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Profile</h5>
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
                      placeholder="Headline"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                    <textarea
                      className="form-control"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSaveChanges}
                    >
                      Save
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
          {showUploadModal && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Upload Images</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowUploadModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <label>Profile Picture:</label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "profilePicture")}
                      />
                      {profilePicture && (
                        <img
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile Preview"
                          className="uploaded-image"
                        />
                      )}
                    </div>
                    <div>
                      <label>Background Picture:</label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "backgroundPicture")
                        }
                      />
                      {backgroundPicture && (
                        <img
                          src={URL.createObjectURL(backgroundPicture)}
                          alt="Background Preview"
                          className="uploaded-image"
                        />
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSaveImages}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowUploadModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.name}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">(239) 816-9029</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">(320) 380-4539</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Bay Area, San Francisco, CA
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info "
                      target="__blank"
                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row gutters-sm">
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <UserProject />
                </div>
              </div>
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <UserSkill />
                </div>
              </div>
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <UserEducation />
                </div>
              </div>
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <UserCompanies />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
