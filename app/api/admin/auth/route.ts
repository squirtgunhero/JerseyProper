import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, setAdminAuthCookie } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Set auth cookie
    await setAdminAuthCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[AdminAuth] Error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
