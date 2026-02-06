/**
 * AI Attribution Tracker - Embedded Tracking Script
 * Detects and tracks AI-driven traffic to your website
 * 
 * Usage:
 * <script src="https://yourdomain.com/track.js" data-api-key="your-api-key"></script>
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration
  // ==========================================================================
  
  const TRACKER_VERSION = '1.0.0';
  const API_ENDPOINT = (function() {
    const script = document.currentScript;
    if (script && script.src) {
      const url = new URL(script.src);
      return url.origin + '/api/track';
    }
    return '/api/track';
  })();
  
  const CONVERSION_ENDPOINT = API_ENDPOINT.replace('/track', '/track-conversion');

  // Get API key from script tag
  const getApiKey = () => {
    const script = document.currentScript || document.querySelector('script[data-api-key]');
    return script ? script.getAttribute('data-api-key') : null;
  };

  const API_KEY = getApiKey();

  if (!API_KEY) {
    console.warn('[AI Attribution] Missing data-api-key attribute on script tag');
    return;
  }

  // ==========================================================================
  // AI Detection Patterns
  // ==========================================================================

  const USER_AGENT_PATTERNS = {
    'ChatGPT-User': 'ChatGPT',
    'Claude-Web': 'Claude',
    'PerplexityBot': 'Perplexity',
    'GPTBot': 'ChatGPT',
    'anthropic-ai': 'Claude',
    'cohere-ai': 'Cohere',
    'GoogleOther': 'Google Bard',
    'Bytespider': 'ByteDance AI',
    'CCBot': 'Common Crawl AI',
  };

  const REFERRER_PATTERNS = {
    'perplexity.ai': 'Perplexity',
    'chatgpt.com': 'ChatGPT',
    'chat.openai.com': 'ChatGPT',
    'claude.ai': 'Claude',
    'you.com': 'You.com',
    'bing.com/chat': 'Bing Chat',
    'poe.com': 'Poe',
    'bard.google.com': 'Google Bard',
    'gemini.google.com': 'Google Gemini',
    'copilot.microsoft.com': 'Microsoft Copilot',
    'phind.com': 'Phind',
    'kagi.com': 'Kagi AI',
  };

  const URL_PARAM_PATTERNS = {
    'utm_source': {
      'chatgpt': 'ChatGPT',
      'claude': 'Claude',
      'perplexity': 'Perplexity',
      'bing': 'Bing Chat',
      'ai': 'AI-Likely',
    },
    'ref': {
      'chatgpt': 'ChatGPT',
      'claude': 'Claude',
      'perplexity': 'Perplexity',
      'ai': 'AI-Likely',
    },
    'ai': {
      'chatgpt': 'ChatGPT',
      'claude': 'Claude',
      'perplexity': 'Perplexity',
      '1': 'AI-Likely',
      'true': 'AI-Likely',
    },
  };

  // ==========================================================================
  // Session Management
  // ==========================================================================

  const SESSION_KEY = 'ai_attribution_session';
  const VISIT_KEY = 'ai_attribution_visited';

  const generateSessionId = () => {
    return 'sess_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  };

  const isNewSession = () => {
    return !sessionStorage.getItem(VISIT_KEY);
  };

  const markVisited = () => {
    sessionStorage.setItem(VISIT_KEY, 'true');
  };

  // ==========================================================================
  // AI Detection Logic
  // ==========================================================================

  const detectFromUserAgent = () => {
    const ua = navigator.userAgent;
    for (const [pattern, source] of Object.entries(USER_AGENT_PATTERNS)) {
      if (ua.includes(pattern)) {
        return {
          source,
          confidence: 'confirmed',
          method: 'user_agent',
        };
      }
    }
    return null;
  };

  const detectFromReferrer = () => {
    const referrer = document.referrer.toLowerCase();
    if (!referrer) return null;

    for (const [pattern, source] of Object.entries(REFERRER_PATTERNS)) {
      if (referrer.includes(pattern)) {
        return {
          source,
          confidence: 'confirmed',
          method: 'referrer',
        };
      }
    }
    return null;
  };

  const detectFromUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    
    for (const [paramName, values] of Object.entries(URL_PARAM_PATTERNS)) {
      const paramValue = params.get(paramName);
      if (paramValue) {
        const source = values[paramValue.toLowerCase()];
        if (source) {
          return {
            source,
            confidence: 'confirmed',
            method: 'url_param',
            context: `${paramName}=${paramValue}`,
          };
        }
      }
    }
    return null;
  };

  const detectFromBehavior = () => {
    // Behavioral heuristics for AI traffic detection
    const indicators = {
      noReferrer: !document.referrer,
      deepEntry: window.location.pathname !== '/' && window.location.pathname !== '',
      newSession: isNewSession(),
    };

    const score = Object.values(indicators).filter(Boolean).length;

    if (score >= 3) {
      return {
        source: 'AI-Likely',
        confidence: 'probable',
        method: 'behavioral',
        context: JSON.stringify(indicators),
      };
    } else if (score >= 2) {
      return {
        source: 'AI-Likely',
        confidence: 'possible',
        method: 'behavioral',
        context: JSON.stringify(indicators),
      };
    }

    return null;
  };

  const detectAISource = () => {
    // Priority order: URL params > User Agent > Referrer > Behavioral
    return detectFromUrlParams() || 
           detectFromUserAgent() || 
           detectFromReferrer() || 
           detectFromBehavior();
  };

  // ==========================================================================
  // Engagement Tracking (for behavioral confidence boost)
  // ==========================================================================

  let engagementScore = 0;
  let scrollDepth = 0;
  let timeOnPage = Date.now();

  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollPercent > scrollDepth) {
      scrollDepth = scrollPercent;
      if (scrollDepth > 25) engagementScore++;
      if (scrollDepth > 50) engagementScore++;
      if (scrollDepth > 75) engagementScore++;
    }
  };

  // Debounced scroll handler
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScroll, 100);
  }, { passive: true });

  // ==========================================================================
  // API Communication
  // ==========================================================================

  const sendTrack = async (detection) => {
    if (!detection) return null;

    const payload = {
      api_key: API_KEY,
      source: detection.source,
      confidence: detection.confidence,
      page: window.location.pathname,
      full_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      session_id: getSessionId(),
      citation_context: detection.context || null,
      detection_method: detection.method,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok) {
        console.warn('[AI Attribution] Track request failed:', response.status);
        return null;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.warn('[AI Attribution] Track request error:', error);
      return null;
    }
  };

  const sendConversion = async (eventType, value = 0, metadata = {}) => {
    const payload = {
      api_key: API_KEY,
      session_id: getSessionId(),
      event_type: eventType,
      value: value,
      metadata: {
        ...metadata,
        page: window.location.pathname,
        scroll_depth: scrollDepth,
        time_on_page: Math.round((Date.now() - timeOnPage) / 1000),
      },
    };

    try {
      const response = await fetch(CONVERSION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok) {
        console.warn('[AI Attribution] Conversion request failed:', response.status);
        return null;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.warn('[AI Attribution] Conversion request error:', error);
      return null;
    }
  };

  // ==========================================================================
  // Initialize Tracking
  // ==========================================================================

  const init = () => {
    // Only track once per page view
    const pageKey = 'ai_attr_tracked_' + window.location.pathname;
    if (sessionStorage.getItem(pageKey)) {
      return;
    }

    const detection = detectAISource();
    
    if (detection) {
      sessionStorage.setItem(pageKey, 'true');
      sendTrack(detection);
      
      // Log for debugging (can be disabled in production)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('[AI Attribution] Detected:', detection);
      }
    }

    markVisited();
  };

  // ==========================================================================
  // Public API
  // ==========================================================================

  window.aiTrack = {
    version: TRACKER_VERSION,
    
    // Manual detection (for debugging)
    detect: detectAISource,
    
    // Get current session ID
    getSessionId: getSessionId,
    
    // Track a conversion event
    conversion: (eventType, value = 0, metadata = {}) => {
      return sendConversion(eventType, value, metadata);
    },
    
    // Track a page view manually (for SPAs)
    pageView: () => {
      const detection = detectAISource();
      if (detection) {
        return sendTrack(detection);
      }
      return Promise.resolve(null);
    },
    
    // Get engagement metrics
    getEngagement: () => ({
      scrollDepth,
      engagementScore,
      timeOnPage: Math.round((Date.now() - timeOnPage) / 1000),
    }),
  };

  // ==========================================================================
  // Run on DOM Ready
  // ==========================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Track page unload engagement for behavioral analysis
  window.addEventListener('beforeunload', () => {
    const engagement = window.aiTrack.getEngagement();
    // Quick bounce detection (less than 5 seconds, no scroll)
    if (engagement.timeOnPage < 5 && engagement.scrollDepth < 10) {
      // Could indicate AI user who got their answer and left
      // This data could be sent via beacon API if needed
    }
  });

})();
