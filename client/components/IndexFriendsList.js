import React, { useContext, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IndexFriend from "./IndexFriend";
import { UserContext } from "../pages/_app";

function IndexFriendsList({friendsList, setFriendsList}) {
  const { user } = useContext(UserContext);
  // const [friendsList, setFriendsList] = useState(user?.user?.friends); 
  const [friendsListLength, setFriendsListLength] = useState(
    user?.user?.friends.length
  );
  // const [profile, setProfile] = useState({});

  useEffect(() => {
    setFriendsList(user?.user?.friends);
    setFriendsListLength(user?.user?.friends.length);
  }, [user]);

  return (
    <Paper elevation={3} sx={{ my: 2 }}>
      <Stack>
        <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="h6" component="h6">
            Friends
          </Typography>
          <Typography variant="body1" component="p">
            &nbsp;
            <i>(last online)</i>
          </Typography>
        </Stack>
        {friendsList && (
          <>
            {friendsList.map((item) => (
              <IndexFriend
                key={item._id}
                profileID={item._id}
                profilePicture={item.profilePicture}
                firstName={item.firstName}
                lastName={item.lastName}
                lastOnline={item?.lastOnline || ""}
              />
            ))}
          </>
        )}
        {friendsListLength === 0 && (
          <Typography
            variant="h6"
            component="h6"
            textAlign="center"
            sx={{ my: 2, color: "#999" }}
          >
            There are no friends to display
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

export default IndexFriendsList;
