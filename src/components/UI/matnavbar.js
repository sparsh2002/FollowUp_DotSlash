import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import {
  Link
} from "react-router-dom";

// import logo from '../../assets/images/logos/logo.png'
import firebase from "firebase";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    },
  justify: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-around",
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
      display: "flex",
      marginTop: "15px",
      textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    }
  },
  name: {
    marginLeft: "15px"
  },
  headerOptions: {
    display: "flex",
    marginLeft: "auto"
  },
  liitem:{
    marginLeft: "5px",
    marginRight: "5px",
  }
}));

const Header = props => {
  var user = firebase.auth().currentUser
  // console.log(user)
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    firebase.auth().signOut();
    window.location.reload(false)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "About Us",
      pageURL: "/aboutus"
    },
    {
      menuTitle: "Contact",
      pageURL: "/contact"
    },
    {
      menuTitle: "Profile",
      pageURL: "/userprofile"
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar className={classes.justify}>    
        <Link to="/">
          <div className={classes.title}>
                    {/* <img src={logo} alt='logo-img' style={{width:'40px' , height:'43px'}} /> */}
                    <div className={classes.name}>
                        <p >Boland</p>
                    </div>
                </div>   
          </Link>     
          {isMobile ? (
            <div>
            
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
              
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })} 
                
                <MenuItem onClick={handleLogout} >Logout</MenuItem> 
                
              </Menu>
            </div>
          ) : (
            <div className={classes.headerOptions}>
            {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Button onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </Button>
                  );
                })}
              {
                user ? <div style={{ marginLeft: '5px'}}>
                  {/* <Link to='/userprofile' style={{textDecoration:'none' , color:'black'}}>PROFILE</Link> */}
                  <Button onClick={handleLogout} variant='contained' color='primary' >Logout</Button> 
                </div>: <div>
                  <Button className={classes.liitem} variant="contained" color="primary"
                onClick={() => handleButtonClick("/login")}
              >
                Sign in
                </Button>
                <Button className={classes.liitem} variant="outlined" color="primary"
                onClick={() => handleButtonClick("/signup")}
              >
                Register
                </Button>
                  </div>
              }
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);