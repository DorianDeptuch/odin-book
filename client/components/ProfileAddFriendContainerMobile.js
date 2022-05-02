import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CheckIcon from "@mui/icons-material/Check";
import GroupIcon from "@mui/icons-material/Group";
import Stack from "@mui/material/Stack";
import { ProfileContext } from "../pages/profile/[id]";
import { UserContext } from "../pages/_app";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";
import { server, client } from "../../config/config";

function ProfileAddFriendContainerMobile() {
  const currentProfile = useContext(ProfileContext);
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [disabledTrigger, setDisabledTrigger] = useState(false);

  useEffect(() => {
    const { results } = currentProfile;
    setProfile(results);

    setFriendRequestSent(
      results.friendRequests
        .map((item) => item.sender)
        .includes(user?.user?._id)
        ? true
        : false
    );
    setIsFriend(
      results.friends.map((item) => item._id).includes(user?.user?._id)
        ? true
        : false
    );
  }, [currentProfile]);

  const handleFriendRequest = (e) => {
    e.preventDefault();

    const data = {
      sender: user?.user?._id,
      recipient: profile?._id,
    };
    // console.log(data);

    fetch(`${server}/profile/${profile?._id}/friendRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setFriendRequestSent(true);
        toast.info(
          `Friend Request sent to ${profile?.firstName}`,
          toastOptions
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  const handlePokeSubmit = (e) => {
    e.preventDefault();

    const data = {
      sender: user?.user?._id,
      recipient: profile?._id,
      content: "poked you!",
    };
    // console.log(data);
    handleDisablePoke();

    fetch(`${server}/profile/${profile?._id}/poke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handleDisablePoke();
        toast.info(`You poked ${profile?.firstName}`, toastOptions);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  const handleDisablePoke = () => {
    setDisabledTrigger(true);
    let timer1 = setTimeout(() => {
      setDisabledTrigger(false);
    }, 60000);

    return () => {
      clearTimeout(timer1);
    };
  };

  return (
    <Stack sx={{ my: 1, mx: 2, display: ["block", "none"] }}>
      {isFriend ? (
        <form action="/removeFriend" method="POST">
          <Button
            variant="contained"
            color="primary"
            sx={{
              my: 1,
              mr: 1,
              height: 50,
              width: "100%",
              alignSelf: "center",
            }}
          >
            <GroupIcon sx={{ mr: 1 }} /> Friends
          </Button>
        </form>
      ) : (
        <>
          {!friendRequestSent && (
            <form
              action="/friendRequest"
              method="POST"
              onSubmit={handleFriendRequest}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  my: 1,
                  mr: 1,
                  height: 50,
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                <PersonAddIcon sx={{ mr: 1 }} /> Add Friend
              </Button>
            </form>
          )}
          {friendRequestSent && (
            <form action="/cancelFriendRequest" method="POST">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  my: 1,
                  mr: 1,
                  height: 50,
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                <CheckIcon sx={{ mr: 1 }} /> Friend Request Sent
              </Button>
            </form>
          )}
        </>
      )}
      <form action="/poke" method="POST" onSubmit={handlePokeSubmit}>
        <Button
          disabled={disabledTrigger}
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            my: 1,
            mr: 1,
            height: 50,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <TouchAppIcon sx={{ mr: 1 }} /> Poke
        </Button>
      </form>
    </Stack>
  );
}

export default ProfileAddFriendContainerMobile;
