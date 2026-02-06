'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/attribution/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          website_url: websiteUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      router.push('/attribution/dashboard');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/attribution" className="inline-block">
            <h1 className="text-2xl font-bold text-zinc-900">AI Attribution</h1>
          </Link>
          <p className="text-zinc-600 mt-2">Start tracking your AI traffic in 60 seconds</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-zinc-700 mb-2">
                Website URL
              </label>
              <input
                id="website"
                name="website"
                type="url"
                autoComplete="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition"
                placeholder="https://yourwebsite.com"
              />
              <p className="mt-1 text-xs text-zinc-500">
                The website where you&apos;ll install the tracking script
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Creating account...' : 'Create free account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <div className="flex items-start gap-3 text-sm text-zinc-600">
              <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free plan includes 7-day data retention and instant citation alerts</span>
            </div>
          </div>
        </div>

        {/* Login link */}
        <p className="text-center mt-6 text-zinc-600">
          Already have an account?{' '}
          <Link href="/attribution/login" className="text-zinc-900 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
