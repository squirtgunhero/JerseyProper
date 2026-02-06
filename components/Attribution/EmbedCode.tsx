'use client';

import { useState } from 'react';

interface EmbedCodeProps {
  apiKey: string;
}

export default function EmbedCode({ apiKey }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const embedCode = `<script src="${baseUrl}/track.js" data-api-key="${apiKey}"></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">Install Tracking Script</h3>
          <p className="text-sm text-zinc-500 mt-1">
            Add this code to your website to start tracking AI traffic
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            Active
          </span>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-sm overflow-x-auto font-mono">
          <code>{embedCode}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-md text-sm font-medium transition ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
          }`}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-medium text-zinc-600 flex-shrink-0">
            1
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-900">Copy the code</div>
            <div className="text-xs text-zinc-500 mt-0.5">Click the copy button above</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-medium text-zinc-600 flex-shrink-0">
            2
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-900">Paste before &lt;/body&gt;</div>
            <div className="text-xs text-zinc-500 mt-0.5">Add to your HTML template</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-medium text-zinc-600 flex-shrink-0">
            3
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-900">Start tracking</div>
            <div className="text-xs text-zinc-500 mt-0.5">Data appears within minutes</div>
          </div>
        </div>
      </div>

      {/* API Key Display */}
      <div className="mt-6 pt-4 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-zinc-700">Your API Key</div>
            <div className="text-xs text-zinc-500 mt-0.5">Keep this private - it identifies your account</div>
          </div>
          <code className="text-sm bg-zinc-100 px-3 py-1.5 rounded font-mono text-zinc-700">
            {apiKey.slice(0, 8)}...{apiKey.slice(-8)}
          </code>
        </div>
      </div>
    </div>
  );
}
