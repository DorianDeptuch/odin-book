import React, { useContext, useState, useEffect } from "react";
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
  const notificationArray = user?.user?.notifications || null;
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    setHasNotifications(user?.notifications?.length ? true : false);
    console.log(hasNotifications);
    console.log(notificationArray);
  }, []);
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
      {notificationArray &&
        notificationArray.map((item) => (
          <Notification
            sender={item.sender}
            recipient={item.recipient}
            date={item.date}
            content={item.content}
            type={item.type}
          />
        ))}
      {/* <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification /> */}
      {!hasNotifications ? (
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
      ) : (
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          sx={{ m: 2, color: "#999" }}
        >
          There are no Notifications to display.
        </Typography>
      )}
    </Popover>
  );
}

export default NotificationPopover;
