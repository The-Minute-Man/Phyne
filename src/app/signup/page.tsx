'use client';

import { useActionState } from 'react';
import { signup } from '../auth/actions';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={pending}>
      {pending ? 'Creating Account...' : 'Sign Up'}
    </button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, null);

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
            Create Account
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Join Phyne and start mastering physics.</p>
        </div>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="full_name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
            <input 
              id="full_name"
              name="full_name"
              type="text" 
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
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              required
              minLength={6}
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

          {state?.message && (
            <div style={{ color: '#10b981', fontSize: '0.95rem', textAlign: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              {state.message}
            </div>
          )}

          {!state?.success && <SubmitButton />}
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Log in</Link>
        </div>
      </div>
    </div>
  )
}
