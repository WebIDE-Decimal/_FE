import React, { Component, RefObject } from "react";

interface OvVideoProps {
  user: any;
  mutedSound: boolean;
}

export default class OvVideoComponent extends Component<OvVideoProps> {
  private videoRef: RefObject<HTMLVideoElement>;

  constructor(props: OvVideoProps) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.addVideoElement();
    this.subscribeToUserChangedSignal();
  }

  componentDidUpdate() {
    this.addVideoElement();
  }

  addVideoElement() {
    const { user } = this.props;
    if (user.streamManager && this.videoRef.current) {
      user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  subscribeToUserChangedSignal() {
    const { user } = this.props;
    if (user.streamManager.session && this.videoRef.current) {
      user.streamManager.session.on("signal:userChanged", (event: any) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          user.getStreamManager().addVideoElement(this.videoRef.current);
        }
      });
    }
  }

  render() {
    const { user, mutedSound } = this.props;
    return (
      <video
        autoPlay={true}
        id={"video-" + user.getStreamManager().stream.streamId}
        ref={this.videoRef}
        muted={mutedSound}
      />
    );
  }
}
