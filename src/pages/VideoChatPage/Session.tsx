import React, { useState, useEffect } from "react";
import { Publisher, Subscriber } from "openvidu-browser";
import Video from "./Video";
import ChatComponent from "./ChatComponent";

interface SessionProps {
  subscriber: Subscriber;
  publisher: Publisher;
}

function Session({ subscriber, publisher }: SessionProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (subscriber) {
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    }
  }, [subscriber]);

  const adjustGridPlacement = (subscriberCount: number) => {
    if (subscriberCount <= 1) {
      return "center";
    }
    return "normal";
  };

  const renderSubscribers = () => {
    const gridPlacement = adjustGridPlacement(subscribers.length);

    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridPlacement === "center" ? "1fr" : "1fr 1fr",
            gap: "20px",
            width: "100%", // Full width
          }}
        >
          <div>
            <Video streamManager={publisher} />
          </div>
          {subscribers.map((subscriberItem) => (
            <div key={subscriberItem.stream.streamId}>
              <Video streamManager={subscriberItem} />
            </div>
          ))}
        </div>
        <div></div>
      </>
    );
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {renderSubscribers()}
    </div>
  );
}

export default Session;
