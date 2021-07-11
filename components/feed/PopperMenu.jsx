import React, { useEffect, useState, useRef } from "react";
import {
  IconButton,
  Grow,
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  deleteText: {
    color: "red",
  },
}));

const PopperMenu = ({ deleteHandler, feedUid }) => {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const openSettingMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const closeSettingMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleUpdate = () => {
    router.push({
      pathname: "/edit",
      query: { feedUid },
    });
  };

  const handleDelete = () => {
    deleteHandler();
  };

  return (
    <>
      <IconButton
        aria-label="settings"
        aria-haspopup="true"
        onClick={openSettingMenu}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={closeSettingMenu}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleUpdate}>수정</MenuItem>
                  <MenuItem
                    className={classes.deleteText}
                    onClick={handleDelete}
                  >
                    삭제
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default PopperMenu;
