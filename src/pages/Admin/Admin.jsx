import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Admin.css";
import {
  Avatar,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

export default function PrimarySearchAppBar({ setIsAdmin }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [allData, setAllData] = React.useState(null);
  const [filterStatus, setFilterStatus] = React.useState("awaits");
  const [changeStatusBtn, setChangeStatusBtn] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  React.useEffect(() => {
    setChangeStatusBtn(false);
    fetch("http://localhost:4000/announcement/" + filterStatus, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChangeStatusBtn(true);
        if (data.errorName === "AuthorizationError") {
          setIsAdmin(false);
        }
        setAllData(data);
      });
  }, [filterStatus]);

  const ChangeStatusFetch = (id, isAccept) => {
    fetch("http://localhost:4000/announcement/update", {
      method: "POST",
      body: JSON.stringify({
        id,
        isAccept,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorName === "AuthorizationError") setIsAdmin(false);
        setAllData(data);
      });
  };
  const RejectBtn = ({ id }) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <LoadingButton
        loading={loading}
        variant="outlined"
        onClick={() => {
          ChangeStatusFetch(id, false);
          setLoading(true);
        }}
      >
        Bekor qilish
      </LoadingButton>
    );
  };
  const AcceptBtn = ({ id }) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={() => {
          setLoading(true);
          ChangeStatusFetch(id, true);
        }}
      >
        Tasdiqlash
      </LoadingButton>
    );
  };

  const SkeletonSchema = () => {
    return new Array(6).fill("#").map((e, i) => {
      return (
        <Box
          key={i}
          sx={{
            width: "70%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            margin: "10px",
          }}
        >
          <Box sx={{ width: "70%" }}>
            <div className="list_title">
              <Typography component="p" variant="h4">
                <Skeleton />
              </Typography>
            </div>
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span className="list_author" style={{ width: "100px" }}>
                <Typography component="p" variant="p">
                  <Skeleton />
                </Typography>
              </span>
              <span className="list_text" style={{ width: "100px" }}>
                <Typography component="p" variant="p">
                  <Skeleton />
                </Typography>
              </span>
              <span className="list_text" style={{ width: "100px" }}>
                <Typography component="p" variant="p">
                  <Skeleton />
                </Typography>
              </span>
              <span className="list_text" style={{ width: "100px" }}>
                <Typography component="p" variant="p">
                  <Skeleton />
                </Typography>
              </span>
              <span className="list_text" style={{ width: "100px" }}>
                <Typography component="p" variant="p">
                  <Skeleton />
                </Typography>
              </span>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Skeleton
              variant="rectangular"
              width="100px"
              height="35px"
            ></Skeleton>

            <Skeleton
              variant="rectangular"
              width="100px"
              height="35px"
            ></Skeleton>
          </Box>
        </Box>
      );
    });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "200px",
          minHeight: "100vh",
          background: "#016BFF",
          padding: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            textAlign: "center",
            fontFamily: "Ubuntu",
            fontSize: "33px",
            color: "#ffd",
            textDecoration: "none",
          }}
        >
          Pressa
        </Link>
        <Box
          sx={{
            display: "flex",
            padding: "50px 0",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              fontFamily: "Ubuntu",
            }}
          >
            <HomeOutlinedIcon />
            <p>Bosh sahifa</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              fontFamily: "Ubuntu",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 13V12M12 13V10M16 13V8M8 21L12 17L16 21M3 4H21M4 4H20V16C20 16.2652 19.8946 16.5196 19.7071 16.7071C19.5196 16.8946 19.2652 17 19 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16V4Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Statistika</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              fontFamily: "Ubuntu",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>O’chirilganlar</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              fontFamily: "Ubuntu",
            }}
          >
            <SettingsOutlinedIcon />
            <p>Sozlamalar</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              fontFamily: "Ubuntu",
            }}
          >
            <ArrowCircleLeftOutlinedIcon />
            <p>Chiqish</p>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <AppBar position="static">
          <Toolbar sx={{ background: "#fff" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <SearchIcon color="primary" />
              <input
                type="text"
                className="admin_search_input"
                placeholder="Izlash"
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex", gap: "20px" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="primary"
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Stack
                direction="row"
                spacing={2}
                onClick={handleProfileMenuOpen}
              >
                <Avatar {...stringAvatar("admin admin")} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#000",
                      fontFamily: "Poppins",
                    }}
                  >
                    Abbos Janizakov
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#000",
                      fontFamily: "Poppins",
                    }}
                  >
                    id:12432
                  </p>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="primary"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Box
          sx={{
            height: "80px",
            border: "1px solid #CCD7E0",
          }}
        >
          <Container
            sx={{
              margin: "0",
              display: "flex",
              alignItems: "center",
              width: "90%",
              height: "80px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                position: "relative",
              }}
            >
              <input
                name="filter"
                type="radio"
                style={{ display: "none" }}
                id="await_input"
                onChange={(e) => {
                  setFilterStatus("awaits");
                }}
              />
              <label htmlFor="await_input" className="await_label">
                Kutilmoqda
              </label>
              <input
                name="filter"
                type="radio"
                style={{ display: "none" }}
                id="accept_input"
                onChange={(e) => {
                  setFilterStatus("accept");
                }}
              />
              <label htmlFor="accept_input" className="accept_label">
                Qabul qiligan
              </label>
              <input
                name="filter"
                type="radio"
                style={{ display: "none" }}
                id="reject_input"
                onChange={(e) => {
                  setFilterStatus("reject");
                }}
              />
              <label htmlFor="reject_input" className="rejected_label">
                Rad etilgan
              </label>
              <Box className="moving_box"></Box>
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <label htmlFor="latest">Oxirgilari</label>
              <input type="radio" name="sort" id="latest" />
              <label htmlFor="new">Eng so’ngilari</label>
              <input type="radio" name="sort" id="new" />
            </Box>
          </Container>
        </Box>
        <Box sx={{ padding: "30px" }}>
          <p style={{ margin: "10px" }}>Eng so’ngi xabar nomalar</p>
          <Box className="container_wrapper">
            <Box
              sx={{
                width: "100%",
                height: "auto",
              }}
            >
              {changeStatusBtn ? (
                allData?.map((e) => {
                  return (
                    <Box
                      key={e.id}
                      sx={{
                        width: "70%",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(0,0,0,0.3)",
                        margin: "10px",
                      }}
                    >
                      <Box sx={{ width: "70%" }}>
                        <p className="list_title">{e.title}</p>
                        <br />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="list_author">{e?.fullname}</span>
                          <span className="list_text">{e.phone_number}</span>
                          <span className="list_text">{e.date}</span>
                          <span className="list_text">{e.time}</span>
                          <span className="list_text">{e.yonalish}</span>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: "20px" }}>
                        {filterStatus === "awaits" && (
                          <>
                            <RejectBtn id={e.id} />
                            <AcceptBtn id={e.id} />
                          </>
                        )}
                        {filterStatus === "accept" && <RejectBtn id={e.id} />}
                        {filterStatus === "reject" && <AcceptBtn id={e.id} />}
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <SkeletonSchema />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
