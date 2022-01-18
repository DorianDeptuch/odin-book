import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

function ProfileFriends() {
  return (
    <Box sx={{ mx: -3 }}>
      <Paper>
        <Stack>
          <Typography variant="h6" component="h6" sx={{ p: 2 }}>
            Friends
          </Typography>
          <Grid container>
            <Grid item md={4}>
              <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Stack direction="row">
                  <Avatar sx={{ height: 75, width: 75, mr: 2 }}>JS</Avatar>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ alignSelf: "center" }}
                  >
                    John Smith
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Stack direction="row">
                  <Avatar sx={{ height: 75, width: 75, mr: 2 }}>JS</Avatar>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ alignSelf: "center" }}
                  >
                    John Smith
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Stack direction="row">
                  <Avatar sx={{ height: 75, width: 75, mr: 2 }}>JS</Avatar>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ alignSelf: "center" }}
                  >
                    John Smith
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Stack direction="row">
                  <Avatar sx={{ height: 75, width: 75, mr: 2 }}>JS</Avatar>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ alignSelf: "center" }}
                  >
                    John Smith
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Stack direction="row">
                  <Avatar sx={{ height: 75, width: 75, mr: 2 }}>JS</Avatar>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ alignSelf: "center" }}
                  >
                    John Smith
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                <Stack direction="row">
                  <Avatar sx={{ height: 75, width: 75, mr: 2 }}>JS</Avatar>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ alignSelf: "center" }}
                  >
                    John Smith
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfileFriends;
