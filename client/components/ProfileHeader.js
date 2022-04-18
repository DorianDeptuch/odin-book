import React, { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../pages/profile/[id]";
import { UserContext } from "../pages/_app";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import ProfileFriends from "./ProfileFriends";
import ProfilePhotos from "./ProfilePhotos";
import { bgc } from "../config/config";
import { avatar_SM, avatar_XL } from "../config/config";
// this below is for the tab component
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CheckIcon from "@mui/icons-material/Check";
import GroupIcon from "@mui/icons-material/Group";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { toastOptions } from "../config/config";
import Link from "next/link";

const styles = {
  width: avatar_SM,
  height: avatar_SM,
  border: "solid 2px #fff",
  transition: "transform 150ms",
  cursor: "pointer",

  "&:hover ~ &": {
    transform: "translateX(15px)",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//end of tab component stuff

function ProfileHeader({ id }) {
  const { user } = useContext(UserContext);
  const currentProfile = useContext(ProfileContext);
  const ownProfile = user?.user?._id === id ? true : false;
  const [profile, setProfile] = useState({});
  const [disabledTrigger, setDisabledTrigger] = useState(false);
  const router = useRouter();
  const [friendsList, setFriendsList] = useState([]);
  const [friendsListLimit5, setFriendsListLimit5] = useState([]);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const { results } = currentProfile;
    setProfile(results);
    setFriendsList(results.friends);
    setFriendsListLimit5(results.friends.slice(0, 5));
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

  useEffect(() => {
    setValue(0);
  }, [id]);

  const handleDisablePoke = () => {
    setDisabledTrigger(true);
    let timer1 = setTimeout(() => {
      setDisabledTrigger(false);
    }, 60000);

    return () => {
      clearTimeout(timer1);
    };
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
        router.push(`${client}/profile/${profile?._id}`);
        toast.info(`You poked ${profile?.firstName}`, toastOptions);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

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
        router.push(`${client}/profile/${profile?._id}`);
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

  // this is for the tab component
  const [value, setValue] = React.useState(0);
  //Also for the tab component
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Paper>
        <Stack>
          <Stack direction="row">
            <Avatar
              src={profile.profilePicture || ""}
              sx={{ height: avatar_XL, width: avatar_XL, m: 2 }}
            ></Avatar>
            <Stack sx={{ alignSelf: "center" }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontWeight: "bolder" }}
              >
                {profile.firstName} {profile.lastName}
              </Typography>
              {profile?.friends?.length === 1 && (
                <Typography variant="h6" component="h6">
                  {profile?.friends?.length} Friend
                </Typography>
              )}
              {profile?.friends?.length === 0 ||
                (profile?.friends?.length > 1 && (
                  <Typography variant="h6" component="h6">
                    {profile?.friends?.length} Friends
                  </Typography>
                ))}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 20px)",
                }}
              >
                {friendsList &&
                  friendsListLimit5.map((item) => (
                    <Link href={`${client}/profile/${item._id}`}>
                      <Avatar
                        key={item._id}
                        title={`${item.firstName} ${item.lastName}`}
                        src={item.profilePicture}
                        sx={styles}
                      ></Avatar>
                    </Link>
                  ))}
              </Box>
            </Stack>
            {!ownProfile && (
              <Stack sx={{ my: 5, mx: 2 }}>
                {isFriend ? (
                  <form action="/removeFriend" method="POST">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        m: 1,
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
                            m: 1,
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
                            m: 1,
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
                      m: 1,
                      height: 50,
                      width: "100%",
                      alignSelf: "center",
                    }}
                  >
                    <TouchAppIcon sx={{ mr: 1 }} /> Poke
                  </Button>
                </form>
              </Stack>
            )}
          </Stack>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="About" {...a11yProps(1)} />
                <Tab label="Friends" {...a11yProps(2)} />
                <Tab label="Photos" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} sx={{ backgroundColor: bgc }}>
              <ProfilePosts id={id} />
            </TabPanel>
            <TabPanel value={value} index={1} sx={{ backgroundColor: bgc }}>
              <ProfileAbout id={id} />
            </TabPanel>
            <TabPanel value={value} index={2} sx={{ backgroundColor: bgc }}>
              <ProfileFriends id={id} />
            </TabPanel>
            <TabPanel value={value} index={3} sx={{ backgroundColor: bgc }}>
              <ProfilePhotos />
            </TabPanel>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfileHeader;
