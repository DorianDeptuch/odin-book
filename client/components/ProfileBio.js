import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../pages/_app";
import { ProfileContext } from "../pages/profile/[id]";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ProfileBio() {
  const { user } = useContext(UserContext);
  const currentProfile = useContext(ProfileContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const { results } = currentProfile;
    setProfile(results);
  }, [currentProfile]);

  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Bio
      </Typography>
      {!profile?.bio ? (
        <Typography
          variant="h6"
          component="ph6"
          textAlign="center"
          sx={{ my: 2, color: "#999" }}
        >
          There doesn't seem to be anything here
        </Typography>
      ) : (
        <Typography variant="body1" component="p">
          {profile?.bio}
        </Typography>
      )}
    </Stack>
  );
}

export default ProfileBio;
