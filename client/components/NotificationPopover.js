import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Notification from "./Notification";

function NotificationPopover({
  idNotification,
  openNotification,
  anchorElNotification,
  handleCloseNotification,
}) {
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
    </Popover>
  );
}

export default NotificationPopover;
