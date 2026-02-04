/**
 * Signal Intelligence Module
 * Export all public APIs
 */

export { runSignalScan, getRunDetails, listRuns } from './runScan';
export type { ScanResult, ScanOptions } from './runScan';

export { deriveInsights, classifyOfferArchetype, calculateAdSurvivalDays } from './deriveInsights';
export { generateBrief, briefToMarkdown, polishBriefWithAI } from './generateBrief';

export * from './types';
