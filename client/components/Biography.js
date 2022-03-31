import React, { useContext } from "react";
import { UserContext } from "../pages/_app";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ProfileIntro from "./ProfileIntro";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProfileDetailsForm from "./ProfileDetailsForm";
import Modal from "@mui/material/Modal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`about-tabpanel-${index}`}
      aria-labelledby={`about-tab-${index}`}
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
    id: `about-tab-${index}`,
    "aria-controls": `about-tabpanel-${index}`,
  };
}

function Biography({ id }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const {user} = useContext(UserContext);
  const ownProfile = user?.user?._id === id ? true : false;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Intro" {...a11yProps(0)} />
            <Tab label="Bio" {...a11yProps(1)} />
            <Tab label="Info" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {ownProfile && (
          <Stack>
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{ mt: 2, alignSelf: "center" }}
            >
              Edit Details
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ProfileDetailsForm handleClose={handleClose} />
            </Modal>
          </Stack>
        )}
        <TabPanel value={value} index={0} className="test">
          <ProfileIntro />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileBio />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProfileInfo />
        </TabPanel>
      </Box>
    </Paper>
  );
}

export default Biography;
