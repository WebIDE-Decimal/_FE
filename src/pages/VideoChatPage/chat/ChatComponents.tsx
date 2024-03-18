import React, { Component, ChangeEvent, KeyboardEvent, RefObject } from "react";
import { IconButton, Fab } from "@mui/material"; // Import Fab from @mui/material
import { HiLightBulb } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import { Tooltip } from "@mui/material";
import UserModel from "../../../components/models/UserModel";

interface Message {
  connectionId: string;
  nickname: string;
  message: string;
}

interface ChatComponentProps {
  user: UserModel; // Adjust the type according to the user prop type
  chatDisplay: "light" | "dark"; // Adjust the type for chatDisplay
  messageReceived: () => void;
  close: (value: any) => void;
}

interface ChatComponentState {
  messageList: Message[];
  message: string;
}

export default class ChatComponent extends Component<
  ChatComponentProps,
  ChatComponentState
> {
  private chatScroll: RefObject<HTMLDivElement>;

  constructor(props: ChatComponentProps) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef<HTMLDivElement>();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.props.user
      ?.getStreamManager()
      ?.stream.session.on("signal:chat", (event: any) => {
        const data = JSON.parse(event.data);
        const messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            "userImg-" + (this.state.messageList.length - 1)
          ) as HTMLCanvasElement;
          const video = document.getElementById(
            "video-" + data.streamId
          ) as HTMLVideoElement;
          const avatar = userImg.getContext("2d");
          if (avatar && video) {
            avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
          }
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log(this.state.message);
    if (this.props.user && this.state.message) {
      const message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user?.getStreamManager()?.stream.streamId,
        };
        this.props.user?.getStreamManager()?.stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        if (this.chatScroll.current) {
          this.chatScroll.current.scrollTop =
            this.chatScroll.current.scrollHeight;
        }
      } catch (err) {
        console.log(err);
      }
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div id="chatToolbar">
            <span>
              {this.props.user?.getStreamManager()?.stream.session.sessionId} -
              CHAT
            </span>
            <HiLightBulb color="secondary" />
          </div>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <canvas
                  id={"userImg-" + i}
                  width="60"
                  height="60"
                  className="user-img"
                />
                <div className="msg-detail">
                  <div className="msg-info">
                    <p> {data.nickname}</p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="messageInput">
            <input
              placeholder="Send a message"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <Tooltip title="Send message">
              <Fab size="small" id="sendButton" onClick={this.sendMessage}>
                <BiSend />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
