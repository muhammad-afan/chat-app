import React from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "./redux/slices/app";

const vertical = "bottom",
  horizontal = "center";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();

  const { severity, message, open } = useSelector(
    (state) => state.app.snackbar
  );
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
