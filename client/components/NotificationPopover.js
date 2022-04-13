import React, { useContext, useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Notification from "./Notification";
import { UserContext } from "../pages/_app";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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
  const router = useRouter();

  useEffect(() => {
    setHasNotifications(notificationArray?.length ? true : false);
    console.log(hasNotifications);
    console.log(notificationArray);
  }, []);

  const handleRemoveAllNotifications = (e) => {
    e.preventDefault();

    fetch(`${server}/removeAllNotifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        router.push(`${client}/`);
        // handleCloseNotification();
        setHasNotifications(false);
        setNotificationArray(null);
        setNotificationLength(null);
        setAnchorElNotification(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
