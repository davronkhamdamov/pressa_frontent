import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
const Footer = () => {
  if (location.pathname === "/login") return;
  return (
    <div className="footer">
      <h4>Pressa</h4>
      <div className="wrapper">
        <div className="wrap">
          <Link to="about">Biz haqimizda</Link>
          <Link to="support">Savol va Javoblar</Link>
        </div>
        <div className="contact">
          <a className="phone_number" href="tel:998944713563">
            <CallOutlinedIcon />
            <p>+71 200-11-02</p>
          </a>
          <div className="social_media">
            <a href="#">
              <FacebookOutlinedIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <TelegramIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
