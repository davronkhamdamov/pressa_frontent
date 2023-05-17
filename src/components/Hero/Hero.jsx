import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import "./Hero.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const Hero = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="hero">
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontSize: { sm: "6vw", xs: "8vw", md: "60px" },
            lineHeight: { sm: "79px", xs: "50px" },
          }}
          className="title"
          variant="h2"
          component="h3"
        >
          Eng so’ngi master klasslar va tadbirlar bizning saytda
        </Typography>
        <Box
          className="box"
          sx={{
            height: { xl: "90px", xs: "400px", md: "400px" },
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xl: "row", md: "column", xs: "column" },
          }}
        >
          <Box className="box_item">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  format="DD - MM - YYYY"
                  defaultValue={dayjs(new Date())}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box className="box_item">
            <Autocomplete
              multiple
              limitTags={1}
              id="multiple-limit-tags"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  sx={{
                    width: "290px",
                    background: "#fff",
                    borderRadius: "10px",
                  }}
                  {...params}
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
          <Box className="box_item">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                sx={{ width: "290px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"offline"}>Offline</MenuItem>
                <MenuItem value={"online"}>Online</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="box_item">
            <Autocomplete
              multiple
              limitTags={1}
              id="multiple-limit-tags"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} placeholder="Favorites" />
              )}
              sx={{
                width: "290px",
                background: "#fff",
                borderRadius: "10px",
              }}
            />
          </Box>
          <Box className="box_item">
            <LoadingButton
              loading
              loadingIndicator="Izlamoqda..."
              variant="contained"
              sx={{
                width: "180px",
                height: "55px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Izlash
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
export default Hero;
