import React, { useContext, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Friend from "./Friend";
import { ProfileContext } from "../pages/profile/[id]";

function FriendsList() {
  const currentProfile = useContext(ProfileContext);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const { results } = currentProfile;
    setFriendsList(results.friends);
  }, [currentProfile]);

  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Stack>
        <Typography variant="h6" component="h6">
          Friend's List
        </Typography>
        {friendsList.map((item) => (
          <Friend
            key={item._id}
            profileID={item._id}
            profilePicture={item.profilePicture}
            firstName={item.firstName}
            lastName={item.lastName}
          />
        ))}
      </Stack>
    </Paper>
  );
}

export default FriendsList;
