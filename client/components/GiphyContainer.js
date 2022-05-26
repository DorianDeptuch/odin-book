import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import GiphyCarousel from "./GiphyCarousel";
import Loader from "./Loader";

function GiphyContainer({ setSelectedGiphy, setShowGiphy }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [showCarousel, setShowCarousel] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGiphySearch = () => {
    setSubmittedSearchTerm("");
    setShowCarousel(false);

    if (searchTerm.length) {
      setLoading(true);

      setTimeout(() => {
        setSubmittedSearchTerm(searchTerm);
        setShowCarousel(true);
        setLoading(false);
      }, 100);
    }
  };

  const checkSearchLength = () => {
    if (!searchTerm.length) {
      setSubmittedSearchTerm("");
      setShowCarousel(false);
    }
  };

  useEffect(() => {
    checkSearchLength();
  }, [searchTerm]);

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" sx={{ width: "100%" }}>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          fullWidth
          placeholder="Search GIPHY..."
          variant="outlined"
          value={searchTerm}
        />
        <Button
          variant="contained"
          sx={{
            ml: 1,
            background: "linear-gradient(45deg, #9933FF, #FF6666)",
          }}
          onClick={() => handleGiphySearch()}
        >
          <SearchIcon />
        </Button>
      </Stack>
      {showCarousel && (
        <GiphyCarousel
          submittedSearchTerm={submittedSearchTerm}
          setSelectedGiphy={setSelectedGiphy}
          setShowGiphy={setShowGiphy}
        />
      )}
      {loading && <Loader />}
    </Stack>
  );
}

export default GiphyContainer;
