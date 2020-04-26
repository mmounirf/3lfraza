import React from "react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Button, Menu, MenuItem } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StoreIcon from "@material-ui/icons/Store";
import WorkIcon from "@material-ui/icons/Work";
import CallIcon from "@material-ui/icons/Call";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/actions";

const Header = (props) => {
  const user = useSelector((state) => state.user);

  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isLoggedIn = user && user.jwt;
  const handleClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      history.push("login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    handleClose();
    history.push("/");
    dispatch(logoutAction());
  };
  const goToDashboard = () => {
    handleClose();
    history.push("dashboard");
  };
  const dispatch = useDispatch();
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

  return (
    <ElevationScroll {...props}>
      <AppBar className="main__header">
        <div className="inner">
          <span className="logo">
            <img onClick={() => history.push("/")} width="70" src={logo} alt="logo" />
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
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="contained"
              color="primary"
              disableElevation>
              <PersonIcon /> {user && user.jwt ? <span>{user.email}</span> : <span>تسجيل الدخول</span>}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={goToDashboard}>إدارة الحساب</MenuItem>
              <MenuItem onClick={logout}>تسجيل الخروج</MenuItem>
            </Menu>
            <Button href="#soon" variant="outlined" color="primary" disableElevation>
              <ShoppingBasketIcon /> <span>عربة التسوق</span>
            </Button>
          </nav>
        </div>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
