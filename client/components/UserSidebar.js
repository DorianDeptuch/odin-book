import React, { useState, useEffect, useContext } from "react";
import { IndexContext } from "../pages/index";
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
  const user = useContext(IndexContext);
  const [index, setIndex] = useState({});

  useEffect(() => {
    console.log(user);
    const { results } = user;
    setIndex(results);
  }, []);
  return (
    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
      <Box>
        <Link href="/profile/1">
          <a>
            <Stack direction="row" sx={{ p: 1 }}>
              <Avatar sx={iconStyle}></Avatar>
              <Typography
                variant="h6"
                component="h6"
                sx={{ alignSelf: "center" }}
              >
                User Name
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
