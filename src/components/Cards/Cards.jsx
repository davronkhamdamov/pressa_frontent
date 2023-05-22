import { Box, Container, Skeleton, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Cards.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";

const SkeletonSchema = () => {
  return new Array(6).fill("#").map((e, i) => {
    return (
      <Box key={i} className="card_item">
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
  });
};

const Cards = () => {
  const getData = useSelector(({ dataReduser }) => dataReduser);
  return (
    <Container maxWidth="xl">
      <Box className="card_wrapper">
        {!getData.data[0] ? (
          <SkeletonSchema />
        ) : (
          getData?.data.map((e) => {
            return (
              <Box key={e.id} className="card_item">
                <Box className="card_img_wrapp">
                  <LazyLoadImage effect="blur" src={e.img_url} />
                </Box>
                <Box className="card_text">
                  <h3 style={{ textTransform: "capitalize" }}>{e.title}</h3>
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
                      <p>{e.fullname}</p>
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
                      <p>{e.yonalish}</p>
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
                      <p>{e.date}</p>
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
                      <p>{e.time}</p>
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
                      <p>{e.isOnline ? "Online" : "Offline"}</p>
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
                      <p>10k</p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Container>
  );
};

export default Cards;
