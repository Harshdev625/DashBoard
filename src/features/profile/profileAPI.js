import axios from "axios";

export function getUserById(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userInfo.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function updateUserInfo(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userInfo.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function updateHeadlineAndDescription(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${userInfo.id}/headline-description`,
        {
          headline: userInfo.headline,
          description: userInfo.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function addProject(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/${user.id}/projects`,
        user.project,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function deleteProject(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${user.id}/projects/${user.projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function updateProject(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${user.id}/projects/${user.projectId}`,
        user.project,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function addSkill(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/${user.id}/skills`,
        user.skill,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function removeSkill(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${user.id}/skills/${user.skillId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function updateSkill(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${user.id}/skills/${user.skillId}`,
        user.skill,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function addCompany(user) {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios.post(
        `http://localhost:8080/users/${user.id}/companies`,
        user.company,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function deleteCompany(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${user.id}/companies/${user.companyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function updateCompany(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${user.id}/companies/${user.companyId}`,
        user.company,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function addEducation(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/${user.id}/education`,
        user.education,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function deleteEducation(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${user.id}/education/${user.educationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function updateEducation(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${user.id}/education/${user.educationId}`,
        user.education,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// Add a social link
export function addSocialLink(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/${user.id}/socialLinks`,
        {
          name: user.name,
          link: user.link,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// Update a social link
export function updateSocialLink(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users/${user.id}/socialLinks/${user.linkId}`,
        {
          name: user.name,
          link: user.link,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// Remove a social link
export function removeSocialLink(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${user.id}/socialLinks/${user.linkId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export const updateProfilePicture = async (profilePictureInfo) => {
  try {
    const formData = new FormData();
    formData.append("file", profilePictureInfo.profilePicture);
    const response = await axios.patch(
      `http://localhost:8080/users/${profilePictureInfo.id}/upload-profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${profilePictureInfo.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBackgroundPicture = async (backgroundPictureInfo) => {
  try {
    const formData = new FormData();
    formData.append("file", backgroundPictureInfo.backgroundPicture);
    
    const response = await axios.patch(
      `http://localhost:8080/users/${backgroundPictureInfo.id}/upload-background-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${backgroundPictureInfo.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
