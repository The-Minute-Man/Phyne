'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateEmail, updatePassword } from '../auth/actions';
import { createClient } from '@/utils/supabase/client';
import { useFormStatus } from 'react-dom';

function EmailSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }} disabled={pending}>
      {pending ? 'Updating...' : 'Update Email'}
    </button>
  );
}

function PasswordSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }} disabled={pending}>
      {pending ? 'Updating...' : 'Update Password'}
    </button>
  );
}

export default function ProfilePage() {
  const [emailState, emailAction] = useActionState(updateEmail, null);
  const [passwordState, passwordAction] = useActionState(updatePassword, null);
  
  const [user, setUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  if (!user) {
    return <div style={{ padding: '4rem', color: 'var(--text-secondary)' }}>Loading profile...</div>;
  }

  const fullName = user.user_metadata?.full_name || 'Not provided';

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <header className="fade-in" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '0.5rem' }}>
          Profile Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Manage your account information and preferences.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
        
        {/* Account Details */}
        <div className="glass-panel fade-in delay-1" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
            Account Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
              <span style={{ fontWeight: 500 }}>{fullName}</span>
            </div>
          </div>
        </div>

        {/* Change Email */}
        <div className="glass-panel fade-in delay-2" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
            Change Email Address
          </h2>
          <form action={emailAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current: {user.email}</label>
              <input 
                id="email"
                name="email"
                type="email" 
                placeholder="New email address"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>
            {emailState?.error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{emailState.error}</p>}
            {emailState?.success && <p style={{ color: '#10b981', fontSize: '0.9rem' }}>{emailState.message}</p>}
            <EmailSubmit />
          </form>
        </div>

        {/* Change Password */}
        <div className="glass-panel fade-in delay-2" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
            Change Password
          </h2>
          <form action={passwordAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input 
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="New password"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  paddingRight: '2.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
            {passwordState?.error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{passwordState.error}</p>}
            {passwordState?.success && <p style={{ color: '#10b981', fontSize: '0.9rem' }}>{passwordState.message}</p>}
            <PasswordSubmit />
          </form>
        </div>

      </div>
    </div>
  );
}
