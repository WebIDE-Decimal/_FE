import { StreamManager } from "openvidu-browser";

class UserModel {
  connectionId: string;
  audioActive: boolean;
  videoActive: boolean;
  screenShareActive: boolean;
  nickname: string;
  streamManager: StreamManager | undefined; // StreamManager의 타입에 맞게 수정
  type: "local" | "remote";

  constructor() {
    this.connectionId = "";
    this.audioActive = true;
    this.videoActive = true;
    this.screenShareActive = false;
    this.nickname = "";
    this.streamManager = undefined; // 초기값을 undefined로 설정
    this.type = "local";
  }

  isAudioActive(): boolean {
    return this.audioActive;
  }

  isVideoActive(): boolean {
    return this.videoActive;
  }

  isScreenShareActive(): boolean {
    return this.screenShareActive;
  }

  getConnectionId(): string {
    return this.connectionId;
  }

  getNickname(): string {
    return this.nickname;
  }

  getStreamManager(): StreamManager | undefined {
    // StreamManager의 타입에 맞게 수정
    return this.streamManager;
  }

  isLocal(): boolean {
    return this.type === "local";
  }

  isRemote(): boolean {
    return !this.isLocal();
  }

  setAudioActive(isAudioActive: boolean): void {
    this.audioActive = isAudioActive;
  }

  setVideoActive(isVideoActive: boolean): void {
    this.videoActive = isVideoActive;
  }

  setScreenShareActive(isScreenShareActive: boolean): void {
    this.screenShareActive = isScreenShareActive;
  }

  setStreamManager(streamManager: StreamManager | undefined): void {
    // StreamManager의 타입에 맞게 수정
    this.streamManager = streamManager;
  }

  setConnectionId(connectionId: string): void {
    this.connectionId = connectionId;
  }

  setNickname(nickname: string): void {
    this.nickname = nickname;
  }

  setType(type: "local" | "remote"): void {
    if (type === "local" || type === "remote") {
      this.type = type;
    }
  }
}

export default UserModel;
