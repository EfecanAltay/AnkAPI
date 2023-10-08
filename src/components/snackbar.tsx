import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { ISnackbar } from "@/common/snackbar.interface";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UISnackbars = forwardRef<ISnackbar>((props, ref) => {
  const [snackbarState, setSnackbarState] = useState(
    { open: false, message: "", type: "info" }
  );
  const [isShowing, setShowing] = useState(false);


  // const [snackbarData, setSnackbarData] = useState<SnackbarContextData>(
  //   new SnackbarContextData()
  // );
  // const snackbarContext = useContext(SnackbarContext);

  // useEffect(() => {
  //   setSnackbarData(snackbarContext);
  // }, [snackbarContext]);
  useImperativeHandle(ref, () => ({
    ShowInfo(message: string) {
      ShowPopup(message, "info");
    },
    ShowError(message: string) {
      ShowPopup(message, "error");
    },
    ShowSuccess(message: string) {
      ShowPopup(message, "success");
    },
    Close() {
      closePopup();
    },
  }));

  function ShowPopup(message: string, type: string) {
    setSnackbarState({ open: true, message: message, type: type });
    if (!isShowing) {
      setShowing(true);
      setTimeout(() => {
        setSnackbarState({ open: false, message: message, type: type });
        setShowing(false);
      }, 3000);
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    closePopup();
  };

  function closePopup(_type: string = snackbarState.type, _message: string = snackbarState.message) {
    setSnackbarState({ open: false, message: _message, type: _type });
    setShowing(false);
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert
          onClose={handleClose}
          severity={snackbarState.type}
          sx={{ width: "100%" }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
});

UISnackbars.displayName = "UISnackbars";
export default UISnackbars;
