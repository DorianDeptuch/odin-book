import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { avatar_MD } from "../config/config";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import { client, server } from "../../config/config";

const styles = {
  m: 0,
  p: 1,
};

function Comment({ author, content, date, likes }) {
  return (
    <Paper sx={{ m: 1 }} elevation={3}>
      <Stack direction="row">
        <Link href={`${client}/profile/${author._id}`}>
          <Avatar
            src={author?.profilePicture || ""}
            sx={{
              height: avatar_MD,
              width: avatar_MD,
              mx: 2,
              alignSelf: "center",
            }}
          ></Avatar>
        </Link>
        <Stack sx={{ mb: 2 }}>
          <Stack direction="row">
            <Typography variant="h4" component="h4" sx={styles}>
              <strong>
                <Link href={`${client}/profile/${author._id}`}>
                  <a>
                    {author?.firstName} {author?.lastName}
                  </a>
                </Link>
              </strong>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={styles}
              title={format(new Date(date), "PPpp")}
            >
              (
              {formatDistance(subDays(new Date(date), 3), new Date(date), {
                addSuffix: true,
              })}
              )
            </Typography>
          </Stack>
          <Typography variant="body1" component="p" sx={styles}>
            {content}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Comment;
