// pages/api/systeminfo.js

import { NextResponse } from 'next/server';
import { system } from 'systeminformation';

export async function GET(req:any, res:any) {
  const data = await system();
  console.log(data)
  return new NextResponse(JSON.stringify(data))
}
