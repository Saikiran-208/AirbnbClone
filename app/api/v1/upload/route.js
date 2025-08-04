// import { put } from "@vercel/blob";
// import { NextResponse } from "next/server";


// export async function POST(request) {
//     const {searchParams } = new URL(request.url);
//     const filename = searchParams.get("filename");

//     const blob = await put(filename,request.body,{access:"public",allowOverwrite: true})
//     return NextResponse.json(blob);
// }
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { applyCORS } from "@/lib/cors";

export async function OPTIONS() {
  // Handle preflight CORS
  return applyCORS(new NextResponse(null, { status: 204 }));
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  const blob = await put(filename, request.body, {
    access: "public",
    allowOverwrite: true,
  });

  return applyCORS(NextResponse.json(blob));
}
