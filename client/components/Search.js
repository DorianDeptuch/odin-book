import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SearchResult from "./SearchResult";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Search() {
  const [users, setUsers] = useState({});
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <Box sx={{ m: 2, p: 2 }}>
      <Stack>
        <Paper elevation={3}>
          <Typography variant="h6" component="h6" sx={{ m: 2, p: 2 }}>
            Search Users
          </Typography>
          <Box sx={{ m: 2, p: 2 }}>
            <TextField
              type="search"
              fullWidth
              placeholder="Search All Users"
            ></TextField>
          </Box>
          <Box sx={{ m: 2 }}>
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default Search;
