const user = localStorage.getItem("user");

const Auth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  },
  getAuth() {
    return this.isAuthenticated;
  }
};

if (user) {
  Auth.isAuthenticated = true;
}

export default Auth;
