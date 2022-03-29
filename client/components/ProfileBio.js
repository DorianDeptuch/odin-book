import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../pages/_app";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ProfileBio() {
  const { user } = useContext(UserContext);
  // const [profile, setProfile] = useState({});

  // useEffect(() => {
  //   const { results } = user;
  //   setProfile(results);
  // }, []);

  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Bio
      </Typography>
      {!user?.user?.bio ? (
        <Typography variant="body1" component="p">
          There doesn't seem to be anything here
        </Typography>
      ) : (
        <Typography variant="body1" component="p">
          {user?.user?.bio}
        </Typography>
      )}
    </Stack>
  );
}

export default ProfileBio;
