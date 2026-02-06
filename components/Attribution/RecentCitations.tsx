'use client';

interface Visit {
  id: number;
  source: string;
  confidence: string;
  page: string;
  timestamp: string;
}

interface RecentCitationsProps {
  visits: Visit[];
}

const CONFIDENCE_STYLES = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  probable: 'bg-amber-100 text-amber-700',
  possible: 'bg-zinc-100 text-zinc-600',
};

export default function RecentCitations({ visits }: RecentCitationsProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  };

  if (visits.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Recent Citations</h3>
        <div className="flex items-center justify-center h-32 text-zinc-500">
          No citations recorded yet. Install the tracking script to start collecting data.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      <div className="p-6 border-b border-zinc-200">
        <h3 className="text-lg font-semibold text-zinc-900">Recent Citations</h3>
        <p className="text-sm text-zinc-500 mt-1">
          Latest {visits.length} AI-driven visits to your site
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Time
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Source
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Page
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {visits.map((visit) => (
              <tr key={visit.id} className="hover:bg-zinc-50 transition">
                <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap">
                  {formatTime(visit.timestamp)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                  {visit.source}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-600 max-w-xs truncate" title={visit.page}>
                  {visit.page}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      CONFIDENCE_STYLES[visit.confidence as keyof typeof CONFIDENCE_STYLES]
                    }`}
                  >
                    {visit.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
