import React, { useContext, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UserContext } from "../pages/_app";
import { ProfileContext } from "../pages/profile/[id]";

function ProfileIntro() {
  const { user } = useContext(UserContext);
  const currentProfile = useContext(ProfileContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const { results } = currentProfile;
    setProfile(results);
  }, []);

  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Intro
      </Typography>
      {!profile?.school &&
      !profile?.currentTown &&
      !profile?.hometown &&
      !profile?.maritalStatus ? (
        <Typography variant="body1" component="p">
          There doesn't seem to be anything here
        </Typography>
      ) : (
        <Box>
          {profile?.employment && (
            <Typography variant="body1" component="p">
              Works at <strong>{profile?.employment}</strong>
            </Typography>
          )}
          {profile?.school && (
            <Typography variant="body1" component="p">
              Studied at <strong>{profile?.school}</strong>
            </Typography>
          )}
          {profile?.currentTown && (
            <Typography variant="body1" component="p">
              Lives in <strong>{profile?.currentTown}</strong>
            </Typography>
          )}
          {profile?.hometown && (
            <Typography variant="body1" component="p">
              From <strong>{profile?.hometown}</strong>
            </Typography>
          )}
          {profile?.maritalStatus && (
            <Typography variant="body1" component="p">
              <strong>{profile?.maritalStatus}</strong>
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
}

export default ProfileIntro;
