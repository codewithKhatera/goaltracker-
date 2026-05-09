import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6"
    },
    background: {
      default: "#0f172a",
      paper: "rgba(255,255,255,0.05)"
    }
  },
  shape: {
    borderRadius: 16
  }
});

export default theme;