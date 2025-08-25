import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { RiMenu2Fill } from "react-icons/ri";

import { GoLinkExternal } from "react-icons/go";
import { GoHome } from "react-icons/go";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FeedIcon from "@mui/icons-material/Feed";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { IoHeart, IoReceiptOutline } from "react-icons/io5";
import { Divider } from "@mui/material";
import {
  MdOutlineAutoStories,
  MdOutlineErrorOutline,
  MdOutlinePayments,
  MdOutlinePhone,
  MdOutlineShoppingCartCheckout,
  MdPlayLesson,
  MdSlowMotionVideo,
} from "react-icons/md";
import { PiBookBookmark } from "react-icons/pi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function MobileSidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const upper_menus = [
    { title: "Home", nav: "/learning/home" },
    { title: "My Courses", nav: "/learning/my-courses" },

    {
      title: "Exams",
      nav: "https://exams.sdcampus.com?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
    },
    {
      title: "Test Series",
      nav: "https://blog.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
    },
    { title: "Books", nav: "https://sdpublication.com/" },
    { title: "Quick-Learning", nav: "/learning/short-learning" },
    { title: "Our Result", nav: "/learning/our-result" },
    { title: "Refer Earn", nav: "/learning/refer" },
    { title: "Wallet", nav: "/learning/wallet" },
    { title: "Feeds", nav: "/learning/feed" },
    { title: "Help & Support", nav: "/learning/contact-us" },
    { title: "About US", nav: "/learning/about-us" },
  ];

  const lower_menus = [
    "Refer Earn",
    "Wallet",
    "Feeds",
    "Contact US",
    "About US",
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const navigate = useNavigate();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {upper_menus.map((item, index) => (
          <ListItem
            key={index}
            className="mobile-sidebar-nav"
            disablePadding
            onClick={() => {
              if (
                item?.title == "Exams" ||
                item?.title == "Test Series" ||
                item?.title == "Store"
              ) {
                window.open(item?.nav);
              } else {
                navigate(item?.nav);
              }
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <GoHome />}
                {index === 1 && <MdOutlineAutoStories />}
                {index === 2 && <PendingActionsIcon />}
                {index === 3 && <PiBookBookmark />}
                {index === 4 && <MdOutlineShoppingCartCheckout />}
                {index === 5 && <MdSlowMotionVideo />}
                {index === 6 && <HiOutlineClipboardDocumentList />}
                {index === 7 && <LocalAtmIcon />}
                {index === 8 && <MdOutlinePayments />}
                {index === 9 && <IoReceiptOutline />}
                {index === 10 && <MdOutlinePhone />}
                {index === 11 && <MdOutlineErrorOutline />}
              </ListItemIcon>
              <span
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {" "}
                <ListItemText primary={item?.title} />
                <ListItemIcon>
                  {(item?.title == "Exams" ||
                    item?.title == "Test Series" ||
                    item?.title == "Books") && <GoLinkExternal />}

                  {item.title == "Quick-Learning" && (
                    <span className="new_feature"> New</span>
                  )}
                </ListItemIcon>
              </span>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className="vande">
        <h2>!! वंदे मातरम् !!</h2>
        <p>
          Made With <IoHeart style={{ color: "red" }} /> in India
        </p>
      </div>
      {/* <Divider /> */}
      {/* <List>
        {lower_menus.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <LocalAtmIcon />}
                {index === 1 && <AccountBalanceWalletIcon />}
                {index === 2 && <FeedIcon />}
                {index === 3 && <CallIcon />}
                {index === 4 && <InfoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <RiMenu2Fill className="mob-sidebar-icon" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
