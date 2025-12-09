import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAuthGithubId: !!process.env.AUTH_GITHUB_ID,
    hasAuthGithubSecret: !!process.env.AUTH_GITHUB_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    authGithubIdLength: process.env.AUTH_GITHUB_ID?.length || 0,
    authGithubSecretLength: process.env.AUTH_GITHUB_SECRET?.length || 0,
    authSecretLength: process.env.AUTH_SECRET?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    // Show first 4 chars only for verification
    authGithubIdStart: process.env.AUTH_GITHUB_ID?.substring(0, 4) || 'NOT SET',
  });
}

