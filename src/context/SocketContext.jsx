import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('🔗 Socket connected');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('sos_alert', (data) => {
      console.log('🚨 SOS Alert received:', data);
      setNotifications(prev => [...prev, { type: 'sos', ...data, timestamp: new Date() }]);
    });

    newSocket.on('strike_update', (data) => {
      console.log('⚡ Strike Update received:', data);
      setNotifications(prev => [...prev, { type: 'strike', ...data, timestamp: new Date() }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const emit = (event, data) => {
    if (socket && isConnected) {
      socket.emit(event, data);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    socket,
    isConnected,
    notifications,
    emit,
    clearNotifications,
    // For backward compatibility
    on: (event, callback) => {
      if (socket) {
        socket.on(event, callback);
      }
    },
    off: (event) => {
      if (socket) {
        socket.off(event);
      }
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
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}