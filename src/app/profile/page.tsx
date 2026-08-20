'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateEmail, updatePassword } from '../auth/actions';
import { createClient } from '@/utils/supabase/client';
import { useFormStatus } from 'react-dom';
import type { User } from '@supabase/supabase-js';
import ScrollReveal from '@/components/ScrollReveal';
import { calculateOverallGrade, getLetterGrade } from '@/utils/grading';

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
            <div className="flex justify-between items-center flex-wrap gap-md" style={{ paddingBottom: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem' }}>Appearance</span>
                <span className="text-body-sm text-muted">Choose your preferred color theme</span>
              </div>
              <div className="flex gap-sm flex-wrap">
                {[
                  { name: 'dark', color: '#181818', border: '#3a3a3a' },
                  { name: 'light', color: '#fafafa', border: '#e0e0e0' },
                  { name: 'blue', color: '#0B1120', border: '#374151' },
                  { name: 'green', color: '#064E3B', border: '#059669' },
                  { name: 'purple', color: '#2E1065', border: '#5B21B6' },
                  { name: 'red', color: '#450A0A', border: '#B91C1C' },
                  { name: 'tan', color: '#FDF6E3', border: '#D3C6AA' }
                ].map((themeOption) => {
                  const currentTheme = user.user_metadata?.theme || 'dark';
                  const isActive = currentTheme === themeOption.name;
                  
                  return (
                    <button
                      key={themeOption.name}
                      onClick={async () => {
                        if (isActive) return;
                        document.documentElement.setAttribute('data-theme', themeOption.name);
                        const { updateTheme } = await import('../auth/actions');
                        await updateTheme(themeOption.name);
                        window.location.reload();
                      }}
                      title={`Switch to ${themeOption.name} theme`}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: themeOption.color,
                        border: `2px solid ${isActive ? 'var(--accent)' : themeOption.border}`,
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: isActive ? '0 0 10px var(--accent-glow)' : 'none'
                      }}
                      aria-label={`${themeOption.name} theme`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Learning Preferences */}
        <ScrollReveal delay={0.16}>
          <div className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              Learning Preferences
            </h2>
            <div className="flex justify-between items-center flex-wrap gap-md" style={{ paddingBottom: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem' }}>Focus Mode</span>
                <span className="text-body-sm text-muted">Hide navigation while scrolling through lessons</span>
              </div>
              <div className="flex gap-sm">
                <button
                  onClick={async () => {
                    const currentMode = user.user_metadata?.focus_mode ?? true;
                    const { updateFocusMode } = await import('../auth/actions');
                    await updateFocusMode(!currentMode);
                    window.location.reload();
                  }}
                  className={(user.user_metadata?.focus_mode ?? true) ? "btn-primary" : "btn-secondary"}
                  style={{ padding: '0.5rem 1.5rem' }}
                >
                  {(user.user_metadata?.focus_mode ?? true) ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Grading & Analytics */}
        <ScrollReveal delay={0.17}>
          <div className="glass-panel">
            <h2 className="text-display-sm" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
              Grading & Analytics
            </h2>
            <div className="flex flex-col gap-sm text-body-md">
              <p className="text-muted" style={{ marginBottom: '1rem' }}>
                Your overall grade is calculated using the following category weights.
              </p>
              
              <div className="flex justify-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                <span>Tests</span>
                <span style={{ fontWeight: 600 }}>50%</span>
              </div>
              <div className="flex justify-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                <span>Quizzes</span>
                <span style={{ fontWeight: 600 }}>20%</span>
              </div>
              <div className="flex justify-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                <span>Lesson Questions</span>
                <span style={{ fontWeight: 600 }}>20%</span>
              </div>
              <div className="flex justify-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                <span>Daily Questions</span>
                <span style={{ fontWeight: 600 }}>10%</span>
              </div>
              
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <p className="text-body-sm text-muted">Current Performance</p>
                <div className="flex justify-between items-center" style={{ marginTop: '0.5rem' }}>
                  <span className="text-display-md" style={{ color: 'var(--accent)' }}>N/A</span>
                  <span className="text-display-md" style={{ color: 'var(--accent)' }}>N/A</span>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <h3 className="text-body-md" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Grading Scale</h3>
                <div className="grid grid-cols-2 gap-sm text-body-sm text-muted">
                  <div>A: &ge; 92.50%</div>
                  <div>C: 72.50% - 76.49%</div>
                  <div>A-: 89.50% - 92.49%</div>
                  <div>C-: 69.50% - 72.49%</div>
                  <div>B+: 86.50% - 89.49%</div>
                  <div>D+: 66.50% - 69.49%</div>
                  <div>B: 82.50% - 86.49%</div>
                  <div>D: 59.50% - 66.49%</div>
                  <div>B-: 79.50% - 82.49%</div>
                  <div>F: &lt; 59.50%</div>
                  <div>C+: 76.50% - 79.49%</div>
                </div>
              </div>
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
