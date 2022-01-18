import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import ProfileFriends from "./ProfileFriends";
import { bgc } from "../config/config";
// this below is for the tab component
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

function ProfileHeader() {
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
            <Avatar sx={{ height: 150, width: 150, m: 2 }}>JS</Avatar>
            <Stack sx={{ alignSelf: "center" }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontWeight: "bolder" }}
              >
                John Smith
              </Typography>
              <Typography variant="h6" component="h6">
                323 Friends
              </Typography>
              <Stack direction="row">
                <Avatar>H</Avatar>
                <Avatar>E</Avatar>
                <Avatar>L</Avatar>
                <Avatar>L</Avatar>
                <Avatar>O</Avatar>
              </Stack>
            </Stack>
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
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} sx={{ backgroundColor: bgc }}>
              <ProfilePosts />
            </TabPanel>
            <TabPanel value={value} index={1} sx={{ backgroundColor: bgc }}>
              <ProfileAbout />
            </TabPanel>
            <TabPanel value={value} index={2} sx={{ backgroundColor: bgc }}>
              <ProfileFriends />
            </TabPanel>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfileHeader;
