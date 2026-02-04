import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { runSignalScan } from '@/lib/signal-intelligence';

export async function POST() {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Run the scan
    const result = await runSignalScan({
      triggeredBy: 'admin_ui',
      polishBrief: true,
    });

    if (result.status === 'failed') {
      return NextResponse.json(
        { error: result.error || 'Scan failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[SignalScan API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to run scan' },
      { status: 500 }
    );
  }
}
