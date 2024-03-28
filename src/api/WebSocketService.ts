import { useState, useEffect } from "react";
import { Client, IStompSocket } from "@stomp/stompjs";

const useWebSocketService = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const initializeWebSocket = async () => {
      const stomp = new Client({
        brokerURL: import.meta.env.VITE_SERVER_WS_URL,
        webSocketFactory: () =>
          new WebSocket(
            import.meta.env.VITE_SERVER_WS_URL
          ) as unknown as IStompSocket,
        debug: (msg: string) => {
          console.log(msg);
        },
      });

      setStompClient(stomp);
    };

    initializeWebSocket();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []);

  return stompClient;
};

export default useWebSocketService;
