import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

import AppNav from '../helper/AppNav';
import { TOKEN_KEY } from '../../api/client';

import { ChatRoomStyle } from './ChatRoomStyle';

interface Message {
  userId: number;
  message: string;
  receiverUserId: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const ChatRoom: React.FC = () => {
  const { userId: receiverUserId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`);
        setCurrentUserId(response.data.data.id);
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    };
    getCurrentUser();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/dm/${receiverUserId}`);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !receiverUserId) return;

    try {
      await axios.post(`${API_URL}/dm/${receiverUserId}`, {
        message: newMessage.trim(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!receiverUserId || !currentUserId) return;

    loadMessages();

    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    });
    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.close();
    };
  }, [receiverUserId, currentUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!receiverUserId) {
    return (
      <div className={ChatRoomStyle.stateScreen}>
        <p className={ChatRoomStyle.stateText}>Invalid chat room</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={ChatRoomStyle.stateScreen}>
        <p className={ChatRoomStyle.stateText}>Loading messages...</p>
      </div>
    );
  }

  return (
    <AppNav title="Feel free to vibe">
      <div className={ChatRoomStyle.shell}>
        <div className={ChatRoomStyle.headerBar}>
          <h1 className={ChatRoomStyle.headerTitle}>Feel free to vibe</h1>
        </div>

        <div className={ChatRoomStyle.messagesArea}>
          {messages.length === 0 ? (
            <div className={ChatRoomStyle.emptyWrap}>
              <p className={ChatRoomStyle.emptyText}>Break the ice.</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isMe = message.userId === currentUserId;
              return (
                <div
                  key={index}
                  className={`${ChatRoomStyle.bubbleRow} ${isMe ? ChatRoomStyle.bubbleRowMe : ChatRoomStyle.bubbleRowThem}`}
                >
                  <div
                    className={`${ChatRoomStyle.bubbleBase} ${isMe ? ChatRoomStyle.bubbleMe : ChatRoomStyle.bubbleThem}`}
                  >
                    <p className={ChatRoomStyle.messageText}>
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={ChatRoomStyle.composerWrap}>
          <form onSubmit={sendMessage} className={ChatRoomStyle.form}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
              className={ChatRoomStyle.input}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={ChatRoomStyle.sendButton}
            >
              Send
            </button>
          </form>
          <div className={ChatRoomStyle.formSpacer} />
        </div>
      </div>
    </AppNav>
  );
};

export default ChatRoom;
