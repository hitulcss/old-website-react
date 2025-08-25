import React, { useContext, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import "./Drawer.css";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../../assets/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import DropdownOption from "../Dropdown_option/DropdownOption";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { MdOutlineAutoStories } from "react-icons/md";
import { PiBookBookmark } from "react-icons/pi";
import { MdRule } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { RiFileUserLine } from "react-icons/ri";
import { MdOutlineVilla } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import MyCourses from "../../pages/after_login/my_courses/MyCourses";
import ReferEarn from "../../pages/after_login/Refer_Earn/ReferEarn";
import Wallet from "../../pages/after_login/Wallet/Wallet";
import Feeds from "../../pages/after_login/feed/Feeds";
import FeedDetails from "../../pages/after_login/feed/feed_details/FeedDetails";
import sideMenuList from "./sidebarMenus.json";
import Shishak from "../../pages/after_login/shishak/Shishak";
import AboutUs from "../../pages/after_login/aboutUs/AboutUs";
import Contact from "../../pages/after_login/contact_us/Contact";
import toast, { Toaster } from "react-hot-toast";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MyDrawer = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [menuOpen, setOpenMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [menuData, setMenuData] = useState("Adhayayan");

  const token = localStorage.getItem("token");
  const details = JSON.parse(localStorage.getItem("details"));
  const name = details?.name;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSearchClick = () => {
    if (searchText == "") {
      setIsExpanded(!isExpanded);
    } else {
      getSearch(searchText);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (searchResult !== "") {
      getSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchResult == "") {
        toast.dismiss();
        toast("Enter Something");
      } else {
        navigate(`/search/${searchText}`);

        getSearch(searchText);
      }
    }
  };

  const {
    getAllCategory,
    category,
    selectedCategory,
    setSelectedCategory,
    getSearch,
    searchResult,
  } = useContext(CoursesData);

  useEffect(() => {
    getAllCategory();
    // getBlogs();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/learning/my-profile")}>
        My Profile
      </MenuItem>
      {/* <MenuItem onClick={() => navigate("/my-profile")}>My Profile</MenuItem> */}
      <MenuItem
        onClick={() => {
          localStorage.setItem("index", 1);
          navigate("/learning/my-courses");
        }}
      >
        My Courses
      </MenuItem>
      {/* <MenuItem onClick={() => navigate("/my-courses")}>My Courses</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [send, setSend] = React.useState(false);

  return (
    <>
      <Toaster />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <div className="logo">
              <NavLink className="title" to="/">
                <img
                  src={logo}
                  alt="logo"
                  style={{ marginRight: "1rem", marginLeft: "1rem" }}
                  loading="lazy"
                ></img>
              </NavLink>
            </div>

            <div style={{ marginRight: "1rem" }}>
              {" "}
              <DropdownOption
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                category={category}
              />
            </div>

            <div
              className="search_container afterlogin_search"
              style={{ width: "230px" }}
            >
              <div className="search-box" style={{ width: "300px" }}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                  onClick={() => setIsOpen(!isOpen)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }} className="afterlogin_rightside">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge color="error">
                  <NotificationsIcon color="secondary" />
                </Badge>
              </IconButton>
              <IconButton
                color="secondary"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle
                  color="secondary"
                  style={{ marginRight: "5px" }}
                />
                <p
                  style={{ fontWeight: "500", fontSize: "15px", color: "#000" }}
                >
                  {" "}
                  {name ? name?.split(" ")[0] : "Me"}
                </p>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader></DrawerHeader>
          <Divider />
          <List>
            {sideMenuList.map((text, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "block",
                  color: isClicked == index ? "var(--primaryColor)" : "",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setMenuData(text.title);
                  setIsClicked(index);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: isClicked == index ? "var(--primaryColor)" : "",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isClicked == index ? "var(--primaryColor)" : "",
                    }}
                  >
                    {index === 0 ? <GoHome className="drawer_icon" /> : ""}
                    {index === 1 ? (
                      <MdOutlineAutoStories className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 2 ? (
                      <PiBookBookmark className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 3 ? <MdRule className="drawer_icon" /> : ""}
                    {index === 4 ? (
                      <MdOutlineShoppingCartCheckout className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 5 ? <GiBookshelf className="drawer_icon" /> : ""}
                    {index === 6 ? (
                      <RiFileUserLine className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 7 ? (
                      <Tooltip title="Home" placement="right">
                        <MdOutlineVilla className="drawer_icon" />
                      </Tooltip>
                    ) : (
                      ""
                    )}
                    {index === 8 ? (
                      <MdOutlinePayments className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 9 ? (
                      <MdOutlineAccountBalanceWallet className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 10 ? (
                      <IoReceiptOutline className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 11 ? (
                      <MdOutlinePhone className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 12 ? (
                      <MdOutlineErrorOutline className="drawer_icon" />
                    ) : (
                      ""
                    )}
                    {index === 13 ? (
                      <MdOutlinePolicy className="drawer_icon" />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.title}
                    sx={{ opacity: open ? 1 : 0, fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
          <DrawerHeader />

          <div style={{ marginTop: "-1rem" }}>
            {menuData === "Adhayayan" && <FeedDetails />}
            {menuData === "My Courses" && <MyCourses />}
            {menuData === "Refer Earn" && <ReferEarn />}
            {menuData === "Wallet" && <Wallet />}
            {menuData === "Feeds" && <Feeds />}
            {menuData === "Shishak" && <Shishak />}
            {menuData === "Contact US" && <Contact />}
            {menuData === "About US" && <AboutUs />}
          </div>

          {/* <div>
            {" "}
            <Course_Details />
          </div> */}

          {/* <div style={{ marginTop: "-1rem" }}>
            <FeedDetails />
          </div> */}
        </Box>

        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
};

export default MyDrawer;
