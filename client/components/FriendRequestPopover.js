import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Request from "./Request";

function FriendRequestPopover({
  idRequest,
  openRequest,
  anchorElRequest,
  handleCloseRequest,
}) {
  return (
    <Popover
      id={idRequest}
      open={openRequest}
      anchorEl={anchorElRequest}
      onClose={handleCloseRequest}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Request />
      <Request />
      <Request />
    </Popover>
  );
}

export default FriendRequestPopover;
