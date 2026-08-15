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
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', margin: '2rem' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h1 className="text-display-sm" style={{ marginBottom: '0.5rem' }}>
            Forgot Password
          </h1>
          <p className="text-body-md text-muted">Enter your email to receive a reset link.</p>
        </div>

        <form action={formAction} className="flex flex-col gap-lg">
          <div>
            <label htmlFor="email" className="input-label">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              required
              className="input-field"
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

        <div className="text-center" style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Remember it? <Link href="/login" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Log in</Link>
        </div>
      </div>
    </div>
  )
}
