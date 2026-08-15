'use client';

import { useActionState } from 'react';
import { setPasswordFromReset } from '../auth/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={pending}>
      {pending ? 'Updating...' : 'Set New Password'}
    </button>
  );
}

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(setPasswordFromReset, null);

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', margin: '2rem' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h1 className="text-display-sm" style={{ marginBottom: '0.5rem' }}>
            Set New Password
          </h1>
          <p className="text-body-md text-muted">Enter your new password below.</p>
        </div>

        <form action={formAction} className="flex flex-col gap-lg">
          <div>
            <label htmlFor="password" className="input-label">New Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              required
              minLength={6}
              className="input-field"
            />
          </div>
          
          {state?.error && (
            <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
