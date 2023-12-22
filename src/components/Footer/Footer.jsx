import React from "react";
import "../Footer/Footer.css";
import { AiOutlinePhone, AiOutlineInstagram } from "react-icons/ai";
import { TiLocation } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
          <AiOutlinePhone className="icons" />
          <p>+961 79/131 265 </p>
        </div>
        <div className="footer-social">
          <a
            href="https://www.instagram.com/961_resto_cafe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram className="icons" />
            <br />
            3AL_7ATAB
          </a>
        </div>
        <div className="footer-location">
          <a
            href="https://www.google.com/maps/place/Saidat+El+Intikal+Church/@34.313019,35.9027367,16z/data=!4m15!1m8!3m7!1s0x1521f87103345e31:0x70c4e19ad3030702!2sSebaal!3b1!8m2!3d34.3124014!4d35.9077049!16s%2Fm%2F02pqc1l!3m5!1s0x1521f873d73b6087:0x411db08b8b1eb0e7!8m2!3d34.3148918!4d35.9075942!16s%2Fg%2F11c20bqm1d?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiLocation className="icons" />
            <br />
            sebhel north lebanon
            <br /> near to the church
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
