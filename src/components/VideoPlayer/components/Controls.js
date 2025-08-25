import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Controls.css";
import { Avatar } from "@mui/material";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { RiForward10Fill } from "react-icons/ri";
import { RiReplay10Fill } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { MdSlowMotionVideo } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: "visible",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "20px",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#242424",
    fontSize: 26,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#000",
      transform: "scale(1)",
    },
  },

  ytControlIcon: {
    color: "#242424",
    fontSize: 18,
    transform: "scale(0.9)",
    transition: "0.3s all ease",
    "&:hover": {
      color: "#",
      transform: "scale()",
    },
  },

  bottomIcons: {
    fontSize: 100,
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 80,
    color: "var(--primaryColor)",
    top: 10,
    fontSize: "25px",
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
    marginTop: "-10px",
    // color: "#fff",
    color: "#505050",
    // top: "20px",
    padding: 0,
    marginBottom: "1rem",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid #a400fb",
    backgroundColor: "#a400fb",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
    background: "#a400fb",
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Controls = forwardRef(
  (
    {
      logo,
      type,
      title,
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
      platform,
      controls
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      event.preventDefault();
      setSettings(true);
      setSetting({ speed: !setting?.speed, quality: false });

      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const [settings, setSettings] = useState(false);
    const [setting, setSetting] = useState({
      quality: false,
      speed: false,
    });

    const [widthOfscreen, setWidthOfScreen] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setWidthOfScreen(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div ref={ref} className={classes.controlsWrapper} onClick={() => { }}>
        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            style={{ padding: 0, backgroundColor: "transparent" }}
          >
            <Grid
              item
              style={{
                padding: "16px",
                // "pointer-events": "none",
                // cursor: "not-allowed",
                // background: platform !== "upload" ? "#F2ECFF" : "#191b2380",
                background: "#F2ECFF",
                // color: platform !== "upload" ? "#191b2380" : "#fff",
                color: "#191b2380",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  // color: "#fff",
                  // color: platform !== "upload" ? "#242424" : "#fff",
                  color: "#242424",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  height: widthOfscreen < 427 ? "20px" : "30px",
                  fontSize: widthOfscreen < 427 && "0.7rem",
                }}
              >
                {title !== "" && (
                  <Avatar
                    src={logo}
                    sx={{
                      height: widthOfscreen < 427 ? "20px" : "30px",
                      width: widthOfscreen < 427 ? "20px" : "30px",
                    }}
                  />
                )}
                {title}
              </Typography>

              {controls?.expand && title == "" && (
                <AiOutlineExpandAlt
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFullScreen();
                    console.log("clickeddddddd");
                  }}
                  className={classes.controlIcons}
                  style={{ fontSize: "1.8rem", cursor: "pointer" }}
                >
                  <FullScreen
                    fontSize={window.innerWidth > 760 ? "large" : "small"}
                  />
                </AiOutlineExpandAlt>
              )}
            </Grid>
            {/* <Grid item>
                            <Button
                                onClick={onBookmark}
                                variant="contained"
                                color="primary"
                                startIcon={<BookmarkIcon />}
                            >
                                Bookmark
                            </Button>
                        </Grid> */}
          </Grid>

          {controls?.backward && type == "Recorded" && widthOfscreen <= 427 && (
            <IconButton
              onClick={onRewind}
              // className={classes.controlIcons}
              aria-label="rewind"
              style={{
                position: "absolute",
                top: "40%",
                left: "25%",
                color: "white",
                fontSize: "10px",
                background: "#191B23",
              }}
            >
              <RiReplay10Fill
                fontSize={widthOfscreen > 760 ? "large" : "small"}
              />
            </IconButton>
          )}
          {controls?.play && <IconButton
            style={{
              position: "absolute",
              top: "40%",
              left: "45%",
              color: "white",
              fontSize: "10px",
              background: "#F2ECFF",
              color: "#000",
            }}
            onClick={onPlayPause}
          // className={classes.bottomIcons}
          >
            {playing ? (
              <PauseIcon
                fontSize={widthOfscreen > 760 ? "large" : "small"}
                sx={{
                  color: "white",
                  fontSize: "50px",
                }}
              />
            ) : (
              <PlayArrowIcon
                fontSize={widthOfscreen > 760 ? "large" : "small"}
                sx={{
                  color: "white",
                  fontSize: "50px",
                }}
              />
            )}
          </IconButton>}
          {controls?.forward && type == "Recorded" && widthOfscreen < 427 && (
            <IconButton
              onClick={onFastForward}
              aria-label="forward"
              style={{
                position: "absolute",
                top: "40%",
                left: "65%",
                color: "white",
                fontSize: "10px",
                background: "#191B23",
              }}
            >
              <RiForward10Fill
                fontSize={widthOfscreen > 760 ? "large" : "small"}
              />
            </IconButton>
          )}
          {/* bottom controls */}
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{
              // height: '0px',
              padding: widthOfscreen < 426 ? "0px 10px" : "0px 18px",
              // backgroundColor: platform !== "upload" ? "#F2ECFF" : "#191b2380",
              backgroundColor: "#F2ECFF",
              // color: platform !== "upload" ? "#191b2380" : "#fff",
              color: "#191b2380",
            }}
          >
            {/* <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                ValueLabelComponent={(props) => (
                  <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={type == "Live" ? 99 : played * 100}
                onChange={type == "Live" ? "" : onSeek}
                onMouseDown={type == "Live" ? "" : onSeekMouseDown}
                onChangeCommitted={type == "Live" ? "" : onSeekMouseUp}
                onDuration={onDuration}
              />
            </Grid> */}

            <Grid item>
              <Grid container className="player_bottom_controls">
                <span>
                  {/* timing text */}
                  <Button variant="text" onClick={onChangeDispayFormat}>
                    <Typography
                      variant="body1"
                      style={{
                        fontSize: widthOfscreen < 427 ? "12px" : "16px",
                      }}
                      className={classes.controlIcons}
                    >
                      {type == "Recorded"
                        ? ` ${elapsedTime} / ${totalDuration}`
                        : ` ${elapsedTime}`}
                    </Typography>
                  </Button>

                  {title !== "" && (
                    <>
                      {" "}
                      {controls?.backward && type == "Recorded" && widthOfscreen >= 427 && (
                        <IconButton
                          onClick={onRewind}
                          className={classes.controlIcons}
                          aria-label="rewind"
                        >
                          <RiReplay10Fill
                            fontSize={widthOfscreen > 760 ? "large" : "small"}
                            className={classes.controlIcons}
                          />
                        </IconButton>
                      )}
                      {controls?.play && type == "Recorded" && widthOfscreen >= 427 && (
                        <IconButton
                          onClick={onPlayPause}
                          className={classes.bottomIcons}
                        >
                          {playing ? (
                            <PauseIcon
                              fontSize={widthOfscreen > 760 ? "large" : "small"}
                              className={classes.controlIcons}
                            />
                          ) : (
                            <PlayArrowIcon
                              fontSize={widthOfscreen > 760 ? "large" : "small"}
                              className={classes.controlIcons}
                            />
                          )}
                        </IconButton>
                      )}
                      {controls?.forward && type == "Recorded" && widthOfscreen >= 427 && (
                        <IconButton
                          onClick={onFastForward}
                          className={classes.controlIcons}
                          aria-label="forward"
                        >
                          <RiForward10Fill
                            fontSize={widthOfscreen > 760 ? "large" : "small"}
                            className={classes.controlIcons}
                          />
                        </IconButton>
                      )}
                      {/* <Button variant="text" onClick={onChangeDispayFormat}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#fff",
                            marginLeft: 16,
                            fontSize: widthOfscreen < 427 && "10px",
                          }}
                        >
                          {type == "Recorded"
                            ? ` ${elapsedTime} / ${totalDuration}`
                            : ` ${elapsedTime}`}
                        </Typography>
                      </Button> */}
                      {/* // volume btn  */}
                      {controls?.volume?.volumeLogo && <IconButton
                        onClick={onMute}
                        // className={`${classes.bottomIcons} ${classes.volumeButton}`}
                        className={classes.controlIcons}
                      >
                        {muted ? (
                          <VolumeMute
                            fontSize={widthOfscreen > 760 ? "1rem" : "small"}
                            className={classes.controlIcons}
                          />
                        ) : volume > 0.5 ? (
                          <VolumeUp
                            fontSize={widthOfscreen > 760 ? "1rem" : "small"}
                            className={classes.controlIcons}
                          />
                        ) : (
                          <VolumeDown
                            fontSize={widthOfscreen > 760 ? "1rem" : "small"}
                            className={classes.controlIcons}
                          />
                        )}
                      </IconButton>}
                      {controls?.volume?.volumeProgress && <Slider
                        min={0}
                        max={100}
                        value={muted ? 0 : volume * 100}
                        onChange={onVolumeChange}
                        aria-labelledby="input-slider"
                        className={classes.volumeSlider}
                        style={{ width: widthOfscreen < 426 && 40 }}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onVolumeSeekDown}
                      />}
                    </>
                  )}
                </span>
              </Grid>
            </Grid>

            <Grid item sx={{ position: "relative" }}>
              {title == '' && controls?.volume?.volumeLogo && (
                <IconButton
                  onClick={onMute}
                  // className={`${classes.bottomIcons} ${classes.volumeButton}`}
                  className={classes.controlIcons}
                >
                  {muted ? (
                    <VolumeMute
                      fontSize={widthOfscreen > 760 ? "large" : "small"}
                    />
                  ) : volume > 0.5 ? (
                    <VolumeUp
                      fontSize={widthOfscreen > 760 ? "large" : "small"}
                    />
                  ) : (
                    <VolumeDown
                      fontSize={widthOfscreen > 760 ? "large" : "small"}
                    />
                  )}
                </IconButton>
              )}
              {title == '' && controls?.volume?.volumeProgress && <Slider
                min={0}
                max={100}
                value={muted ? 0 : volume * 100}
                onChange={onVolumeChange}
                aria-labelledby="input-slider"
                className={classes.volumeSlider}
                style={{ width: widthOfscreen < 426 && 40 }}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onVolumeSeekDown}
              />}
              {controls?.settings && (
                <IconButton
                  // onClick={() => setState({ ...state, muted: !state.muted })}

                  onClick={() => setSettings(!settings)}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {settings && type == "Recorded" && (
                    <ul className="settings_box">
                      {/* <li style={{ borderBottom: '1px solid gray' }}>Quality</li> */}
                      <li onClick={handleClick} aria-describedby={id}>
                        {" "}
                        <Typography>{playbackRate}x</Typography>
                      </li>
                    </ul>
                  )}
                  {setting?.quality && (
                    <ul className="settings_box">
                      <li style={{ borderBottom: "1px solid gray" }}>
                        Quality
                      </li>
                      <li onClick={handleClick} aria-describedby={id}>
                        {" "}
                        <Typography>{playbackRate}x</Typography>
                      </li>
                    </ul>
                  )}

                  <MdSlowMotionVideo
                    fontSize={widthOfscreen > 760 ? "large" : "small"}
                    style={{ fontSize: widthOfscreen > 760 ? "" : "1.25rem" }}
                    className={classes.controlIcons}
                  />

                  {/* <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    // vertical: "top",
                    // horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{ position: 'absolute' }}
                >
                  <Grid container direction="column-reverse">

                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <Button
                        key={rate}
                        //   onClick={() => setState({ ...state, playbackRate: rate })}
                        onClick={() => onPlaybackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={rate === playbackRate ? "secondary" : "inherit"}
                        >
                          {rate}x
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover> */}
                </IconButton>
              )}

              {setting?.speed && (
                <Grid
                  container
                  className="speed_dropdown"
                  direction="column-reverse"
                >
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button
                      key={rate}
                      onClick={(e) => {
                        e.preventDefault();
                        onPlaybackRateChange(rate);
                        setSetting({ quality: false, speed: false });
                        setSettings(true);
                      }}
                      variant="text"
                    >
                      <Typography
                        sx={{ fontSize: "13px" }}
                        color={rate === playbackRate ? "secondary" : "inherit"}
                      >
                        {rate}x
                      </Typography>
                    </Button>
                  ))}
                </Grid>
              )}
              {/* {type == "Recorded" && (
                <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography>{playbackRate}x</Typography>
                </Button>
              )} */}

              {controls?.expand && title !== "" && (
                <IconButton
                  onClick={onToggleFullScreen}
                  className={classes.controlIcons}
                >
                  <AiOutlineExpandAlt
                    fontSize={window.innerWidth > 760 ? "1.7rem" : "1.2rem"}
                  />
                </IconButton>
              )}
            </Grid>

            {controls?.progressBar && <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                ValueLabelComponent={(props) => (
                  <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={type == "Live" ? 99 : played * 100}
                onChange={type == "Live" ? "" : onSeek}
                onMouseDown={type == "Live" ? "" : onSeekMouseDown}
                onChangeCommitted={type == "Live" ? "" : onSeekMouseUp}
                onDuration={onDuration}
              />
            </Grid>}
          </Grid>
        </Grid>
      </div>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
