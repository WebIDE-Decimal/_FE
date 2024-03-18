import axios from "axios";
import { OpenVidu, Publisher, Stream, Subscriber } from "openvidu-browser";
import React, { Component } from "react";
import ChatComponent from "./chat/ChatComponents";
import DialogExtensionComponent from "./dialog-extentison/DialogExtension";
import StreamComponent from "./stream/StreamComponent";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import UserModel from "../../components/models/UserModel";
import { Session } from "openvidu-browser";

const OPENVIDU_SERVER_URL = `https://groomcosmos.site/`;
const OPENVIDU_SERVER_SECRET = "MY_SECRET";
interface StreamComponentProps {
  user: UserModel;
  streamId?: string; // 추가
  handleNickname: (nickname: string) => void;
}
interface VideoRoomProps {
  sessionName?: string;
  user?: UserModel;
  token?: string;
  joinSession?: () => void;
  leaveSession?: () => void;
  error?: (error: any) => void;
}

interface VideoRoomState {
  mySessionId: string;
  myUserName: string;
  session?: Session;
  localUser?: UserModel;
  subscribers: UserModel[];
  chatDisplay: "none" | "block";
  currentVideoDevice?: MediaDeviceInfo;
  showExtensionDialog: boolean;
  messageReceived: boolean;
}

class VideoRoomComponent extends Component<VideoRoomProps, VideoRoomState> {
  private hasBeenUpdated: boolean = false;
  // private layout: OpenViduLayout = new OpenViduLayout();
  private OV: OpenVidu | null = null;
  private remotes: UserModel[] = [];

  constructor(props: VideoRoomProps) {
    super(props);
    const sessionName = this.props.sessionName
      ? this.props.sessionName
      : "SessionA";
    const userName = "OpenVidu_User" + Math.floor(Math.random() * 100);

    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
      showExtensionDialog: false,
      messageReceived: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: false,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };

    const layoutElement = document.getElementById("layout")!;
    // this.layout.initLayoutContainer(layoutElement, openViduLayoutOptions);
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event: BeforeUnloadEvent) {
    this.leaveSession();
  }

  async joinSession() {
    this.OV = new OpenVidu();

    const session = this.OV.initSession();
    this.setState({ session }, async () => {
      this.subscribeToStreamCreated();
      await this.connectToSession();
    });
  }

  async connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        const token = await this.getToken();
        console.log(token);
        this.connect(token);
      } catch (error) {
        console.error("There was an error getting the token:", error);
        if (this.props.error) {
          this.props.error({ error });
        }
        alert("There was an error getting the token:");
      }
    }
  }

  connect(token: string) {
    this.state.session
      ?.connect(token, { clientData: this.state.myUserName })
      ?.then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            message: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:" + error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    await this.OV!.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    const devices = await this.OV!.getDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    const publisher = this.OV!.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: true,
      publishVideo: true,
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session!.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state
          .session!.publish(publisher)
          .then(() => {
            this.updateSubscribers();
          })
          .catch((error) => {
            console.error("Error publishing stream:", error);
          });
      });
    }
    const localUser = new UserModel();
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session!.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser!.getStreamManager().on("streamPlaying", (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement!.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  updateSubscribers() {
    const subscribers = this.remotes;
    this.setState({ subscribers: subscribers }, () => {
      if (this.state.localUser) {
        this.sendSignalUserChanged({
          isAudioActive: this.state.localUser.isAudioActive(),
          isVideoActive: this.state.localUser.isVideoActive(),
          nickname: this.state.localUser.getNickname(),
          isScreenShareActive: this.state.localUser.isScreenShareActive(),
        });
      }
      this.updateLayout();
    });
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }

  camStatusChanged() {
    const localUser = this.state.localUser!;
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser?.getStreamManager()?.publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    const localUser = this.state.localUser!;
    localUser.setAudioActive(!localUser.isAudioActive());
    // localUser?.getStreamManager()?.publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname: string) {
    const localUser = this.state.localUser!;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser!.getNickname(),
    });
  }

  deleteSubscriber(stream: Stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user?.getStreamManager()?.stream === stream
    )[0];
    const index = remoteUsers.indexOf(userStream);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session!.on("streamCreated", (event) => {
      const subscriber = this.state.session!.subscribe(event.stream, undefined);
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement!.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.state.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    this.state.session!.on("streamDestroyed", (event) => {
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session!.on("signal:userChanged", (event) => {
      const remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from?.connectionId) {
          if (typeof event.data === "string") {
            const data = JSON.parse(event.data);

            if (data.isAudioActive !== undefined) {
              user.setAudioActive(data.isAudioActive);
            }
            if (data.isVideoActive !== undefined) {
              user.setVideoActive(data.isVideoActive);
            }
            if (data.nickname !== undefined) {
              user.setNickname(data.nickname);
            }
            if (data.isScreenShareActive !== undefined) {
              user.setScreenShareActive(data.isScreenShareActive);
            }
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      // this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data: any) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session!.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  async switchCamera() {
    try {
      const devices = await this.OV!.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice!.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = this.OV!.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: this.state.localUser!.isAudioActive(),
            publishVideo: this.state.localUser!.isVideoActive(),
            mirror: true,
          });

          await this.state.session!.unpublish(
            this.state.localUser!.getStreamManager()
          );
          await this.state.session!.publish(newPublisher);
          this.state.localUser!.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            localUser: this.state.localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV!.initPublisher(undefined, {
      videoSource: videoSource,
      publishAudio: this.state.localUser!.isAudioActive(),
      publishVideo: this.state.localUser!.isVideoActive(),
      mirror: false,
    });

    publisher.once("accessAllowed", () => {
      if (this.state.localUser!.getStreamManager() !== undefined) {
        this.state.session!.unpublish(this.state.localUser!.getStreamManager());
        this.state
          .session!.publish(this.state.localUser!.getStreamManager())
          .then(() => {
            this.state.localUser!.setScreenShareActive(true);
            this.setState({ localUser: this.state.localUser }, () => {
              this.sendSignalUserChanged({
                isScreenShareActive:
                  this.state.localUser!.isScreenShareActive(),
              });
            });
          });
      }
    });
    publisher.on("streamPlaying", () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement!.classList.remove("custom-class");
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    const isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      this.state.localUser!.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    // this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property?: string) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: "block" });
    }
    this.updateLayout();
  }

  checkNotification(event: any) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (
      document.getElementById("layout")!.offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById("layout")!.offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    const chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <ToolbarComponent
          sessionId={mySessionId}
          user={localUser}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          screenShare={this.screenShare}
          stopScreenShare={this.stopScreenShare}
          toggleFullscreen={this.toggleFullscreen}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
        />

        <DialogExtensionComponent
          showDialog={false}
          cancelClicked={this.closeDialogExtension}
        />

        <div id="layout" className="bounds flex">
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                <StreamComponent
                  user={localUser}
                  streamId={localUser.getStreamManager()?.stream.streamId} // 수정
                  handleNickname={this.nicknameChanged}
                />
              </div>
            )}
          {this.state.subscribers.map((sub, i) => (
            <div
              key={i}
              className="OT_root OT_publisher custom-class"
              id="remoteUsers"
            >
              <StreamComponent user={sub} />
            </div>
          ))}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <ChatComponent
                user={localUser}
                chatDisplay={"dark"}
                close={this.toggleChat}
                messageReceived={() => this.checkNotification}
              />
            )}
        </div>
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId: string) {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId: string) {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}
export default VideoRoomComponent;
