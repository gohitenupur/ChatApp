export default function Sidebar({ users, selectedUser, setSelectedUser, search, setSearch, onlineIds }) {
  return (
    <aside className="sidebar">
      <input
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />
      <div className="user-list">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`user-row ${selectedUser?._id === user._id ? 'active' : ''}`}
          >
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
            <span className={`status ${onlineIds.includes(user._id) ? 'online' : 'offline'}`} />
          </button>
        ))}
      </div>
    </aside>
  );
}
