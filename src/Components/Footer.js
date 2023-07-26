import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom

export class Footer extends Component {
  render() {
    const { darkMode } = this.props;

    return (
      <>
        <footer
          className={` ${
            darkMode ? "text-white dark-Mode" : "text-black Light-Mode"
          }  text-center py-3`}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Flash News
                </h6>
                <p>
                  Scientists Discover New Species of Marine Life in the Deepest
                  Parts of the Ocean, Expanding Our Understanding of
                  Biodiversity and Evolutionary Adaptations.
                </p>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Products
                </h6>
                {/* Use Link components instead of <a> tags */}
                <p>
                  <Link
                    to="/"
                    className={darkMode ? "text-white" : "text-black"}
                  >
                    Textutils
                  </Link>
                </p>
                <p>
                  <Link
                    to="/"
                    className={darkMode ? "text-white" : "text-black"}
                  >
                    Product 2
                  </Link>
                </p>
                <p>
                  <Link
                    to="/"
                    className={darkMode ? "text-white" : "text-black"}
                  >
                    Product 3
                  </Link>
                </p>
              </div>
              <div className="col-md-4">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mx-2"></i> Ahmedabad, Gujarat, India
                </p>
                <p>
                  <i className="fas fa-envelope mx-2"></i>
                  mehulchapaneri8988@gmail.com
                </p>
              </div>
              <div className="col-md-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
                </h6>
                <Link to="/" className="btn btn-primary btn-floating m-1">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="btn btn-primary btn-floating m-1">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/" className="btn btn-primary btn-floating m-1">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/" className="btn btn-primary btn-floating m-1">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="/" className="btn btn-primary btn-floating m-1">
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            All rights reserved &copy; {new Date().getFullYear()} Created by{" "}
            <span
              style={{ color: "red", fontFamily: "cursive", fontWeight: "2px" }}
            >
              {" "}
              Mehul Chapaneri ❤
            </span>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
