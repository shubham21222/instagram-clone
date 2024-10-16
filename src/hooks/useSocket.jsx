import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on("connect", () => {
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [url]);

  return {
    socket: socketRef.current,
    connected,
  };
};

export default useSocket;
