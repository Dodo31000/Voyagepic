import axios from "axios";

const API_URL = "/api/auth/";

class AuthService {

  init = () => {
    this.setInterceptors();
};

setInterceptors = () => {
    axios.defaults.headers.common['Token'] = localStorage.getItem("token");
    axios.defaults.headers.common['Device'] = "device";


};

  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return axios.post(API_URL + "signup", {
      email,
      password,
    });
  }
}

export default new AuthService();