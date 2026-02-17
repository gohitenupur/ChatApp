import { useState } from 'react';

export default function AuthForm({ mode = 'login', onSubmit, onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        )}
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button className="text-btn" onClick={onSwitch}>
        {mode === 'login' ? 'No account? Register' : 'Already have account? Login'}
      </button>
    </div>
  );
}
