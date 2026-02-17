import { useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { api } from './api/client';
import { AuthContext } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function useSocket(token) {
  return useMemo(() => {
    if (!token) return null;
    return io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
    });
  }, [token]);
}

export default function App() {
  const { auth, login, register, logout } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState('login');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineIds, setOnlineIds] = useState([]);
  const socket = useSocket(auth.token);

  useEffect(() => {
    if (!auth.token) return;
    api.get(`/users?search=${encodeURIComponent(search)}`).then((res) => setUsers(res.data));
  }, [auth.token, search]);

  useEffect(() => {
    if (!auth.token || !selectedUser) return;
    api.get(`/messages/${selectedUser._id}`).then((res) => setMessages(res.data));
  }, [auth.token, selectedUser]);

  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', (message) => {
      const isCurrentChat =
        selectedUser &&
        [String(message.sender), String(message.receiver)].includes(String(selectedUser._id));
      if (isCurrentChat) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on('online-users', (ids) => setOnlineIds(ids));

    return () => {
      socket.disconnect();
    };
  }, [socket, selectedUser]);

  const sendMessage = (text) => {
    socket?.emit('send-message', { receiverId: selectedUser._id, text });
  };

  if (!auth.user) {
    return (
      <main className="auth-wrap">
        <AuthForm
          mode={authMode}
          onSubmit={authMode === 'login' ? login : register}
          onSwitch={() => setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'))}
        />
      </main>
    );
  }

  return (
    <main className="layout">
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        search={search}
        setSearch={setSearch}
        onlineIds={onlineIds}
      />
      <ChatWindow user={selectedUser} me={auth.user} messages={messages} onSend={sendMessage} />
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </main>
  );
}
