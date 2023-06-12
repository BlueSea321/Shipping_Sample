import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../API/auth";
import { useAuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import validator from "validator";
import MainBody from "../../Components/MainBody";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Transport
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { setIsLogin } = useAuthContext();
  const [alertMsg, setAlertMsg] = React.useState("");
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [role, setRole] = React.useState()

  const onChangeHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('login')
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setAlertMsg("Please fill blank fields");
      return;
    } else if (!validator.isEmail(loginData.email)) {
      setAlertMsg("Invalid email!");
      return;
    } else {
      const res = await login(loginData);
      if (res.status === "success") {
        setIsLogin(true);
        localStorage.setItem("transport_token", res.token);
        localStorage.setItem("transport_user_name", res.name);
        const role = res.role
        if (role === 'user') setRole('user')
        if (role === 'admin') setRole('admin')
      } else if (res.status === "wrong_pwd") {
        console.log("Wrong");
        setAlertMsg("Please enter correct password!");
      } else if (res.status === "not_exist") {
        setAlertMsg("Email does not exist!");
      }
    }
  };

  React.useEffect(() => {
    if (role === 'admin') {
      navigate('/admin/home')
    } else if(role === 'user') {
      navigate('/')
    }
  }, [role, navigate])

  return (
    <MainBody>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {alertMsg ? (
            <Alert sx={{ marginTop: 2 }} severity="warning">
              {alertMsg}
            </Alert>
          ) : (
            ""
          )}
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={loginData.email}
                onChange={onChangeHandler}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={loginData.password}
                onChange={onChangeHandler}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </MainBody>
  );
}
