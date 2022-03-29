import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../pages/_app";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { format } from "date-fns";

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

function ProfileInfo() {
  const { user } = useContext(UserContext);
  // const [profile, setProfile] = useState({});

  // useEffect(() => {
  //   const { results } = user;
  //   setProfile(results);
  // }, []);

  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Info
      </Typography>
      {!user?.user?.dateOfBirth && !user?.user?.sex && !user?.user?.hobbies ? (
        <Typography variant="body1" component="p">
          There doesn't seem to be anything here
        </Typography>
      ) : (
        <Box>
          {user?.user?.dateOfBirth && (
            <Typography variant="body1" component="p">
              Age: <strong>{getAge(user?.user?.dateOfBirth)}</strong>
            </Typography>
          )}
          {user?.user?.dateOfBirth && (
            <Typography variant="body1" component="p">
              Date of Birth:{" "}
              <strong>
                {format(new Date(user?.user?.dateOfBirth), "MM/dd/yyyy")}
              </strong>
            </Typography>
          )}
          {user?.user?.sex && (
            <Typography variant="body1" component="p">
              Sex: <strong>{user?.user?.sex}</strong>
            </Typography>
          )}
          {user?.user?.hobbies && (
            <Typography variant="body1" component="p">
              Hobbies include: <strong>{user?.user?.hobbies}</strong>
            </Typography>
          )}
        </Box>
      )}
    </Stack>
  );
}

export default ProfileInfo;
