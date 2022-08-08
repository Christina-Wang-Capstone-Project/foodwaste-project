import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div className="footer-about">
          <h4>Get to Know Us</h4>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Terms</p>
          <p>Careers</p>
        </div>
        <div className="footer-account">
          <h4>Let Us Help You</h4>
          <p>Account Settings</p>
          <p>My Posts</p>
          <p>My Orders</p>
        </div>
        <div className="footer-business">
          <h4>Join the Community</h4>
          <p>Make a Post</p>
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
            src="appdownload.png"
            alt="app download icons"
          />
        </div>
      </div>
    </div>
  );
}
