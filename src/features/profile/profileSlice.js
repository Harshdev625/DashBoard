import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserById,
  updateUserInfo,
  updateHeadlineAndDescription,
  addProject,
  deleteProject,
  updateProject,
  addSkill,
  removeSkill,
  updateSkill,
  addCompany,
  deleteCompany,
  updateCompany,
  addEducation,
  deleteEducation,
  updateEducation,
  removeSocialLink,
  addSocialLink,
  updateSocialLink,
  updateBackgroundPicture,
  updateProfilePicture,
} from "./profileAPI";

const initialState = {
  userId: null,
  email: null,
  description: null,
  headline: null,
  name: null,
  projects: [],
  skills: [],
  education: [],
  companies: [],
  profilePicture: "",
  profileBackgroundPicture: "",
  socialLinks: [],
  academicInfo: null,
  status: "idle",
  error: null,
};

export const updateProfilePictureAsync = createAsyncThunk(
  "profile/updateProfilePicture",
  async (profilePictureInfo, { rejectWithValue }) => {
    try {
      const response = await updateProfilePicture(profilePictureInfo);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateBackgroundPictureAsync = createAsyncThunk(
  "profile/updateBackgroundPicture",
  async (backgroundPictureInfo, { rejectWithValue }) => {
    try {
      const response = await updateBackgroundPicture(backgroundPictureInfo);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getUserProfileAsync = createAsyncThunk(
  "profile/getUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserById(userId);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "profile/updateUserInfo",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await updateUserInfo(userInfo);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateHeadlineAndDescriptionAsync = createAsyncThunk(
  "profile/updateHeadlineAndDescription",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await updateHeadlineAndDescription(userInfo);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addProjectAsync = createAsyncThunk(
  "profile/addProject",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await addProject(userInfo);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateProjectAsync = createAsyncThunk(
  "profile/updateProject",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await updateProject(userInfo);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "profile/deleteProject",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await deleteProject(userInfo);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addSkillAsync = createAsyncThunk(
  "profile/addSkill",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await addSkill(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const removeSkillAsync = createAsyncThunk(
  "profile/removeSkill",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await removeSkill(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateSkillAsync = createAsyncThunk(
  "profile/updateSkill",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateSkill(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addCompanyAsync = createAsyncThunk(
  "profile/addCompany",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await addCompany(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteCompanyAsync = createAsyncThunk(
  "profile/deleteCompany",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await deleteCompany(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateCompanyAsync = createAsyncThunk(
  "profile/updateCompany",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateCompany(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addEducationAsync = createAsyncThunk(
  "profile/addEducation",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await addEducation(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteEducationAsync = createAsyncThunk(
  "profile/deleteEducation",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await deleteEducation(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateEducationAsync = createAsyncThunk(
  "profile/updateEducation",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateEducation(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addSocialLinkAsync = createAsyncThunk(
  "profile/addSocialLink",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await addSocialLink(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateSocialLinkAsync = createAsyncThunk(
  "profile/updateSocialLink",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateSocialLink(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const removeSocialLinkAsync = createAsyncThunk(
  "profile/removeSocialLink",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await removeSocialLink(userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfileAsync.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.description = action.payload.description;
        state.headline = action.payload.headline;
        state.status = "Fulfilled";
        state.userId = action.payload._id;
        state.projects = action.payload.projects;
        state.skills = action.payload.skills;
        state.education = action.payload.education;
        state.companies = action.payload.companies;
        state.socialLinks = action.payload.socialLinks;
        state.academicInfo = action.payload.academicInfo;
        state.profilePicture = action.payload.profilePicture;
        state.profileBackgroundPicture = action.payload.profileBackgroundPicture;
      })
      .addCase(getUserProfileAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        // Update state based on the response if needed
      })
      .addCase(addProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "Fulfilled";
      })
      .addCase(addProjectAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "Fulfilled";
      })
      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(deleteProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "Fulfilled";
      })
      .addCase(deleteProjectAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateHeadlineAndDescriptionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHeadlineAndDescriptionAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.description = action.payload.description;
        state.headline = action.payload.headline;
      })
      .addCase(updateHeadlineAndDescriptionAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(addSkillAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSkillAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.skills = action.payload;
      })
      .addCase(addSkillAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(removeSkillAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSkillAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.skills = action.payload;
      })
      .addCase(removeSkillAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateSkillAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSkillAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.skills = action.payload;
      })
      .addCase(updateSkillAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(addCompanyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCompanyAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.companies = action.payload;
      })
      .addCase(addCompanyAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(deleteCompanyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCompanyAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.companies = action.payload;
      })
      .addCase(deleteCompanyAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateCompanyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCompanyAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.companies = action.payload;
      })
      .addCase(updateCompanyAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(addEducationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEducationAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.education = action.payload;
      })
      .addCase(addEducationAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(deleteEducationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEducationAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.education = action.payload;
      })
      .addCase(deleteEducationAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateEducationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEducationAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.education = action.payload;
      })
      .addCase(updateEducationAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(addSocialLinkAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSocialLinkAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.socialLinks = action.payload;
      })
      .addCase(addSocialLinkAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateSocialLinkAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSocialLinkAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.socialLinks = action.payload;
      })
      .addCase(updateSocialLinkAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(removeSocialLinkAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSocialLinkAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.socialLinks = action.payload;
      })
      .addCase(removeSocialLinkAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateProfilePictureAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfilePictureAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.profilePicture = action.payload;
      })
      .addCase(updateProfilePictureAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      })
      .addCase(updateBackgroundPictureAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBackgroundPictureAsync.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.profileBackgroundPicture = action.payload;
      })
      .addCase(updateBackgroundPictureAsync.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
      });
  },
});

export const selectUserProfile = (state) => state.profile;

export default profileSlice.reducer;
