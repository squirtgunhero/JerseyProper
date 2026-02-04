import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated, isAdminAuthRequired } from '@/lib/admin-auth';

export const metadata: Metadata = {
  title: 'Admin | Jersey Proper',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const isAuthenticated = await isAdminAuthenticated();
  const authRequired = isAdminAuthRequired();

  // If auth is required and user is not authenticated, redirect to login
  if (authRequired && !isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/admin" className="text-lg font-semibold text-white">
                Admin
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="/admin/signal-intelligence"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Signal Intelligence
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                ← Back to Site
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
