import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { avatar_SM } from "../config/config";
import { client } from "../../config/config";
import Link from "next/link";
import { formatDistance } from "date-fns";

function IndexFriend({
  profileID,
  profilePicture,
  firstName,
  lastName,
  lastOnline,
}) {
  const regex = /[a-z0-9]{20}/;

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
              src={
                regex.test(profilePicture)
                  ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1652941781/${profilePicture}.jpg`
                  : profilePicture || ""
              }
              sx={{
                height: avatar_SM,
                width: avatar_SM,
                mr: 1,
              }}
            ></Avatar>
            <Stack>
              <Typography variant="h6" component="h6">
                {firstName} {lastName}
              </Typography>
              {lastOnline && (
                <Typography variant="body1" component="p">
                  &nbsp;{" "}
                  <i>
                    {formatDistance(new Date(lastOnline), new Date(), {
                      addSuffix: true,
                    }) || ""}
                  </i>
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
      </a>
    </Link>
  );
}

export default IndexFriend;
