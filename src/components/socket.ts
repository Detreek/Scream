import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Scream {
  text: boolean;
  sender: string;
}

export function useSocket() {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<Scream>(
    "wss://echo.websocket.events",
    {
      shouldReconnect: (closeEvent) => true, // Включает авто-переподключение при обрыве сети
      reconnectAttempts: 10, // Количество попыток
      reconnectInterval: 3000, // Интервал между попытками (3 сек)
    },
  );
  const handleSend = () => {
    if (!text.trim()) return;

    // Метод строго типизирован благодаря переданному дженерику <MyMessage>
    sendJsonMessage({
      text: text,
      sender: "Electron-App",
    });
    setText("");
  };
}
