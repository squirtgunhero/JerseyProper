'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  website_url: string;
  api_key: string;
  plan: string;
  alerts_enabled: boolean;
  daily_summary_enabled: boolean;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    alerts_enabled: true,
    daily_summary_enabled: true,
    website_url: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/attribution/me');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData({
            alerts_enabled: data.user.alerts_enabled,
            daily_summary_enabled: data.user.daily_summary_enabled,
            website_url: data.user.website_url,
          });
        }
      } catch {
        console.error('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/auth/attribution/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
        return;
      }

      setUser(data.user);
      setMessage({ type: 'success', text: 'Settings saved successfully' });
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="text-zinc-600">Manage your account and notification preferences</p>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Account Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <div className="text-zinc-900">{user.email}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Plan</label>
            <div className="flex items-center gap-2">
              <span className="capitalize text-zinc-900">{user.plan}</span>
              {user.plan === 'free' && (
                <span className="text-xs text-zinc-500">(7-day data retention)</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Website URL</label>
            <input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Notifications</h2>
        
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.alerts_enabled}
              onChange={(e) => setFormData({ ...formData, alerts_enabled: e.target.checked })}
              className="mt-1 w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900"
            />
            <div>
              <div className="font-medium text-zinc-900">Citation Alerts</div>
              <div className="text-sm text-zinc-500">
                Get instant email alerts when AI systems cite your pages (at 5, 10, 25, 50, 100 citations per hour)
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.daily_summary_enabled}
              onChange={(e) => setFormData({ ...formData, daily_summary_enabled: e.target.checked })}
              className="mt-1 w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900"
            />
            <div>
              <div className="font-medium text-zinc-900">Daily Summary</div>
              <div className="text-sm text-zinc-500">
                Receive a daily email summary of your AI traffic and top cited pages
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">API Key</h2>
        
        <div className="bg-zinc-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-zinc-700 break-all">{user.api_key}</code>
            <button
              onClick={() => navigator.clipboard.writeText(user.api_key)}
              className="ml-4 text-sm text-zinc-600 hover:text-zinc-900"
            >
              Copy
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          Keep this key private. It&apos;s used to authenticate tracking requests from your website.
        </p>
      </div>

      {/* Plan Details */}
      {user.plan === 'free' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Upgrade to Pro</h2>
          <p className="text-zinc-300 mb-4">
            Get unlimited data retention, conversion tracking, and more.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unlimited history (vs 7 days)
            </li>
            <li className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Conversion tracking & attribution
            </li>
            <li className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Priority email support
            </li>
          </ul>
          <button className="bg-white text-zinc-900 px-4 py-2 rounded-lg font-medium hover:bg-zinc-100 transition">
            Upgrade for $49/mo
          </button>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-zinc-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
