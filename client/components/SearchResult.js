import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { avatar_MD } from "../config/config";

function SearchResult({ name }) {
  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      <Stack direction="row">
        <Avatar
          sx={{
            height: avatar_MD,
            width: avatar_MD,
            mr: 2,
          }}
        ></Avatar>
        <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
          {name}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default SearchResult;
