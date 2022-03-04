import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FriendRequestPopover from "./FriendRequestPopover";
import NotificationPopover from "./NotificationPopover";
import { avatar_SM } from "../config/config";

const styles = {
  mx: 2,
  cursor: "pointer",
};

export default function Navbar({ req }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElRequest, setAnchorElRequest] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const openRequest = Boolean(anchorElRequest);
  const openNotification = Boolean(anchorElNotification);
  const handleClickRequest = (event) => {
    setAnchorElRequest(event.currentTarget);
  };
  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseRequest = () => {
    setAnchorElRequest(null);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const idRequest = openRequest ? "simple-popover" : undefined;
  const idNotification = openNotification ? "simple-popover" : undefined;

  useEffect(() => {
    console.log(req?.user);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" sx={{ width: "100%" }}>
            <Link href="/">
              <Typography
                variant="h6"
                component="div"
                sx={{ ...styles, flexGrow: 1, alignSelf: "center" }}
              >
                OdinBook
              </Typography>
            </Link>
            <Box>
              {req?.user && (
                <Tooltip title="Friend Requests">
                  <Badge sx={styles} color="error" badgeContent={3}>
                    <PersonAddIcon
                      aria-describedby={idRequest}
                      onClick={handleClickRequest}
                    />
                    <FriendRequestPopover
                      idRequest={idRequest}
                      openRequest={openRequest}
                      anchorElRequest={anchorElRequest}
                      handleCloseRequest={handleCloseRequest}
                    />
                  </Badge>
                </Tooltip>
              )}
              {req?.user && (
                <Tooltip title="Notifications">
                  <Badge sx={styles} color="error" badgeContent={4}>
                    <NotificationsNoneIcon
                      aria-describedby={idNotification}
                      onClick={handleClickNotification}
                    />
                    <NotificationPopover
                      idNotification={idNotification}
                      openNotification={openNotification}
                      anchorElNotification={anchorElNotification}
                      handleCloseNotification={handleCloseNotification}
                    />
                  </Badge>
                </Tooltip>
              )}
              <AccountCircleIcon
                sx={{ ...styles, height: avatar_SM, width: avatar_SM }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link href="/profile/1">
                  <MenuItem onClick={handleClose}>Your Profile</MenuItem>
                </Link>
                <Link href="/settings">
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                </Link>
                <Link href="/logout">
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Link>
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  return {
    props: { req: req },
  };
}
