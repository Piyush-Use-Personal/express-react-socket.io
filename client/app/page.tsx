'use client'
import useNotification from "@/hooks/useNotification";
import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function Home() {

  const { notifications, sendNotification, sendNotificationToAll } = useNotification()
  const { user: { id } } = useUser()
  const [targetUserId, setTargetUserId] = useState(0)

  const handleAllNotification = () => {
    sendNotificationToAll(id, `notification triggered from ${id}`)
  }
  const handleNotification = () => {
    sendNotification(targetUserId, `notification triggered from ${id} to ${targetUserId}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Socket io demo</h1>
      <h6>Your user id: {id}</h6>
      <div>
        {
          notifications.map(notification => {
            return <div key={notification.user}>{notification.message}</div>
          })
        }
      </div>
      <div className="flex flex-col gap-4">
        <button className="border-1 bg-white text-black px-8 py-2 rounded-sm" onClick={handleAllNotification}>Send to everyone</button>
        <div className="flex gap-x-4 ">
          <input className="text-black p-4" onChange={(e) => setTargetUserId(parseInt(e.target.value))} type="number" placeholder="Enter user id" />
          <button className="border-1 bg-white text-black px-8 py-2 rounded-sm" onClick={handleNotification}>Send to one user only</button>
        </div>
      </div>
    </main>
  );
}
