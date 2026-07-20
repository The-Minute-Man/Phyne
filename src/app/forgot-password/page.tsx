'use client';

import { useActionState } from 'react';
import { resetPasswordForEmail } from '../auth/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={pending}>
      {pending ? 'Sending...' : 'Send Reset Link'}
    </button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(resetPasswordForEmail, null);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', margin: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' }}>
            Forgot Password
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter your email to receive a reset link.</p>
        </div>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
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
          
          {state?.error && (
            <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
              {state.error}
            </p>
          )}

          {state?.success && (
            <p style={{ color: '#10b981', fontSize: '0.9rem', textAlign: 'center' }}>
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Remember it? <Link href="/login" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Log in</Link>
        </div>
      </div>
    </div>
  )
}
