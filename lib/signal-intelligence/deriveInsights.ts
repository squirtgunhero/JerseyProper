/**
 * Signal Intelligence Derivation Logic
 * Transforms raw signals into actionable insights
 * Works entirely without LLM - uses keyword rules and heuristics
 */

import type {
  NormalizedSignal,
  InsightCandidate,
  MetaAdRecord,
  VisibilityRecord,
  ContentRecord,
  OfferArchetype,
  OfferClassification,
  VisibilityRisk,
  AdSurvivalAnalysis,
  CreativeDistribution,
  ContentSurvivalCandidate,
  TopicCluster,
} from './types';

// =============================================================================
// Offer Archetype Classification Keywords
// =============================================================================

const ARCHETYPE_KEYWORDS: Record<OfferArchetype, string[]> = {
  valuation: [
    'free valuation', 'free home valuation', 'home value', 'what is my home worth', 
    'property value', 'market analysis', 'cma', 'comparative market', 'home estimate', 
    'instant valuation', 'free estimate', 'property assessment', 'value report', 
    'home worth', 'home valuation',
  ],
  seller: [
    'sell your home', 'list your home', 'selling your house', 'home seller',
    'list with us', 'sell fast', 'top dollar', 'maximize value', 'seller services',
    'listing agent', 'sell for more', 'ready to sell', 'thinking of selling',
  ],
  buyer: [
    'find your home', 'home search', 'buy a home', 'first time buyer',
    'home buyer', 'dream home', 'house hunting', 'new listings', 'buyer services',
    'buyer agent', 'searching for', 'looking to buy', 'mortgage', 'pre-approved',
  ],
  brand: [
    'about us', 'our team', 'years of experience', 'trusted', 'local expert',
    'community', 'testimonial', 'success story', 'award', 'recognized',
    'family owned', 'serving', 'since', 'reputation', 'commitment',
  ],
  other: [],
};

/**
 * Classify an ad's offer archetype based on text content
 */
export function classifyOfferArchetype(text: string): OfferClassification {
  const lowerText = text.toLowerCase();
  const results: Array<{ archetype: OfferArchetype; score: number; matches: string[] }> = [];

  for (const [archetype, keywords] of Object.entries(ARCHETYPE_KEYWORDS)) {
    if (archetype === 'other') continue;
    
    const matches = keywords.filter(kw => lowerText.includes(kw));
    if (matches.length > 0) {
      results.push({
        archetype: archetype as OfferArchetype,
        score: matches.length,
        matches,
      });
    }
  }

  if (results.length === 0) {
    return { archetype: 'other', confidence: 0.5, matchedKeywords: [] };
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  const best = results[0];
  
  // Confidence based on number of matches and gap to second place
  const secondScore = results[1]?.score || 0;
  const confidence = Math.min(0.95, 0.5 + (best.score * 0.1) + ((best.score - secondScore) * 0.1));

  return {
    archetype: best.archetype,
    confidence,
    matchedKeywords: best.matches,
  };
}

/**
 * Calculate ad survival days (how long an ad has been running)
 */
export function calculateAdSurvivalDays(ad: MetaAdRecord): number {
  const startDate = new Date(ad.ad_delivery_start_time);
  const endDate = ad.ad_delivery_stop_time 
    ? new Date(ad.ad_delivery_stop_time) 
    : new Date();
  
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Analyze ad survival and classify
 */
export function analyzeAdSurvival(ads: MetaAdRecord[]): AdSurvivalAnalysis[] {
  return ads.map(ad => {
    const survivalDays = calculateAdSurvivalDays(ad);
    const textContent = [
      ad.ad_creative_body || '',
      ad.ad_creative_link_title || '',
      ad.ad_creative_link_description || '',
    ].join(' ');
    
    const classification = classifyOfferArchetype(textContent);
    
    return {
      ad_id: ad.ad_id,
      survival_days: survivalDays,
      is_long_running: survivalDays >= 30,
      creative_type: ad.creative_type || 'text',
      archetype: classification.archetype,
    };
  });
}

/**
 * Calculate creative type distribution
 */
export function calculateCreativeDistribution(ads: MetaAdRecord[]): CreativeDistribution[] {
  const counts = new Map<string, number>();
  
  for (const ad of ads) {
    const type = ad.creative_type || 'text';
    counts.set(type, (counts.get(type) || 0) + 1);
  }

  const total = ads.length || 1;
  return Array.from(counts.entries()).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / total) * 100),
  }));
}

/**
 * Assess visibility risks from profile data
 */
export function assessVisibilityRisks(visibility: VisibilityRecord): VisibilityRisk[] {
  const risks: VisibilityRisk[] = [];

  // Low review count
  if (visibility.review_count < 10) {
    risks.push({
      type: 'low_reviews',
      severity: visibility.review_count < 5 ? 'high' : 'medium',
      details: `Only ${visibility.review_count} reviews on ${visibility.platform}`,
    });
  }

  // Low photo count
  if (visibility.photo_count < 5) {
    risks.push({
      type: 'low_photos',
      severity: visibility.photo_count === 0 ? 'high' : 'medium',
      details: `Only ${visibility.photo_count} photos on ${visibility.platform}`,
    });
  }

  // Missing services
  if (visibility.services_listed.length === 0) {
    risks.push({
      type: 'missing_services',
      severity: 'medium',
      details: `No services listed on ${visibility.platform}`,
    });
  }

  // Low profile completeness
  if (visibility.profile_completeness < 70) {
    risks.push({
      type: 'low_completeness',
      severity: visibility.profile_completeness < 50 ? 'high' : 'medium',
      details: `Profile only ${visibility.profile_completeness}% complete on ${visibility.platform}`,
    });
  }

  // Stale reviews
  if (visibility.last_review_date) {
    const lastReview = new Date(visibility.last_review_date);
    const daysSinceReview = Math.floor((Date.now() - lastReview.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceReview > 90) {
      risks.push({
        type: 'stale_reviews',
        severity: daysSinceReview > 180 ? 'high' : 'medium',
        details: `No reviews in ${daysSinceReview} days on ${visibility.platform}`,
      });
    }
  }

  return risks;
}

/**
 * Identify content survival candidates (evergreen content)
 */
export function identifyContentSurvivalCandidates(content: ContentRecord[]): ContentSurvivalCandidate[] {
  const now = new Date();
  
  return content
    .map(item => {
      const publishedDate = new Date(item.published_date);
      const ageDays = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Evergreen criteria: older than 90 days, has engagement, or long-form
      const isEvergreen = ageDays > 90 && (
        item.word_count > 1500 ||
        (item.engagement_signals?.backlinks && item.engagement_signals.backlinks > 0) ||
        item.content_type === 'case-study'
      );

      return {
        url: item.url,
        title: item.title,
        age_days: ageDays,
        topics: item.topics,
        is_evergreen: isEvergreen,
      };
    })
    .filter(c => c.is_evergreen)
    .sort((a, b) => b.age_days - a.age_days);
}

/**
 * Calculate topic cluster frequency
 */
export function calculateTopicClusters(content: ContentRecord[]): TopicCluster[] {
  const topicMap = new Map<string, { count: number; examples: string[] }>();

  for (const item of content) {
    for (const topic of item.topics) {
      const normalizedTopic = topic.toLowerCase().trim();
      const existing = topicMap.get(normalizedTopic) || { count: 0, examples: [] };
      existing.count++;
      if (existing.examples.length < 3) {
        existing.examples.push(item.title);
      }
      topicMap.set(normalizedTopic, existing);
    }
  }

  return Array.from(topicMap.entries())
    .map(([topic, data]) => ({
      topic,
      frequency: data.count,
      examples: data.examples,
    }))
    .sort((a, b) => b.frequency - a.frequency);
}

/**
 * Generate platform dependency risk narrative
 */
export function assessPlatformDependency(signals: NormalizedSignal[]): string {
  const sourceCount = new Map<string, number>();
  
  for (const signal of signals) {
    sourceCount.set(signal.source, (sourceCount.get(signal.source) || 0) + 1);
  }

  const total = signals.length || 1;
  const sorted = Array.from(sourceCount.entries()).sort((a, b) => b[1] - a[1]);
  
  if (sorted.length === 0) {
    return 'Insufficient data to assess platform dependency.';
  }

  const [topSource, topCount] = sorted[0];
  const topPercentage = Math.round((topCount / total) * 100);

  if (topPercentage > 70) {
    return `High platform dependency risk: ${topPercentage}% of signals come from ${topSource}. Diversification recommended.`;
  } else if (topPercentage > 50) {
    return `Moderate platform dependency: ${topPercentage}% of signals from ${topSource}. Consider expanding to other channels.`;
  } else {
    return `Healthy platform diversification: No single source exceeds 50% of signals.`;
  }
}

// =============================================================================
// Main Derivation Function
// =============================================================================

/**
 * Derive insights from raw signals
 */
export function deriveInsights(signals: NormalizedSignal[]): InsightCandidate[] {
  const insights: InsightCandidate[] = [];

  // Separate signals by category
  const adSignals = signals.filter(s => s.category === 'ads');
  const visibilitySignals = signals.filter(s => s.category === 'visibility');
  const contentSignals = signals.filter(s => s.category === 'content');

  // Extract typed payloads
  const ads = adSignals.map(s => s.payload as MetaAdRecord);
  const visibilities = visibilitySignals.map(s => s.payload as VisibilityRecord);
  const contents = contentSignals.map(s => s.payload as ContentRecord);

  // ==========================================================================
  // Ad Insights
  // ==========================================================================
  
  if (ads.length > 0) {
    const survivalAnalysis = analyzeAdSurvival(ads);
    const longRunning = survivalAnalysis.filter(a => a.is_long_running);
    
    if (longRunning.length > 0) {
      const avgDays = Math.round(longRunning.reduce((sum, a) => sum + a.survival_days, 0) / longRunning.length);
      insights.push({
        category: 'ads',
        title: 'Long-Running Ad Patterns Detected',
        severity: 'info',
        summary: `${longRunning.length} ads have been running 30+ days (avg: ${avgDays} days). These represent validated messaging worth studying.`,
        evidence: {
          count: longRunning.length,
          average_days: avgDays,
          samples: longRunning.slice(0, 5).map(a => ({ ad_id: a.ad_id, days: a.survival_days, archetype: a.archetype })),
        },
      });
    }

    const distribution = calculateCreativeDistribution(ads);
    const dominantType = distribution[0];
    if (dominantType && dominantType.percentage > 60) {
      insights.push({
        category: 'ads',
        title: 'Creative Type Concentration',
        severity: 'low',
        summary: `${dominantType.percentage}% of ads use ${dominantType.type} format. Consider testing other formats for diversification.`,
        evidence: { distribution },
      });
    }

    // Archetype distribution
    const archetypeCounts = new Map<string, number>();
    for (const analysis of survivalAnalysis) {
      archetypeCounts.set(analysis.archetype, (archetypeCounts.get(analysis.archetype) || 0) + 1);
    }
    const archetypeDistribution = Array.from(archetypeCounts.entries())
      .map(([archetype, count]) => ({ archetype, count, percentage: Math.round((count / ads.length) * 100) }))
      .sort((a, b) => b.count - a.count);
    
    if (archetypeDistribution.length > 0) {
      insights.push({
        category: 'ads',
        title: 'Offer Archetype Distribution',
        severity: 'info',
        summary: `Primary ad focus: ${archetypeDistribution[0].archetype} (${archetypeDistribution[0].percentage}%). This reveals competitor positioning strategy.`,
        evidence: { archetypes: archetypeDistribution },
      });
    }
  }

  // ==========================================================================
  // Visibility Insights
  // ==========================================================================
  
  if (visibilities.length > 0) {
    const allRisks: VisibilityRisk[] = [];
    for (const v of visibilities) {
      allRisks.push(...assessVisibilityRisks(v));
    }

    const highRisks = allRisks.filter(r => r.severity === 'high');
    const mediumRisks = allRisks.filter(r => r.severity === 'medium');

    if (highRisks.length > 0) {
      insights.push({
        category: 'visibility',
        title: 'Critical Visibility Gaps',
        severity: 'high',
        summary: `${highRisks.length} high-priority visibility issues identified across platforms.`,
        evidence: { risks: highRisks },
      });
    }

    if (mediumRisks.length > 0) {
      insights.push({
        category: 'visibility',
        title: 'Visibility Improvement Opportunities',
        severity: 'medium',
        summary: `${mediumRisks.length} moderate visibility issues found that could improve local presence.`,
        evidence: { risks: mediumRisks },
      });
    }

    // Review velocity analysis
    const totalReviews = visibilities.reduce((sum, v) => sum + v.review_count, 0);
    const avgRating = visibilities.reduce((sum, v) => sum + v.average_rating, 0) / visibilities.length;
    
    insights.push({
      category: 'visibility',
      title: 'Review Portfolio Summary',
      severity: 'info',
      summary: `Total reviews across platforms: ${totalReviews}. Average rating: ${avgRating.toFixed(1)} stars.`,
      evidence: {
        total_reviews: totalReviews,
        average_rating: avgRating,
        platforms: visibilities.map(v => ({ platform: v.platform, reviews: v.review_count, rating: v.average_rating })),
      },
    });
  }

  // ==========================================================================
  // Content Insights
  // ==========================================================================
  
  if (contents.length > 0) {
    const survivalCandidates = identifyContentSurvivalCandidates(contents);
    
    if (survivalCandidates.length > 0) {
      insights.push({
        category: 'content',
        title: 'Evergreen Content Identified',
        severity: 'info',
        summary: `${survivalCandidates.length} pieces of long-lasting content found. These topics have proven staying power.`,
        evidence: {
          count: survivalCandidates.length,
          samples: survivalCandidates.slice(0, 5),
        },
      });
    }

    const topicClusters = calculateTopicClusters(contents);
    const topTopics = topicClusters.slice(0, 5);
    
    if (topTopics.length > 0) {
      insights.push({
        category: 'content',
        title: 'Content Topic Clusters',
        severity: 'info',
        summary: `Top content themes: ${topTopics.map(t => t.topic).join(', ')}. These represent key messaging pillars.`,
        evidence: { clusters: topTopics },
      });
    }

    // Content type distribution
    const typeCount = new Map<string, number>();
    for (const c of contents) {
      typeCount.set(c.content_type, (typeCount.get(c.content_type) || 0) + 1);
    }
    const typeDistribution = Array.from(typeCount.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
    
    insights.push({
      category: 'content',
      title: 'Content Format Strategy',
      severity: 'info',
      summary: `Primary content format: ${typeDistribution[0]?.type || 'unknown'}. Total pieces analyzed: ${contents.length}.`,
      evidence: { distribution: typeDistribution },
    });
  }

  // ==========================================================================
  // Cross-Category Insights
  // ==========================================================================
  
  const platformDependency = assessPlatformDependency(signals);
  insights.push({
    category: 'strategy',
    title: 'Platform Dependency Analysis',
    severity: platformDependency.includes('High') ? 'high' : platformDependency.includes('Moderate') ? 'medium' : 'info',
    summary: platformDependency,
    evidence: {
      total_signals: signals.length,
      by_category: {
        ads: adSignals.length,
        visibility: visibilitySignals.length,
        content: contentSignals.length,
      },
    },
  });

  return insights;
}
