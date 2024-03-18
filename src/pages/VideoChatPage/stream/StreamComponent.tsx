import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import OvVideoComponent from "./OvVideo";

import { FiMicOff } from "react-icons/fi";
import { IoVideocamOff } from "react-icons/io5";
import { BsVolumeUp } from "react-icons/bs";
import { BsVolumeOff } from "react-icons/bs";
import { FormControl } from "@mui/material";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import { MdHighlightOff } from "react-icons/md";
import { FormHelperText } from "@mui/material";

interface StreamProps {
  user: any;
  handleNickname?: (nickname: string) => void;
  streamId?: string; // streamId 속성 추가
}

interface StreamState {
  nickname: string;
  showForm: boolean;
  mutedSound: boolean;
  isFormValid: boolean;
}

export default class StreamComponent extends Component<
  StreamProps,
  StreamState
> {
  constructor(props: StreamProps) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ nickname: event.target.value });
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        if (this.props.handleNickname !== undefined) {
          this.props.handleNickname(this.state?.nickname);
        }
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className="OT_widget-container">
        <div className="pointer nickname">
          {this.state.showForm ? (
            <FormControl id="nicknameForm">
              <IconButton
                color="inherit"
                id="closeButton"
                onClick={this.toggleNicknameForm}
              >
                <MdHighlightOff />
              </IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                id="input"
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                required
              />
              {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <div onClick={this.toggleNicknameForm}>
              <span id="nickname">{this.props.user.getNickname()}</span>
              {this.props.user.isLocal() && <span id=""> (edit)</span>}
            </div>
          )}
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <IoVideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <FiMicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <BsVolumeOff color="secondary" />
                  ) : (
                    <BsVolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
