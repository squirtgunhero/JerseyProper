import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { listRuns } from '@/lib/signal-intelligence';

export async function GET() {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const runs = await listRuns(50);
    return NextResponse.json({ runs });
  } catch (error) {
    console.error('[SignalRuns API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to list runs' },
      { status: 500 }
    );
  }
}
