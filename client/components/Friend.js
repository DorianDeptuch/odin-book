import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { avatar_SM } from "../config/config";
import { client } from "../../config/config";
import Link from "next/link";

function Friend({ profileID, profilePicture, firstName, lastName }) {
  return (
    <Link href={`${client}/profile/${profileID}`}>
      <a>
        <Box
          sx={{
            p: 2,
            "&:hover": { backgroundColor: "#eee", cursor: "pointer" },
          }}
        >
          <Stack direction="row">
            <Avatar
              src={profilePicture || null}
              sx={{
                height: avatar_SM,
                width: avatar_SM,
                mr: 1,
              }}
            ></Avatar>
            <Typography variant="h6" component="h6">
              {firstName} {lastName}
            </Typography>
          </Stack>
        </Box>
      </a>
    </Link>
  );
}

export default Friend;
