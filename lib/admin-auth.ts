/**
 * Simple Admin Authentication Gate
 * MVP: Uses environment variable password
 * TODO: Replace with Supabase Auth when configured
 */

import { cookies } from 'next/headers';

const ADMIN_PASSWORD_ENV = 'ADMIN_PASSWORD';
const AUTH_COOKIE_NAME = 'admin_auth';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Check if admin authentication is required
 * Returns false if no password is configured (development mode)
 */
export function isAdminAuthRequired(): boolean {
  return !!process.env[ADMIN_PASSWORD_ENV];
}

/**
 * Verify the admin password
 */
export function verifyAdminPassword(password: string): boolean {
  const correctPassword = process.env[ADMIN_PASSWORD_ENV];
  
  // If no password configured, allow access (dev mode)
  if (!correctPassword) {
    return true;
  }
  
  return password === correctPassword;
}

/**
 * Check if the current request is authenticated
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  // If no password required, always authenticated
  if (!isAdminAuthRequired()) {
    return true;
  }

  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!authCookie) {
    return false;
  }

  // Simple token validation - in production, use proper session management
  const expectedToken = generateAuthToken();
  return authCookie.value === expectedToken;
}

/**
 * Set the admin authentication cookie
 */
export async function setAdminAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = generateAuthToken();
  
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: AUTH_COOKIE_MAX_AGE,
    path: '/admin',
  });
}

/**
 * Clear the admin authentication cookie
 */
export async function clearAdminAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Generate a simple auth token
 * In production, use proper session tokens with Supabase Auth
 */
function generateAuthToken(): string {
  const password = process.env[ADMIN_PASSWORD_ENV] || '';
  // Simple hash - in production use proper crypto
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `admin_${Math.abs(hash).toString(36)}`;
}
