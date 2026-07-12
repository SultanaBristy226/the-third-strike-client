import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Mock socket connection
    setIsConnected(true);
    
    return () => {
      setIsConnected(false);
    };
  }, []);

  const value = {
    socket,
    isConnected,
    emit: (event, data) => {
      console.log(`Emitting ${event}:`, data);
    },
    on: (event, callback) => {
      console.log(`Listening to ${event}`);
    },
    off: (event) => {
      console.log(`Unsubscribed from ${event}`);
    },
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}