import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Carousel } from "@giphy/react-components";

const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);

function GiphyCarousel({ submittedSearchTerm }) {
  const fetchGifs = (offset) =>
    giphyFetch.search(submittedSearchTerm, { offset, limit: 10 });
  return (
    <div style={{ marginTop: "1rem", width: "100%" }}>
      <Carousel
        fetchGifs={fetchGifs}
        gifHeight={150}
        gutter={6}
        hideAttribution
        noLink
        onGifClick={(e) => console.log(e)}
      />
    </div>
  );
}

export default GiphyCarousel;
