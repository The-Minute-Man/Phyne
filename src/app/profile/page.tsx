'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateEmail, updatePassword } from '../auth/actions';
import { createClient } from '@/utils/supabase/client';
import { useFormStatus } from 'react-dom';
import type { User } from '@supabase/supabase-js';
import ScrollReveal from '@/components/ScrollReveal';

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
  
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  if (!user) {
    return <div className="container section-padding text-muted">Loading profile...</div>;
  }

  const fullName = user.user_metadata?.full_name || 'Not provided';

  return (
    <div className="container section-padding">
      <ScrollReveal>
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="text-display-md" style={{ marginBottom: '0.5rem' }}>
            Profile Settings
          </h1>
          <p className="text-body-lg text-muted">
            Manage your account information and preferences.
          </p>
        </header>
      </ScrollReveal>

      <div className="flex flex-col gap-lg" style={{ maxWidth: '600px' }}>
        
        {/* Account Details */}
        <ScrollReveal delay={0.1}>
          <div className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              Account Details
            </h2>
            <div className="flex flex-col gap-lg">
              <div className="flex justify-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <span className="text-muted">Full Name</span>
                <span style={{ fontWeight: 500 }}>{fullName}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Theme Settings */}
        <ScrollReveal delay={0.15}>
          <div className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              Theme Settings
            </h2>
            <div className="flex justify-between items-center" style={{ paddingBottom: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem' }}>Appearance</span>
                <span className="text-body-sm text-muted">Toggle between Light and Dark mode</span>
              </div>
              <button 
                onClick={async () => {
                  const currentTheme = user.user_metadata?.theme || 'dark';
                  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                  // Optimistically set the theme attribute on the document
                  document.documentElement.setAttribute('data-theme', newTheme);
                  // Import updateTheme at the top or use a server action
                  const { updateTheme } = await import('../auth/actions');
                  await updateTheme(newTheme);
                  // Refresh to ensure server state matches
                  window.location.reload();
                }}
                className="btn-secondary"
              >
                Switch to {(user.user_metadata?.theme || 'dark') === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Change Email */}
        <ScrollReveal delay={0.2}>
          <div className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              Change Email Address
            </h2>
            <form action={emailAction} className="flex flex-col gap-md">
              <div>
                <label htmlFor="email" className="input-label">Current: {user.email}</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="New email address"
                  required
                  className="input-field"
                />
              </div>
              {emailState?.error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{emailState.error}</p>}
              {emailState?.success && <p style={{ color: '#10b981', fontSize: '0.9rem' }}>{emailState.message}</p>}
              <EmailSubmit />
            </form>
          </div>
        </ScrollReveal>

        {/* Change Password */}
        <ScrollReveal delay={0.3}>
          <div className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              Change Password
            </h2>
            <form action={passwordAction} className="flex flex-col gap-md">
              <div style={{ position: 'relative' }}>
                <input 
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="New password"
                  required
                  minLength={6}
                  className="input-field"
                  style={{ paddingRight: '2.5rem' }}
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
        </ScrollReveal>

      </div>
    </div>
  );
}
