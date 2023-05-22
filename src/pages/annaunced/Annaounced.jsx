import {
  Autocomplete,
  Box,
  Container,
  Paper,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./Annaounced.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import errors from "../../utils/errors";
import dayjs from "dayjs";

const Annaounced = () => {
  const [isOnline, setIsOnlion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgTitle, setImgTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [DateInputEl, setDateInputEl] = useState(dayjs);
  const [timeInputEl, setTimeInputEl] = useState(dayjs());
  const [yonalishInputEl, setYonalishInputEl] = useState();
  const [ichkiYonalishIchkiInputEl, setIchkiYonalishIchkiInputEl] = useState();
  const [linkInputEl, setLinkInputEl] = useState();
  const [fullNameInputEl, setFullNameInputEl] = useState();
  const [PhoneNumInputEl, setPhoneNumInputEl] = useState(998);
  const [desInputEl, setDesInputEl] = useState();
  const themeTitleInputEl = useRef();
  const [ThemeTextInputEl, setThemeTextInputEl] = useState();
  const [imgUrl, setImgurl] = useState("");
  const [isError, setIsError] = useState(new Array(10).fill(false));

  async function fileUpload(formData) {
    setIsLoading(true);
    const img = await fetch(
      "https://api.cloudinary.com/v1_1/didddubfm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data.url;
      });
    return img;
  }

  async function submit(e) {
    let files = e.target.files;
    setImgTitle(files[0].name);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "youtube");
    const imgUrl = await fileUpload(formData);
    setIsLoading(false);
    setImgurl(imgUrl);
  }

  const submitData = () => {
    setIsSubmit(true);
    fetch("http://localhost:4000/announcement/create", {
      method: "POST",
      body: JSON.stringify({
        img_url: imgUrl,
        title: themeTitleInputEl.current.value,
        subject_text: ThemeTextInputEl,
        date: DateInputEl,
        time: timeInputEl,
        yonalish: yonalishInputEl,
        ichki_yonalish: ichkiYonalishIchkiInputEl,
        link: linkInputEl,
        fullname: fullNameInputEl,
        phone_number: PhoneNumInputEl,
        description: desInputEl,
        isOnline,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
          let arr = [];
          data.message.errors.map((e, i) => {
            arr[errors.indexOf(e.message)] = true;
          });
          setIsError(arr);
        }
        setIsSubmit(false);
      });
  };
  const dataFormat = (el) => {
    return String(el).padStart(2, 0);
  };
  return (
    <Container fixed sx={{ margin: "100px auto" }}>
      <Link to="/" className="home_page_link">
        <HomeIcon />
        Home page
      </Link>
      <Container
        maxWidth="md"
        sx={{
          mt: 3,
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "auto",
            padding: "30px",
          },
        }}
      >
        <h2 className="elon_title">E’lon berish</h2>
        <Paper>
          <p className="elon_time">Vaqt va yo’nalishni tanlang</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: "45px",
              }}
            >
              <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                <br />
                <p className="date_text">O’tkaziladigan sanani kiriting</p>
                <DatePicker
                  value={DateInputEl}
                  onChange={(e) =>
                    setDateInputEl(
                      `${dataFormat(e.$D)}-${dataFormat(e.$M)}-${e.$y}`
                    )
                  }
                  sx={{ width: "100%" }}
                  disablePast
                />
              </Box>
              <DemoContainer
                sx={{ width: { xs: "100%", sm: "50%" } }}
                components={["TimePicker"]}
              >
                <TimePicker
                  value={timeInputEl}
                  onChange={(e) =>
                    setTimeInputEl(`${dataFormat(e.$H)}:${dataFormat(e.$m)}`)
                  }
                  sx={{ width: "100%" }}
                  label="Vaqtni belgilang"
                />
              </DemoContainer>
            </Box>
          </LocalizationProvider>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: "45px",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <p className="category_select_title">Yo’nalishni belgilang</p>
              <Autocomplete
                id="multiple-limit-tags"
                defaultValue={{ title: "Web dasturlash" }}
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
                getOptionLabel={(option) => {
                  setYonalishInputEl(option.title);
                  return option.title;
                }}
                groupBy={(option) => option.isCategory}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: "100%",
                      background: "#fff",
                      borderRadius: "10px",
                    }}
                    {...params}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <p className="category_select_title">Ichki yo’nalish</p>
              <Autocomplete
                defaultValue={{ title: "Web dasturlash" }}
                onChange={(e) => setIchkiYonalishIchkiInputEl(e.target.value)}
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
                getOptionLabel={(option) => {
                  setIchkiYonalishIchkiInputEl(option.title);
                  return option.title;
                }}
                groupBy={(option) => option.isCategory}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: "100%",
                      background: "#fff",
                      borderRadius: "10px",
                    }}
                    {...params}
                  />
                )}
              />
            </Box>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: "45px",
            }}
          >
            <input
              type="checkbox"
              id="status_input"
              style={{ display: "none" }}
              onChange={(e) => setIsOnlion(e.target.checked)}
            />
            <label htmlFor="status_input" className="status">
              <Box className="online">
                {isOnline ? (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <p style={{ fontSize: "15px", color: "#fff" }}>Offline</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.364 5.636C19.1997 6.47173 19.8627 7.46389 20.315 8.55582C20.7673 9.64776 21 10.8181 21 12C21 13.1819 20.7673 14.3522 20.315 15.4442C19.8627 16.5361 19.1997 17.5283 18.364 18.364M18.364 18.364L15.535 15.535M18.364 18.364L21 21M15.536 8.464C16.0004 8.92831 16.3688 9.47956 16.6202 10.0863C16.8715 10.693 17.0009 11.3433 17.0009 12C17.0009 12.6567 16.8715 13.307 16.6202 13.9137C16.3688 14.5204 16.0004 15.0717 15.536 15.536L12.707 12.707M12.707 12.707C12.8025 12.6148 12.8787 12.5044 12.9311 12.3824C12.9835 12.2604 13.0111 12.1292 13.0122 11.9964C13.0134 11.8636 12.9881 11.7319 12.9378 11.609C12.8875 11.4861 12.8133 11.3745 12.7194 11.2806C12.6255 11.1867 12.5138 11.1125 12.3909 11.0622C12.268 11.0119 12.1363 10.9866 12.0036 10.9877C11.8708 10.9889 11.7396 11.0165 11.6176 11.0689C11.4956 11.1213 11.3852 11.1975 11.293 11.293M12.707 12.707L11.293 11.293M8.46397 15.536C7.69745 14.7715 7.20104 13.778 7.04997 12.706M5.63597 18.364C4.45018 17.1788 3.61901 15.686 3.23613 14.0538C2.85326 12.4216 2.9339 10.7148 3.46897 9.126M11.293 11.293L2.99997 3"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <p style={{ fontSize: "15px", color: "#fff" }}>Online</p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.63596 18.364C4.80022 17.5283 4.13727 16.5361 3.68497 15.4442C3.23267 14.3522 2.99988 13.1819 2.99988 12C2.99988 10.8181 3.23267 9.64775 3.68497 8.55581C4.13727 7.46387 4.80022 6.47172 5.63596 5.63599M18.364 5.63599C19.1997 6.47172 19.8626 7.46387 20.3149 8.55581C20.7672 9.64775 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5283 18.364 18.364M8.46396 15.535C7.5266 14.5973 7.00002 13.3258 7.00002 12C7.00002 10.6742 7.5266 9.40262 8.46396 8.46499M15.536 8.46499C16.4733 9.40262 16.9999 10.6742 16.9999 12C16.9999 13.3258 16.4733 14.5973 15.536 15.535M13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5195 12.8946 12.2652 13 12 13C11.7347 13 11.4804 12.8946 11.2928 12.7071C11.1053 12.5196 11 12.2652 11 12C11 11.7348 11.1053 11.4804 11.2928 11.2929C11.4804 11.1053 11.7347 11 12 11C12.2652 11 12.5195 11.1053 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </Box>
            </label>
            <Box
              sx={{
                width: {
                  height: "100%",
                  xs: "100%",
                  sm: "50%",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <TextField
                onChange={(e) => setLinkInputEl(e.target.value)}
                sx={{
                  width: "100%",
                  background: "#fff",
                  borderRadius: "10px",
                }}
                id="outlined-basic"
                label="Link kiriting"
                variant="outlined"
                error={isError[1]}
              />
            </Box>
          </Box>
        </Paper>
        <h2>Tashkilotchi</h2>
        <Paper sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: "50px",
            }}
          >
            <TextField
              onChange={(e) => setFullNameInputEl(e.target.value)}
              required
              sx={{
                width: { xs: "100%", sm: "50%" },
                background: "#fff",
                borderRadius: "10px",
              }}
              id="outlined-basic"
              label="Ismi sharifi"
              variant="outlined"
              error={isError[3]}
            />
            <TextField
              required
              sx={{
                width: { xs: "100%", sm: "50%" },
                background: "#fff",
                borderRadius: "10px",
              }}
              id="outlined-basic"
              label="Professiya"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: "45px",
            }}
          >
            <TextField
              onChange={(e) => {
                setPhoneNumInputEl(e.target.value);
              }}
              required
              type="number"
              value={PhoneNumInputEl}
              sx={{
                width: "100%",
                background: "#fff",
                borderRadius: "10px",
              }}
              id="outlined-basic"
              label="Telefon raqami"
              variant="outlined"
              error={isError[2]}
            />
            <TextField
              required
              sx={{
                width: "100%",
                background: "#fff",
                borderRadius: "10px",
              }}
              id="outlined-basic"
              label="Qo’shimcha tel raqam"
              variant="outlined"
            />
          </Box>
        </Paper>
        <Paper>
          <h2>Post</h2>
          <textarea
            ref={themeTitleInputEl}
            rows="8"
            cols="70"
            className="text_area"
            placeholder="Mavzuni sarlavhasi"
          ></textarea>
          {isError[8] && (
            <p style={{ color: "#d32f2f" }}>Birorta bir mavzu o'ylab toping</p>
          )}
          <br />
          <TextField
            onChange={(e) => setDesInputEl(e.target.value)}
            required
            sx={{
              width: "100%",
              background: "#fff",
              borderRadius: "10px",
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            error={isError[0] || isError[10]}
          />
          <Box sx={{ padding: "50px 0" }}>
            <Box
              sx={{
                display: "flex",
                gap: "50px",
                alignItems: "center",
                margin: "30px 0",
              }}
            >
              <LoadingButton
                variant="contained"
                component="label"
                loading={isLoading}
                loadingPosition="end"
                sx={{ width: "200px", height: "50px", fontSize: "14px" }}
                endIcon={<SendIcon />}
              >
                <input
                  onChange={submit}
                  type="file"
                  id="photoInput"
                  hidden
                  accept=".jpg, .jpeg, .png"
                />
                Rasm Yuklash
              </LoadingButton>
              <Box>
                {imgUrl && (
                  <Box>
                    <p>{imgTitle}</p>
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: "14px",
                        color: "rgba(0,0,0,0.4)",
                      }}
                    >
                      Rasm jo'natishga tayyor
                    </p>
                  </Box>
                )}
                {isError[9] && (
                  <p style={{ color: "#d32f2f", fontSize: "14px" }}>
                    Iltimos birorta bir rasm tanlang
                  </p>
                )}
              </Box>
            </Box>
            <p className="img_hint">
              Yuklanyotgan rasm o’lchami 1080x1080 hajmi 2 mb dan oshmasin
            </p>
          </Box>
          <h3>Mavzu matni</h3>
          <br />
          <TextareaAutosize
            onChange={(e) => {
              setThemeTextInputEl(e.target.value);
            }}
            minRows={10}
            placeholder="Mavzu matni"
            className="mavzu_input"
            style={{
              border: isError[4] ? "1px solid #d32f2f" : "1px solid black",
            }}
          />
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              width: "100%",
              margin: "30px 0",
            }}
          >
            <LoadingButton
              sx={{ width: "160px", fontSize: "15px" }}
              loading={false}
              variant="outlined"
              size="medium"
              onClick={() => (location = "/")}
            >
              Bekor qilish
            </LoadingButton>
            <LoadingButton
              onClick={submitData}
              sx={{ width: "200px", height: "50px" }}
              loading={isSubmit}
              variant="contained"
              size="medium"
            >
              E’lonni yuborish
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
};

export default Annaounced;
