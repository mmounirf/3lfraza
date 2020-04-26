import React from "react";
import "./Login.scss";
import "../../assets/firebase-ui-auth.css";
import Firebase from "../../Config/Firebase";
import { TextField, InputAdornment, IconButton, Paper } from "@material-ui/core";
import { LockOpen, Email, VpnKey, Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/actions";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import ActionButton from "../../Components/ActionButton";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(null);
  const [loginForm, setLoginForm] = React.useState({ email: "", password: "", showPassword: false });

  const emailValidation = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user && user.jwt;
  if(!!isLoggedIn) {
    history.push("/dashboard");
  }
  const onLoginFormChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const submitLogin = (e) => {
    setLoading(true);
    Firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password).then((resp) => {
      dispatch(loginAction({jwt: resp.user.refreshToken, email: resp.user.email, id: resp.user.uid }));
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setLoginError({hasError: true, message: `حدث خطأ برجاء المحاولة مره اخري`})
    })

  };

  const closeError = () => {
    setLoginError(null);
  };
  return (
    <div className="auth">
      {loginError && (
        <Alert variant="filled" onClose={closeError} severity="error" className="alert">
          {loginError.message}
        </Alert>
      )}
      
      <div className="login">
      <Paper className="inputs">
        <TextField
          className="field"
          fullWidth
          label="البريد الإليكتروني"
          variant="outlined"
          value={loginForm.email}
          name="email"
          onChange={onLoginFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="field"
          fullWidth
          label="كلمة المرور"
          type={loginForm.showPassword ? "text" : "password"}
          variant="outlined"
          value={loginForm.password}
          name="password"
          onChange={onLoginFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => setLoginForm({ ...loginForm, showPassword: !loginForm.showPassword })}
                  onMouseDown={(e) => e.preventDefault()}
                  color="primary">
                  {loginForm.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      <ActionButton
        fullWidth
        className="action"
        onClick={submitLogin}
        color="secondary"
        loading={loading}
        disableElevation
        disabled={loading || !emailValidation.test(loginForm.email) || !loginForm.password.length}
        startIcon={<LockOpen />}>
        الدخول
      </ActionButton>
      </div>
    </div>
  );
};

export default Login;
