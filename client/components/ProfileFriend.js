import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { avatar_MD } from "../config/config";
import { client } from "../../config/config";
import Link from "next/link";

function ProfileFriend(profileID, profilePicture, firstName, lastName) {
  const regex = /[a-z0-9]{20}/;

  return (
    <Link href={`${client}/profile/${profileID}`} style={{ width: "100%" }}>
      <a>
        <Grid item md={4} sx={{ width: "100% !important" }}>
          <Paper
            elevation={3}
            sx={{
              m: 2,
              p: 2,
              "&:hover": { backgroundColor: "#eee", cursor: "pointer" },
              width: "100%",
            }}
          >
            <Stack direction="row">
              <Avatar
                src={
                  regex.test(profilePicture)
                    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1652941781/${profilePicture}.jpg`
                    : profilePicture || ""
                }
                sx={{ height: avatar_MD, width: avatar_MD, mr: 2 }}
              ></Avatar>
              <Typography
                variant="h6"
                component="h6"
                sx={{ alignSelf: "center" }}
              >
                {firstName} {lastName}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </a>
    </Link>
  );
}

export default ProfileFriend;
