import { Box, Container, Skeleton, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import data from "../../../data.js";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Cards.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const SkeletonSchema = () => {
  return (
    <Box className="card_item">
      <Box className="card_img_wrapp">
        <Skeleton variant="rectangular" width="100%" height="100%"></Skeleton>
      </Box>
      <Box className="card_text">
        <Typography component="div" variant="h3">
          <Skeleton />
        </Typography>
        <Typography component="div" variant="p" sx={{ marginTop: "10px" }}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant="p" sx={{ marginTop: "10px" }}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant="p" sx={{ marginTop: "10px" }}>
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  );
};

const Cards = () => {
  return (
    <Container maxWidth="xl">
      <Box className="card_wrapper">
        {!data
          ? new Array(6).fill("#").map((e) => <SkeletonSchema />)
          : data.map((e) => {
              return (
                <Box key={e.id} className="card_item">
                  <Box className="card_img_wrapp">
                    <LazyLoadImage effect="blur" src={e.urls.full} />
                  </Box>
                  <Box className="card_text">
                    <h3 style={{ textTransform: "capitalize" }}>
                      {e.alt_description}
                    </h3>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <PermIdentityIcon />
                        <p>{e.user.name}</p>
                      </Box>
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <QueryStatsIcon />
                        <p>{e.user.name}</p>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <DateRangeIcon />
                        <p>{e.user.name}</p>
                      </Box>
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <AccessTimeIcon />
                        <p>{e.user.name}</p>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <OnlinePredictionIcon />
                        <p>{e.user.name}</p>
                      </Box>
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <RemoveRedEyeIcon />
                        <p>{e.user.name}</p>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
      </Box>
    </Container>
  );
};

export default Cards;
