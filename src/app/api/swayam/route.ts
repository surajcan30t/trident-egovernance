import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface Token {
  accessToken: string;
}
export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  const session = await getSession();
  console.log('Session----------\n', session);
  console.log(' Token-------------\n-----------------\n ', token);

  return NextResponse.json({ message: 'Hello, Next.js!' });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log('API route data', data);
     return NextResponse.json({ message: 'Hello, Next.js!' });
}
