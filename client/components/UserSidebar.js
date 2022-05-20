import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../pages/_app";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const iconStyle = {
  height: "30px",
  width: "30px",
  mr: 1,
  cursor: "pointer",
};

function UserSidebar() {
  const { user, setUser } = useContext(UserContext);
  const regex = /[a-z0-9]{20}/;

  return (
    <Paper
      elevation={3}
      sx={{ m: 2, p: 2, display: ["none", "none", "block"] }}
    >
      <Box>
        <Link href={`/profile/${user?.user?._id}`}>
          <a>
            <Stack direction="row" sx={{ p: 1 }}>
              <Avatar
                src={
                  regex.test(user?.user?.profilePicture)
                    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1652941781/${user?.user?.profilePicture}.jpg`
                    : user?.user?.profilePicture || ""
                }
                sx={iconStyle}
              ></Avatar>
              <Typography
                variant="h6"
                component="h6"
                sx={{ alignSelf: "center" }}
              >
                {user?.user?.firstName} {user?.user?.lastName}
              </Typography>
            </Stack>
          </a>
        </Link>
        <Link href="/settings">
          <a>
            <Stack direction="row" sx={{ p: 1 }}>
              <SettingsIcon sx={iconStyle}></SettingsIcon>
              <Typography
                variant="h6"
                component="h6"
                sx={{ alignSelf: "center" }}
              >
                Settings
              </Typography>
            </Stack>
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Stack direction="row" sx={{ p: 1 }}>
              <SearchIcon sx={iconStyle}></SearchIcon>
              <Typography
                variant="h6"
                component="h6"
                sx={{ alignSelf: "center" }}
              >
                Search Users
              </Typography>
            </Stack>
          </a>
        </Link>
      </Box>
    </Paper>
  );
}

export default UserSidebar;
