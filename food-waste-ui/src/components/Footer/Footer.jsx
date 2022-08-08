import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div className="footer-about">
          <h4>Get to Know Us</h4>
          <Link to="/home/aboutus">
            <p>About Us</p>
          </Link>
          <Link to="/home/contactus">
            <p>Contact Us</p>
          </Link>
          <p>Terms</p>
          <p>Careers</p>
        </div>
        <div className="footer-account">
          <h4>Let Us Help You</h4>
          <p>Account Settings</p>
          <Link to="/home/myposts">
            <p>My Posts</p>
          </Link>
          <Link to="/home/onhold">
            <p>My Orders</p>
          </Link>
        </div>
        <div className="footer-business">
          <h4>Join the Community</h4>
          <Link to="/home/makeapost">
            <p>Make a Post</p>
          </Link>
          <p>Be a Partner Restaurant</p>
          <p>Sponsor Us</p>
        </div>
        <div className="footer-socials">
          <h4>Socials</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="footer-app">
          <img
            className="footer-img"
            src="/appdownload.png"
            alt="app download icons"
          />
        </div>
      </div>
    </div>
  );
}
