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

const styles = {
  width: avatar_SM,
  height: avatar_SM,
  border: "solid 2px #fff",
  transition: "transform 150ms",

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(currentProfile);
    const { results, posts } = currentProfile;
    setProfile(results);
    setPosts(posts);
  }, []);

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
            >
              JS
            </Avatar>
            <Stack sx={{ alignSelf: "center" }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontWeight: "bolder" }}
              >
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="h6" component="h6">
                {/* {user?.user?.friends.length} Friends */}
                323 Friends
              </Typography>
              {/* <Stack direction="row"> */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 20px)",
                }}
              >
                <Avatar sx={styles}>H</Avatar>
                <Avatar sx={styles}>E</Avatar>
                <Avatar sx={styles}>L</Avatar>
                <Avatar sx={styles}>L</Avatar>
                <Avatar sx={styles}>O</Avatar>
              </Box>
              {/* </Stack> */}
            </Stack>
            {!ownProfile && (
              <Stack sx={{ my: 5, mx: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ m: 1, height: 50, width: "100%", alignSelf: "center" }}
                >
                  <PersonAddIcon sx={{ mr: 1 }} /> Add Friend
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ m: 1, height: 50, width: "100%", alignSelf: "center" }}
                >
                  <TouchAppIcon sx={{ mr: 1 }} /> Poke
                </Button>
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
              <ProfileFriends />
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
