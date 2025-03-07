import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('OutsideJWT')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  try {
    return NextResponse.json({ authenticated: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

}