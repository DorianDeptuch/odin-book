import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SearchResult from "./SearchResult";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Search({ data }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((data) => {
    console.log(data.results);
    setUsers(data.results);
    setFilterCount(10);

    // })
    // .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilterCount(
      users.filter((val) => {
        if (searchTerm == "") {
          return val;
        } else if (
          val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      }).length
    );
  }, [searchTerm]);

  return (
    <Box sx={{ m: 2, p: 2 }}>
      <Stack>
        <Paper elevation={3}>
          <Typography variant="h6" component="h6" sx={{ m: 2, p: 2 }}>
            Search Users
          </Typography>
          <Box sx={{ m: 2, p: 2 }}>
            <TextField
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              fullWidth
              placeholder="Search All Users"
            ></TextField>
          </Box>
          <Box sx={{ m: 2 }}>
            {filterCount > 0 ? (
              users &&
              users
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.firstName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.lastName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item) => (
                  <SearchResult
                    key={item._id}
                    id={item._id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                  />
                ))
            ) : (
              <Typography variant="h6" component="h6" align="center">
                No users with the name of "{searchTerm}" found
              </Typography>
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default Search;
