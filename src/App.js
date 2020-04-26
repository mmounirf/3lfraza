import React from "react";
import "./App.scss";
import logo from "./assets/logo.png";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import hero from "./assets/hero_bg.png";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StoreIcon from "@material-ui/icons/Store";
import WorkIcon from "@material-ui/icons/Work";
import CallIcon from "@material-ui/icons/Call";
import Typical from "react-typical";


const ElevationScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const App = (props) => {
  return (
    <div className="main">
      <ElevationScroll {...props}>
        <AppBar className="main__header">
          <div className="inner">
            <span className="logo">
              <img width="70" src={logo} alt="logo" />
            </span>
            <nav className="navigation">
              <Button href="#soon" color="secondary">
                <HomeIcon /> <span>الرئيسية</span>
              </Button>
              <Button href="#soon" color="secondary">
                <ShoppingBasketIcon /> <span>المنتجات</span>
              </Button>
              <Button href="#soon" color="secondary">
                <StoreIcon /> <span>المتاجر</span>
              </Button>
              <Button href="#soon" color="secondary">
                <CallIcon /> <span>تواصل معتا</span>
              </Button>
              <Button href="#soon" color="secondary">
                <WorkIcon /> <span>انضم إلينا</span>
              </Button>
            </nav>

            <nav className="navigation__secondary">
              <Button href="#soon" variant="contained" color="primary" disableElevation>
                <PersonIcon /> <span>تسجيل الدخول</span>
              </Button>
              <Button href="#soon" variant="outlined" color="primary" disableElevation>
                <ShoppingBasketIcon /> <span>عربة التسوق</span>
              </Button>
            </nav>
          </div>
        </AppBar>
      </ElevationScroll>
      <div className="main__container" style={{ backgroundImage: `url(${hero})` }}>
        <div className="animated">
          <Typical
            steps={["اعملها...", 3000, "اشتريها...", 3000, "حضرها...", 3000, "وصلها...", 3000]}
            loop={Infinity}
            wrapper="h2"
          />
          <h1> عالفرّازة</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
