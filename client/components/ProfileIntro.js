import React, { useContext, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UserContext } from "../pages/_app";

function ProfileIntro() {
  const { user } = useContext(UserContext);
  // const [profile, setProfile] = useState({});

  // useEffect(() => {
  //   const { results } = user;
  //   setProfile(results);
  // }, []);

  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Intro
      </Typography>
      {!user?.user?.school &&
      !user?.user?.currentTown &&
      !user?.user?.hometown &&
      !user?.user?.maritalStatus ? (
        <Typography variant="body1" component="p">
          There doesn't seem to be anything here
        </Typography>
      ) : (
        <Box>
          {user?.user?.employment && (
            <Typography variant="body1" component="p">
              Works at <strong>{user?.user?.employment}</strong>
            </Typography>
          )}
          {user?.user?.school && (
            <Typography variant="body1" component="p">
              Studied at <strong>{user?.user?.school}</strong>
            </Typography>
          )}
          {user?.user?.currentTown && (
            <Typography variant="body1" component="p">
              Lives in <strong>{user?.user?.currentTown}</strong>
            </Typography>
          )}
          {user?.user?.hometown && (
            <Typography variant="body1" component="p">
              From <strong>{user?.user?.hometown}</strong>
            </Typography>
          )}
          {user?.user?.maritalStatus && (
            <Typography variant="body1" component="p">
              <strong>{user?.user?.maritalStatus}</strong>
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
}

export default ProfileIntro;
