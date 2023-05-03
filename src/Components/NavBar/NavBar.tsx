import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  window.onload = function () {
    const menu_btn = document.querySelector(".hamburger")!;
    const mobile_menu = document.querySelector('.mobile-nav')!
    menu_btn.addEventListener("click", function () {
      menu_btn.classList.toggle("is-active");
      mobile_menu.classList.toggle("is-active")
    });
  }
  return (
    <>
      <div className="header-container">
        <div className="header-items">
          <div className="header-image-container">
            <h2><Link to  = "/">GERICHT</Link></h2>
          </div>
          <nav className="center-pieces">
            <a href="#"> Home</a>
            <a href="#"> Pages</a>
            <a href="#"> Contact us</a>
            <a href="#">Landing</a>
            
          </nav>

          <nav>
            
            <a href="#" className="a-login">
              Login / Registration
            </a>
            <div className="vertical-line"></div>
            <a>Book Table</a>
          </nav>

          <button className="hamburger">
            <div className="bar"></div>
          </button>

        </div>

        <nav className="mobile-nav">
          <a href="#"> Home</a>
          <a href="#"> Pages</a>
          <a href="#"> Contact Us</a>
          <a href="#">Landing</a>
          <div className="mobile-nav-bottom">
            <a href="#" className="a-login">
              Login / Registration
            </a>
            <div className="vertical-line"></div>
            <a>Book Table</a>
          </div>
        </nav>

      </div>
    </>
  );
};
export default NavBar
