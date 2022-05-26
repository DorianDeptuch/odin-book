import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { avatar_MD, htmlDecode } from "../config/config";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import { client, server } from "../../config/config";
import Giphy from "./Giphy";

const styles = {
  m: 0,
  p: 1,
};

function Comment({ author, content, date, likes, giphy }) {
  const regex = /[a-z0-9]{20}/;

  return (
    <Paper sx={{ m: 1 }} elevation={3}>
      <Stack direction="row">
        <Link href={`${client}/profile/${author._id}`}>
          <Avatar
            src={
              regex.test(author?.profilePicture)
                ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1652941781/${author?.profilePicture}.jpg`
                : author?.profilePicture || ""
            }
            sx={{
              height: avatar_MD,
              width: avatar_MD,
              mx: 2,
              mt: 2,
              alignSelf: "start",
            }}
          ></Avatar>
        </Link>
        <Stack sx={{ my: 2 }}>
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
              {formatDistance(new Date(date), new Date(), {
                addSuffix: true,
              })}
              )
            </Typography>
          </Stack>
          {giphy ? (
            <Giphy selectedGiphy={giphy} />
          ) : (
            <Typography variant="body1" component="p" sx={styles}>
              {htmlDecode(content)}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Comment;
