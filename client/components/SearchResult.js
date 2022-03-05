import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { avatar_MD } from "../config/config";

const styles = {
  m: 2,
  p: 2,
  "&:hover": { backgroundColor: "#eee", cursor: "pointer" },
};

function SearchResult({ firstName, lastName, id }) {
  return (
    <Link href={`/profile/${id}`}>
      <Paper sx={styles} elevation={3}>
        <Stack direction="row">
          <Avatar
            sx={{
              height: avatar_MD,
              width: avatar_MD,
              mr: 2,
            }}
          ></Avatar>
          <Typography variant="h6" component="h6" sx={{ alignSelf: "center" }}>
            {firstName} {lastName}
          </Typography>
        </Stack>
      </Paper>
    </Link>
  );
}

export default SearchResult;
