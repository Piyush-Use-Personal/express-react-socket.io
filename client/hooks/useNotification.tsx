import { useSocket } from '@/app/provider';
import { useEffect, useState } from 'react';

interface NotificationMessage {
  message: string;
  user: string;
  isRead: boolean;
}

const useNotification = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on('notification', (message: NotificationMessage) => {
      console.log({ message })
      setNotifications((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up event listener
      socket.off('notification');
    };
  }, [socket]);

  const sendNotification = (userId: number, message: string) => {
    if (socket) {
      socket.emit('notification', { message: message, id: userId.toString() });
    }
  };

  const sendNotificationToAll = (userId: number, message: string) => {
    if (socket) {
      socket.emit('broadcast-notification', { message: message, id: userId.toString() });
    }
  };
  

  return { notifications, sendNotification, sendNotificationToAll };
};

export default useNotification;
