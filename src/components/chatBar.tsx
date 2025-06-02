import {
  getOrders,
  getUserMessages,
  markMessagesAsRead,
  markOrdersAsRead,
  playSound,
} from "@/app/utils";
import { LoginIcon } from "./loginIcon";
import { MessageIcon } from "./messageIcon";
import { OrderIcon } from "./orderIcon";
import { useEffect, useState } from "react";
import { Order, UserMessage } from "@/app/types";

export function ChatBar({
  onOrdersClick,
}: {
  onOrdersClick: (newOrders: boolean) => Promise<void>;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchOrders(isLoggedIn);
      fetchMessages(isLoggedIn);
    }, 1000);
    return () => clearInterval(timer);
  }, [isLoggedIn]);

  const fetchOrders = async (isLoggedIn: boolean) => {
    if (!isLoggedIn) return;

    try {
      const data = await getOrders();
      setOrders((prev) => {
        if (prev.length && prev.length !== data.length) playSound();
        return data;
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchMessages = async (isLoggedIn: boolean) => {
    if (!isLoggedIn) return;

    try {
      const data = await getUserMessages();
      setMessages((prev) => {
        if (prev.length && prev.length !== data.length) playSound();
        return data;
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const areOrdersRead = () => {
    return orders.every((order) => order.isRead);
  };

  const areMessagesRead = () => {
    return messages.every((message) => message.isRead);
  };

  const handleOrderIconClick = async () => {
    await onOrdersClick(!areOrdersRead());
    await markOrdersAsRead();
    await fetchOrders(isLoggedIn);
  };

  const handleMessageIconClick = async () => {
    await markMessagesAsRead();
    await fetchMessages(isLoggedIn);
  };

  return (
    <div className="flex items-center justify-start h-full">
      <LoginIcon
        isLoggedIn={isLoggedIn}
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      />
      {isLoggedIn && (
        <OrderIcon newOrder={!areOrdersRead()} onClick={handleOrderIconClick} />
      )}
      {isLoggedIn && (
        <MessageIcon
          newMessage={!areMessagesRead()}
          onClick={handleMessageIconClick}
        />
      )}
    </div>
  );
}
