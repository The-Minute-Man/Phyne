import { login } from '../auth/actions'
import Link from 'next/link'

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
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
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Log in to access your modules.</p>
        </div>

        <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
          
          {searchParams?.message && (
            <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
              {searchParams.message}
            </p>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Log In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}
