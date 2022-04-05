import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { avatar_MD } from "../config/config";

const styles = {
  m: 0,
  p: 1,
};

function Comment({ author, content, date, likes }) {
  return (
    <Paper sx={{ m: 1 }} elevation={3}>
      <Stack direction="row">
        <Avatar
          sx={{
            height: avatar_MD,
            width: avatar_MD,
            mx: 2,
            alignSelf: "center",
          }}
        ></Avatar>
        <Stack sx={{ mb: 2 }}>
          <Stack direction="row">
            <Typography variant="h4" component="h4" sx={styles}>
              <strong>
                {author?.firstName} {author?.lastName}
              </strong>
            </Typography>
            <Typography variant="caption" component="p" sx={styles}>
              ({date})
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
