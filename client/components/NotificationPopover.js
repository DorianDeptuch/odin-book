import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Notification from "./Notification";
import { UserContext } from "../pages/_app";

function NotificationPopover({
  idNotification,
  openNotification,
  anchorElNotification,
  handleCloseNotification,
}) {
  const { user } = useContext(UserContext);
  return (
    <Popover
      id={idNotification}
      open={openNotification}
      anchorEl={anchorElNotification}
      onClose={handleCloseNotification}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <form
        action="/removeAllNotifications"
        method="POST"
        sx={{ width: "100%" }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ p: 2, width: "100%", alignSelf: "center" }}
        >
          Clear All Notifications
        </Button>
      </form>
    </Popover>
  );
}

export default NotificationPopover;
