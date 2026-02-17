import { useState } from 'react';

export default function ChatWindow({ user, me, messages, onSend }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() || !user) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <section className="chat-window">
      {user ? <h3>Chat with {user.name}</h3> : <h3>Select a user to start chat</h3>}
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message._id || `${message.sender}-${message.createdAt}`}
            className={`bubble ${String(message.sender) === String(me.id) ? 'mine' : ''}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="message-form">
        <input
          placeholder="Type message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!user}
        />
        <button type="submit" disabled={!user}>
          Send
        </button>
      </form>
    </section>
  );
}
