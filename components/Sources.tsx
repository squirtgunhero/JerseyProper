/**
 * Sources Component
 * 
 * A lightweight component for displaying references and citations
 * on blog posts and content pages. Matches the existing typography
 * and spacing of the site.
 */

import { ExternalLink } from 'lucide-react'

export interface Source {
  title: string
  url: string
}

interface SourcesProps {
  sources: Source[]
  className?: string
}

export default function Sources({ sources, className = '' }: SourcesProps) {
  if (!sources || sources.length === 0) {
    return null
  }

  return (
    <aside 
      className={`mt-12 pt-8 border-t border-gold-primary/20 ${className}`}
      aria-labelledby="sources-heading"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 border border-gold-primary/30 flex items-center justify-center">
          <span className="text-gold-primary text-xs font-heading">★</span>
        </div>
        <h3 
          id="sources-heading"
          className="font-heading text-sm uppercase tracking-widest text-cream/60"
        >
          Sources & References
        </h3>
      </div>

      {/* Sources List */}
      <ol className="space-y-3 list-none">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-3 group">
            {/* Number indicator */}
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs text-cream/40 font-mono">
              {index + 1}.
            </span>
            
            {/* Source link */}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/70 hover:text-gold-primary transition-colors duration-300"
            >
              <span className="text-sm leading-relaxed">{source.title}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
