const Login = () => {
  if (localStorage.getItem("logged")) {
    return true;
  } else {
    return false;
  }
};

export default Login;
