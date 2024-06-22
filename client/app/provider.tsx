'use client'
import useUser from '@/hooks/useUser';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const NEXT_PUBLIC_APP_API_URL = 'http://localhost:5000'

const SocketContext = createContext<Socket<any> | null>(null);

export const useSocket = (): Socket<any> | null => {
  const socket = useContext(SocketContext);
  return socket;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket<any> | null>(null);
  const { user } = useUser()

  useEffect(() => {

    const newSocket = io(NEXT_PUBLIC_APP_API_URL, {
      query: {
        userId: user.id
      }
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
