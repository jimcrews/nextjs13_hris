import { connectToDB } from '@/utils/database'
import User from '@/models/user';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}