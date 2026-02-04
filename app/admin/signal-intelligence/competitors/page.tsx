'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Competitor {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  created_at: string;
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    notes: '',
  });

  const fetchCompetitors = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/signal-intelligence/competitors');
      if (!res.ok) throw new Error('Failed to fetch competitors');
      const data = await res.json();
      setCompetitors(data.competitors || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load competitors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitors();
  }, [fetchCompetitors]);

  function resetForm() {
    setFormData({ name: '', website: '', notes: '' });
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(competitor: Competitor) {
    setFormData({
      name: competitor.name,
      website: competitor.website || '',
      notes: competitor.notes || '',
    });
    setEditingId(competitor.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? { id: editingId, ...formData }
        : formData;

      const res = await fetch('/api/admin/signal-intelligence/competitors', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save competitor');
      }

      resetForm();
      await fetchCompetitors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this competitor?')) return;

    try {
      const res = await fetch('/api/admin/signal-intelligence/competitors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Failed to delete');
      await fetchCompetitors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/signal-intelligence"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Back to Signal Intelligence
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-white">Competitors</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Add your real competitors to track their ads, reviews, and content.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Competitor
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">Dismiss</button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            {editingId ? 'Edit Competitor' : 'Add Competitor'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Business Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Acme Realty Group"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Website URL
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <p className="mt-1 text-xs text-zinc-600">Used for blog/content scraping</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any notes about this competitor..."
                rows={2}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : (editingId ? 'Update' : 'Add Competitor')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Competitors List */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-zinc-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : competitors.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">No competitors yet</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Add your competitors to start tracking their market signals.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {competitors.map((competitor) => (
              <div key={competitor.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white truncate">{competitor.name}</h3>
                  <div className="mt-1 flex items-center gap-4 text-xs text-zinc-500">
                    {competitor.website && (
                      <a 
                        href={competitor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-emerald-400 truncate max-w-xs"
                      >
                        {competitor.website}
                      </a>
                    )}
                    {competitor.notes && (
                      <span className="truncate max-w-xs">{competitor.notes}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(competitor)}
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(competitor.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Data Collection</h3>
        <ul className="text-xs text-zinc-500 space-y-1">
          <li>• <strong>Business Name:</strong> Used to search Meta Ad Library and Google Places</li>
          <li>• <strong>Website:</strong> Used to scrape blog posts and content (requires sitemap.xml)</li>
          <li>• For best results with Meta Ads, add <code className="text-zinc-400">META_ACCESS_TOKEN</code> to your .env.local</li>
          <li>• For Google reviews, add <code className="text-zinc-400">GOOGLE_PLACES_API_KEY</code> to your .env.local</li>
        </ul>
      </div>
    </div>
  );
}
