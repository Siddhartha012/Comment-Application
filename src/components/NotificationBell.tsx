
'use client';

import { useEffect, useState } from 'react';

import type { Notification } from '@/types/notification';

export default function NotificationBell() {
  //const [notifications, setNotifications] = useState([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  const markAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full" />
        )}
      </button>

      <div className="absolute mt-2 right-0 bg-white border shadow p-2 w-64 z-10">
        {notifications.length === 0 && <p className="text-sm text-gray-500">No notifications</p>}
        {notifications.map((n) => (
          <div key={n.id} className={`p-2 border-b ${n.isRead ? 'text-gray-500' : 'text-black'}`}>
            <p>
              Someone replied: <strong>{n.comment.content}</strong>
            </p>
            {!n.isRead && (
              <button
                className="text-blue-500 text-xs mt-1"
                onClick={() => markAsRead(n.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
