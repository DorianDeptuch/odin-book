import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProfileFriend from "./ProfileFriend";
import { ProfileContext } from "../pages/profile/[id]";
import { UserContext } from "../pages/_app";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { client } from "../../config/config";
import { avatar_MD } from "../config/config";

function ProfileFriends({ id }) {
  const currentProfile = useContext(ProfileContext);
  const { user } = useContext(UserContext);
  const ownProfile = user?.user?._id === id ? true : false;
  const [friendsList, setFriendsList] = useState([]);
  const [userFriendsList, setUserFriendsList] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const { results } = currentProfile;
    setUserFriendsList(user?.user?.friends);
    setFriendsList(results.friends);
    setProfile(results);
  }, [currentProfile]);

  const compareMutualFriends = (arr1, arr2) => {
    return arr1.reduce(
      (a, c) => a + arr2.map((item) => item._id).includes(c),
      0
    );
  };

  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  return (
    <Box sx={{ mx: -3 }}>
      <Paper>
        <Stack>
          <Typography variant="h6" component="h6" sx={{ p: 2 }}>
            Friends
          </Typography>
          {friendsList && (
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
                          <Stack>
                            <Typography
                              variant="h6"
                              component="h6"
                              sx={{ alignSelf: "start" }}
                            >
                              {item.firstName} {item.lastName}
                            </Typography>
                            <Stack direction="row">
                              <Typography
                                variant="body1"
                                component="p"
                                sx={{ alignSelf: "start", mr: 1 }}
                              >
                                <strong>{getAge(item.dateOfBirth)}</strong>
                              </Typography>
                              <Typography
                                variant="body1"
                                component="p"
                                sx={{ alignSelf: "start", mr: 1 }}
                              >
                                <strong>{item.sex}</strong>
                              </Typography>
                              <Typography
                                variant="body1"
                                component="p"
                                sx={{ alignSelf: "start", mr: 1 }}
                              >
                                <strong>{item.currentTown}</strong>
                              </Typography>
                            </Stack>
                            {!ownProfile && (
                              <Typography variant="body2" component="p">
                                {compareMutualFriends(
                                  userFriendsList,
                                  friendsList
                                )}{" "}
                                mutual friends
                              </Typography>
                            )}
                          </Stack>
                        </Stack>
                      </Paper>
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
          {!friendsList.length && (
            <Typography
              variant="h6"
              component="h6"
              textAlign="center"
              sx={{ my: 2, color: "#999" }}
            >
              {profile.firstName} doesn't have any friends yet.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfileFriends;
