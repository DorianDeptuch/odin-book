import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../pages/_app";
import { ProfileContext } from "../pages/profile/[id]";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { format } from "date-fns";

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

function ProfileInfo() {
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
        Info
      </Typography>
      {!profile?.dateOfBirth && !profile?.sex && !profile?.hobbies ? (
        <Typography variant="body1" component="p">
          There doesn't seem to be anything here
        </Typography>
      ) : (
        <Box>
          {profile?.dateOfBirth && (
            <Typography variant="body1" component="p">
              Age: <strong>{getAge(profile?.dateOfBirth)}</strong>
            </Typography>
          )}
          {profile?.dateOfBirth && (
            <Typography variant="body1" component="p">
              Date of Birth:{" "}
              <strong>
                {format(new Date(profile?.dateOfBirth), "MM/dd/yyyy")}
              </strong>
            </Typography>
          )}
          {profile?.sex && (
            <Typography variant="body1" component="p">
              Sex: <strong>{profile?.sex}</strong>
            </Typography>
          )}
          {profile?.hobbies && (
            <Typography variant="body1" component="p">
              Hobbies include: <strong>{profile?.hobbies}</strong>
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
}

export default ProfileInfo;
