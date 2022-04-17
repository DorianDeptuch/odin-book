import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProfileFriend from "./ProfileFriend";
import { ProfileContext } from "../pages/profile/[id]";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { client } from "../../config/config";
import { avatar_MD } from "../config/config";

function ProfileFriends() {
  const currentProfile = useContext(ProfileContext);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const { results } = currentProfile;
    setFriendsList(results.friends);
    console.log(results.friends);
  }, [currentProfile]);

  return (
    <Box sx={{ mx: -3 }}>
      <Paper>
        <Stack>
          <Typography variant="h6" component="h6" sx={{ p: 2 }}>
            Friends
          </Typography>
          <Grid container>
            {/* {friendsList.map((item) => (
              <ProfileFriend
                key={item._id}
                profileID={item._id}
                profilePicture={item.profilePicture}
                firstName={item.firstName}
                lastName={item.lastName}
              />
            ))} */}
            {friendsList.map((item) => (
              <Grid item md={4}>
                <Link href={`${client}/profile/${item._id}`}>
                  <a>
                    <Paper
                      elevation={5}
                      sx={{
                        m: 2,
                        p: 2,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                    >
                      <Stack direction="row">
                        <Avatar
                          src={item.profilePicture || null}
                          sx={{ height: avatar_MD, width: avatar_MD, mr: 2 }}
                        ></Avatar>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ alignSelf: "center" }}
                        >
                          {item.firstName} {item.lastName}
                        </Typography>
                      </Stack>
                    </Paper>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfileFriends;
