import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SearchResult from "./SearchResult";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Search() {
  return (
    <Box sx={{ m: 2, p: 2 }}>
      <Stack>
        <Paper elevation={3}>
          <Box sx={{ m: 2, p: 2 }}>
            <TextField
              type="search"
              fullWidth
              placeholder="Search All Users"
            ></TextField>
          </Box>
          <Typography variant="h6" component="h6" sx={{ m: 2, p: 2 }}>
            Results
          </Typography>
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </Paper>
      </Stack>
    </Box>
  );
}

export default Search;
