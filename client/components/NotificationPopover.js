import React, { useContext, useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Notification from "./Notification";
import { UserContext } from "../pages/_app";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";

function NotificationPopover({
  idNotification,
  openNotification,
  anchorElNotification,
  handleCloseNotification,
  setAnchorElNotification,
  setNotificationLength,
}) {
  const { user } = useContext(UserContext);
  const [notificationArray, setNotificationArray] = useState(
    user?.user?.notifications || null
  );
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    setHasNotifications(notificationArray?.length ? true : false);
    setNotificationArray(user?.user?.notifications);
  }, [user]);

  const handleRemoveAllNotifications = (e) => {
    e.preventDefault();

    const data = {
      user: user?.user?._id,
    };

    fetch(`${server}/removeAllNotifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setHasNotifications(false);
        setNotificationArray([]);
        setNotificationLength(0);
        setAnchorElNotification(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

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
      // sx={{ maxWidth: ["100%", "80%", "60%", "60%", "60%"] }}
    >
      {notificationArray &&
        notificationArray.map((item) => (
          <Notification
            key={item._id}
            sender={item.sender}
            recipient={item.recipient}
            date={item.date}
            content={item.content}
            type={item.type}
          />
        ))}
      {hasNotifications ? (
        <form
          action="/removeAllNotifications"
          method="POST"
          sx={{ width: "100%" }}
          onSubmit={handleRemoveAllNotifications}
        >
          <Button
            variant="contained"
            color="error"
            sx={{ p: 2, width: "100%", alignSelf: "center" }}
            type="submit"
          >
            Clear All Notifications
          </Button>
        </form>
      ) : (
        <Typography
          variant="body1"
          component="p"
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
