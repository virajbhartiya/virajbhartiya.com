import { fetchContributions } from "@/lib/github";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const data = await fetchContributions("virajbhartiya");
  return NextResponse.json(data);
}
