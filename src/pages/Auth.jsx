import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Switch
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [showPassword, setShowPassword] = useState(false);

  const t = {
    en: {
      welcome: "Welcome Back",
      signup: "Create account to track goals, XP & streaks",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      button: "Continue to Dashboard"
    },
    fa: {
      welcome: "خوش آمدید",
      signup: "ثبت نام کنید تا اهداف و استریک و XP خود را مدیریت کنید",
      fullName: "نام کامل",
      email: "ایمیل",
      password: "رمز عبور",
      button: "ورود به داشبورد"
    }
  };

  const bg = dark ? "#14366D" : "#ffffff";
  const color = dark ? "#fff" : "#14366D";

  return (
    <Box
      sx={{
        height: "100vh",
        background: bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "0.3s"
      }}
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      {/* TOP BAR */}
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <Button onClick={() => setLang(lang === "en" ? "fa" : "en")}>
          {lang === "en" ? "FA" : "EN"}
        </Button>

        <Switch checked={dark} onChange={() => setDark(!dark)} />
      </Box>

      {/* CARD */}
      <Card
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          textAlign: "center"
        }}
      >
        {/* TITLE */}
        <Typography variant="h5" fontWeight="bold">
          {isLogin ? t[lang].welcome : t[lang].signup}
        </Typography>

        {/* FULL NAME */}
        {!isLogin && (
          <TextField
            fullWidth
            placeholder={t[lang].fullName}
            sx={{ mt: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />
        )}

        {/* EMAIL */}
        <TextField
          fullWidth
          placeholder={t[lang].email}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          placeholder={t[lang].password}
          type={showPassword ? "text" : "password"}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.5 }}
          startIcon={<LoginIcon />}
          onClick={() => navigate("/dashboard")}
        >
          {t[lang].button}
        </Button>

        {/* SWITCH LOGIN/SIGNUP */}
        <Typography
          sx={{ mt: 2, fontSize: 13, cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? lang === "en"
              ? "Create new account"
              : "ساخت حساب جدید"
            : lang === "en"
            ? "Back to login"
            : "بازگشت به ورود"}
        </Typography>
      </Card>
    </Box>
  );
}