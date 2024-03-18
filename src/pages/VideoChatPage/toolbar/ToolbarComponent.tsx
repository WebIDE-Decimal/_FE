import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import {
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdFullscreen,
  MdFullscreenExit,
  MdSwitchVideo,
  MdPictureInPicture,
  MdScreenShare,
  MdStopScreenShare,
  MdPowerSettingsNew,
  MdQuestionAnswer,
} from "react-icons/md";
import { Tooltip } from "@mui/material";

interface ToolbarProps {
  sessionId: string;
  user: any;
  micStatusChanged: () => void;
  camStatusChanged: () => void;
  screenShare: () => void;
  stopScreenShare: () => void;
  toggleFullscreen: () => void;
  switchCamera: () => void;
  leaveSession: () => void;
  toggleChat: () => void;
  showNotification: boolean;
}

interface ToolbarState {
  fullscreen: boolean;
}

export default class ToolbarComponent extends Component<
  ToolbarProps,
  ToolbarState
> {
  constructor(props: ToolbarProps) {
    super(props);
    this.state = { fullscreen: false };
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const { sessionId, user, showNotification } = this.props;
    const { fullscreen } = this.state;

    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div id="navSessionInfo">
            {sessionId && (
              <div id="titleContent">
                <span id="session-title">{sessionId}</span>
              </div>
            )}
          </div>

          <div className="buttonsContent">
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {user !== undefined && user.isAudioActive() ? (
                <MdMic />
              ) : (
                <MdMicOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {user !== undefined && user.isVideoActive() ? (
                <MdVideocam />
              ) : (
                <MdVideocamOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.screenShare}
            >
              {user !== undefined && user.isScreenShareActive() ? (
                <MdPictureInPicture />
              ) : (
                <MdScreenShare />
              )}
            </IconButton>

            {user !== undefined && user.isScreenShareActive() && (
              <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                <MdStopScreenShare color="secondary" />
              </IconButton>
            )}

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.switchCamera}
            >
              <MdSwitchVideo />
            </IconButton>
            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {user !== undefined && fullscreen ? (
                <MdFullscreenExit />
              ) : (
                <MdFullscreen />
              )}
            </IconButton>
            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <MdPowerSettingsNew />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {showNotification && <div id="point" className="" />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
