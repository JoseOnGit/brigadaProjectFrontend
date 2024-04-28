import axios from "axios";
import { API_URL } from "../config/index";
import authHeader from "./authHeader";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: response.data.email,
              accessToken: response.data.accessToken,
            })
          );
        }

        return response.data;
      });
  }

  logout() {
    localStorage.clear();
  }

  register(name, surname, email, phone, baseId, onboardDate, level, password) {
    return axios.post(API_URL + "/auth/signup", {
      name,
      surname,
      email,
      phone,
      baseId,
      onboardDate,
      level,
      password,
    });
  }

  getuser(email, token) {
    return axios
      .post(
        API_URL + "/auth/user",
        { email: email, token: token },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  getCurrentUserFromStorage() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

// class AuthService {
//   login(email, password) {
//     return axios
//       .post(API_URL + "/auth/signin", {
//         email,
//         password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.clear();
//   }

//   register(name, surname, email, phone, baseId, onboardDate, level, password) {
//     return axios.post(API_URL + "/auth/signup", {
//       name,
//       surname,
//       email,
//       phone,
//       baseId,
//       onboardDate,
//       level,
//       password,
//     });
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem("user"));
//   }
// }

export default AuthService = new AuthService();
