/**
 * Signal Intelligence Scan Orchestration
 * Main entry point for running a signal scan
 */

import { getSupabaseAdmin } from '../supabase/server';
import { runAllCollectors } from './providers';
import { deriveInsights } from './deriveInsights';
import { generateBrief, briefToMarkdown, polishBriefWithAI } from './generateBrief';
import type { NormalizedSignal, InsightCandidate } from './types';

export interface ScanResult {
  runId: string;
  status: 'completed' | 'failed';
  signalsCollected: number;
  insightsGenerated: number;
  briefGenerated: boolean;
  error?: string;
}

export interface ScanOptions {
  triggeredBy?: string;
  polishBrief?: boolean;
}

/**
 * Run a complete signal intelligence scan
 * 
 * Flow:
 * 1. Create signal_run record
 * 2. Run all collectors
 * 3. Write raw_signals
 * 4. Derive insights
 * 5. Write derived_insights
 * 6. Generate brief
 * 7. Write signal_briefs
 * 8. Complete the run
 */
export async function runSignalScan(options: ScanOptions = {}): Promise<ScanResult> {
  const supabase = getSupabaseAdmin();
  const { triggeredBy = 'system', polishBrief = true } = options;

  // Step 1: Create signal_run record
  const { data: run, error: runError } = await supabase
    .from('signal_runs')
    .insert({
      status: 'running',
      triggered_by: triggeredBy,
    })
    .select()
    .single();

  if (runError || !run) {
    console.error('[SignalScan] Failed to create run:', runError);
    return {
      runId: '',
      status: 'failed',
      signalsCollected: 0,
      insightsGenerated: 0,
      briefGenerated: false,
      error: runError?.message || 'Failed to create run',
    };
  }

  const runId = run.id;
  console.log(`[SignalScan] Started run ${runId}`);

  try {
    // Step 2: Run all collectors
    console.log('[SignalScan] Running collectors...');
    const providerResults = await runAllCollectors();
    
    // Aggregate all signals
    const allSignals: NormalizedSignal[] = [];
    for (const result of providerResults) {
      if (result.error) {
        console.warn(`[SignalScan] Provider ${result.name} had error:`, result.error);
      }
      allSignals.push(...result.signals);
    }

    console.log(`[SignalScan] Collected ${allSignals.length} total signals`);

    // Step 3: Write raw_signals
    if (allSignals.length > 0) {
      const rawSignalRows = allSignals.map(signal => ({
        run_id: runId,
        competitor_id: signal.competitor_id || null,
        category: signal.category,
        source: signal.source,
        payload: signal.payload,
      }));

      const { error: signalsError } = await supabase
        .from('raw_signals')
        .insert(rawSignalRows);

      if (signalsError) {
        console.error('[SignalScan] Failed to insert raw signals:', signalsError);
      }
    }

    // Step 4: Derive insights
    console.log('[SignalScan] Deriving insights...');
    const insights: InsightCandidate[] = deriveInsights(allSignals);
    console.log(`[SignalScan] Generated ${insights.length} insights`);

    // Step 5: Write derived_insights
    if (insights.length > 0) {
      const insightRows = insights.map(insight => ({
        run_id: runId,
        category: insight.category,
        title: insight.title,
        severity: insight.severity,
        summary: insight.summary,
        evidence: insight.evidence,
      }));

      const { error: insightsError } = await supabase
        .from('derived_insights')
        .insert(insightRows);

      if (insightsError) {
        console.error('[SignalScan] Failed to insert insights:', insightsError);
      }
    }

    // Step 6: Generate brief
    console.log('[SignalScan] Generating brief...');
    const brief = generateBrief({
      insights,
      runId,
      runDate: new Date(),
    });

    let briefMarkdown = briefToMarkdown(brief);

    // Optionally polish with AI
    if (polishBrief && process.env.OPENAI_API_KEY) {
      console.log('[SignalScan] Polishing brief with AI...');
      briefMarkdown = await polishBriefWithAI(briefMarkdown);
    }

    // Step 7: Write signal_briefs
    const { error: briefError } = await supabase
      .from('signal_briefs')
      .insert({
        run_id: runId,
        audience: 'executive',
        headline: brief.headline,
        body_md: briefMarkdown,
        created_by: triggeredBy,
      });

    if (briefError) {
      console.error('[SignalScan] Failed to insert brief:', briefError);
    }

    // Step 8: Complete the run
    const { error: updateError } = await supabase
      .from('signal_runs')
      .update({
        status: 'completed',
        finished_at: new Date().toISOString(),
      })
      .eq('id', runId);

    if (updateError) {
      console.error('[SignalScan] Failed to update run status:', updateError);
    }

    console.log(`[SignalScan] Completed run ${runId}`);

    return {
      runId,
      status: 'completed',
      signalsCollected: allSignals.length,
      insightsGenerated: insights.length,
      briefGenerated: !briefError,
    };

  } catch (error) {
    // Mark run as failed
    await supabase
      .from('signal_runs')
      .update({
        status: 'failed',
        finished_at: new Date().toISOString(),
      })
      .eq('id', runId);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[SignalScan] Run ${runId} failed:`, errorMessage);

    return {
      runId,
      status: 'failed',
      signalsCollected: 0,
      insightsGenerated: 0,
      briefGenerated: false,
      error: errorMessage,
    };
  }
}

/**
 * Get details for a specific run
 */
export async function getRunDetails(runId: string) {
  const supabase = getSupabaseAdmin();

  const [runResult, insightsResult, briefResult, signalsResult] = await Promise.all([
    supabase.from('signal_runs').select('*').eq('id', runId).single(),
    supabase.from('derived_insights').select('*').eq('run_id', runId).order('severity', { ascending: false }),
    supabase.from('signal_briefs').select('*').eq('run_id', runId).single(),
    supabase.from('raw_signals').select('id, category, source').eq('run_id', runId),
  ]);

  return {
    run: runResult.data,
    insights: insightsResult.data || [],
    brief: briefResult.data,
    signalCount: signalsResult.data?.length || 0,
    error: runResult.error || insightsResult.error,
  };
}

/**
 * List recent runs
 */
export async function listRuns(limit = 20) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('signal_runs')
    .select(`
      *,
      derived_insights(count)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[SignalScan] Failed to list runs:', error);
    return [];
  }

  return data || [];
}
