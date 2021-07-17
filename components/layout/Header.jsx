import React, { useState, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NotificationBar from "./NotificationBar";

const useStyles = makeStyles(() => ({
  fix: {
    position: "fixed",
    top: 0,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.fix}>
        <Toolbar>
          <Typography
            className={classes.title}
            onClick={() => {
              window.location.href = "/";
            }}
            variant="h6"
            noWrap
          >
            Sullivan-SNS
          </Typography>

          <div className={classes.grow} />
          <div>
            <IconButton
              aria-label="add feed"
              color="inherit"
              onClick={() => {
                window.location.href = "/edit";
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of user"
              color="inherit"
              onClick={() => {
                window.location.href = "/myfeed";
              }}
            >
              <AccountCircle />
              {user != null && (
                <Typography variant="h6" noWrap>
                  {user.displayName} 님 반갑습니다
                </Typography>
              )}
            </IconButton>
            <NotificationBar />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
