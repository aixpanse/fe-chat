import { Message, Order, UserMessage } from "./types";

const baseUrl = "http://57.128.223.2:8080";

export const verifyStoredThreadId = async (id: string) => {
  const name = `threadId-${id}`;
  const threadId = localStorage.getItem(name);
  if (!threadId) return;

  const url = `${baseUrl}/threads/${threadId}/state`;
  const options = { method: "GET" };

  const response = await fetch(url, options);
  if (response.status === 404) {
    localStorage.removeItem(name);
  }
};

export const getThreadId = async (id: string) => {
  const name = `threadId-${id}`;
  const threadId = localStorage.getItem(name);
  if (threadId) return threadId;

  const url = `${baseUrl}/threads`;
  const body = JSON.stringify({ limit: 1000 });
  const options = { method: "POST", body };

  const response = await fetch(url, options);
  const { thread_id } = await response.json();

  localStorage.setItem(name, thread_id);

  return thread_id;
};

export const getMessages = async (id: string) => {
  const threadId = await getThreadId(id);
  const url = `${baseUrl}/threads/${threadId}/state`;

  const response = await fetch(url);
  if (response.status === 404) {
    return [];
  }
  const data = await response.json();
  const messages = data?.values?.messages ?? [];

  return messages.filter(isAiOrHuman);
};

export const isAiOrHuman = (m: Message) =>
  m.content && ["ai", "human"].includes(m.type);

export const postMessage = async (message: string, id: string) => {
  const threadId = await getThreadId(id);
  const url = `${baseUrl}/threads/${threadId}/runs/stream`;
  const payload = JSON.stringify({
    stream_mode: ["messages"],
    input: { messages: [{ content: message, type: "human" }] },
    assistant_id: "simple",
  });
  const options = { method: "POST", body: payload };

  const { body } = await fetch(url, options);

  return body;
};

// function clearThread(id) {
//   const name = `threadId-${id}`;
//   localStorage.setItem(name, "");
// }

const storeSreviceUrl = "http://57.128.223.2:8000"

export async function getOrders(): Promise<Order[]> {
  const url = `${storeSreviceUrl}/orders`;
  const response = await fetch(url);
  return response.json();
}

export async function markOrdersAsRead(): Promise<Order[]> {
  const url = `${storeSreviceUrl}/orders`;
  const response = await fetch(url, { method: "PUT" });
  return response.json();
}

export async function markMessagesAsRead(): Promise<Order[]> {
  const url = `${storeSreviceUrl}/messages`;
  const response = await fetch(url, { method: "PUT" });
  return response.json();
}

// async function loadData(websiteUrl) {
//   const url = "http://127.0.0.1:8000/websites/load";
//   const payload = JSON.stringify({ url: websiteUrl });
//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");
//   const options = { method: "POST", headers, body: payload };

//   await fetch(url, options);
// }

export function playSound() {
  const url =
    "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3";
  const audio = new Audio(url);
  audio.play();
}

export async function getUserMessages(): Promise<UserMessage[]> {
  const url = `${storeSreviceUrl}/messages`;
  const response = await fetch(url);
  return response.json();
}
