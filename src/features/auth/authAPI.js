import axios from "axios";

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        {
          email: loginInfo.email,
          password: loginInfo.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Assuming response.data contains the token
      localStorage.setItem("token", response.data.token);

      resolve({ token: response.data.token }); // Corrected to access token directly
    } catch (error) {
      reject(error);
    }
  });
}

export function createUser(userdata) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users",
        {
          name: userdata.name,
          email: userdata.email,
          password: userdata.password,
          dateOfBirth: userdata.dateOfBirth,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);

      resolve({ token: response.data.token });
    } catch (error) {
      reject(error);
    }
  });
}

export function logOut(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(
        "http://localhost:8080/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      localStorage.removeItem("token");

      resolve({ token: null });
    } catch (error) {
      reject(error);
    }
  });
}
