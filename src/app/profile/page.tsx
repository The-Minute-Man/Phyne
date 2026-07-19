import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
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

      <div className="glass-panel fade-in delay-1" style={{ maxWidth: '600px', padding: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
          Account Details
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
            <span style={{ fontWeight: 500 }}>{fullName}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Email Address</span>
            <span style={{ fontWeight: 500 }}>{user.email}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Account ID</span>
            <span style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--muted)' }}>{user.id}</span>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <button className="btn-secondary" style={{ width: '100%' }}>Update Profile (Coming Soon)</button>
        </div>
      </div>
    </div>
  );
}
