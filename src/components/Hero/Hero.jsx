import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import "./Hero.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { newItemAction } from "../../redux/reduser";

const Hero = () => {
  const dataFormat = (el) => {
    return String(el).padStart(2, 0);
  };
  const date1 = dayjs(new Date());

  const [isOnline, setIsOnline] = useState("");
  const [date, setDate] = useState(
    `${dataFormat(date1.$D)}-${dataFormat(date1.$M)}-${date1.$y}`
  );
  const [yonalish, setYonalish] = useState([]);
  const [fullname, setFullname] = useState([]);
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    dispatch(newItemAction([]));
    fetch("http://localhost:4000/announcement/accept", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        dispatch(newItemAction(data));
      });
  }, []);

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
                  onChange={(e) =>
                    setDate(`${dataFormat(e.$D)}-${dataFormat(e.$M)}-${e.$y}`)
                  }
                  disablePast
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
              options={[
                { title: "Web dasturlash", isCategory: "IT" },
                { title: "Mobile dasturlash", isCategory: "Dizayn" },
                { title: "UI/UX dizayn", isCategory: "Dizayn" },
                { title: "Grafik dizayn", isCategory: "Dizayn" },
                { title: "Menejment", isCategory: "Biznes" },
                { title: "Kredit va audit", isCategory: "Biznes" },
                { title: "Matematika", isCategory: "Ta’lim" },
                { title: "Fizika", isCategory: "Ta’lim" },
              ]}
              onChange={(event, value) => setYonalish(value)}
              isOptionEqualToValue={(option, value) => {
                option.title === value.title;
              }}
              getOptionLabel={(option) => option.title}
              groupBy={(option) => option.isCategory}
              renderInput={(params) => (
                <TextField
                  sx={{
                    width: "290px",
                    background: "#fff",
                    borderRadius: "10px",
                  }}
                  {...params}
                  placeholder="Yo'nalishi"
                />
              )}
            />
          </Box>
          <Box className="box_item">
            <FormControl>
              <Select
                sx={{ width: "290px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isOnline}
                onChange={(e) => {
                  setIsOnline(e.target.value);
                }}
              >
                <MenuItem value={"Offline"}>Offline</MenuItem>
                <MenuItem value={"Online"}>Online</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="box_item">
            <Autocomplete
              multiple
              limitTags={1}
              id="multiple-limit-tags"
              options={allData}
              getOptionLabel={(option) => option.fullname}
              onChange={(event, value) => setFullname(value)}
              renderInput={(params) => (
                <TextField {...params} placeholder="Ismlar" />
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
              onClick={() => {
                dispatch(newItemAction([]));
                fetch("http://localhost:4000/announcement/filter", {
                  method: "POST",
                  body: JSON.stringify({
                    date,
                    yonalish,
                    isOnline,
                    fullname,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    dispatch(newItemAction(data));
                  });
              }}
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

export default Hero;
