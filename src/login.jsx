import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { ACCOUNTS } from "../source/account";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên tài khoản chưa được nhập")
    .min(5, "Tên tài khoản phỉa nhiều hơn 8 kí từ"),
  password: Yup.string()
    .required("Mật khẩu chưa được nhập")
    .min(5, "Mật khẩu phỉa nhiều hơn 8 kí từ")
    .max(32, "Mật khẩu phải ít hơn 32 kí tự"),
});
function Login() {
  useEffect(() => {
    localStorage.setItem("isLogin", "false");
  },[]);
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const [checkLogin, setCheckLogin] = useState({
    username: false,
    password: false,
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await ValidationSchema.validate(inputValues, { abortEarly: false });
      if (
        ACCOUNTS.some(
          (e) =>
            e.username == inputValues.username &&
            e.password == inputValues.password
        )
      ) {
        toast.success("Login successfully!!!");
        localStorage.setItem("isLogin", "true");
        navigate("/home");
        navigate(0)
        setCheckLogin({
          username: false,
          password: false,
        });
      } else {
        toast.error("Invalid username or password");
        setCheckLogin({
          username: false,
          password: false,
        });
      }
    } catch (error) {
      let newCheck = {
        username: false,
        password: false,
      };
      toast.error(error.errors[0]);
      for (let err of error.inner) {
        newCheck = {
          ...newCheck,
          [err.path]: true,
        };
      }
      setCheckLogin(newCheck);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        maxHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 10,
      }}
    >
      <Card sx={{ minWidth: 600 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" textAlign={"center"} marginBottom={2}>
            Login
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            error={checkLogin.username}
            sx={{ flex: 3 }}
            onChange={(e) => {
              setInputValues({ ...inputValues, username: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={checkLogin.password}
            sx={{
              flex: 3,
              marginTop: 2,
            }}
            onChange={(e) => {
              setInputValues({ ...inputValues, password: e.target.value });
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ my: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="body" textAlign={"center"}>
            Dont have ACCOUNTS?
          </Typography>
          <Link to={"/register"} style={{ width: "100%" }}>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
