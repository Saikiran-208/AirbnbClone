// import { put } from "@vercel/blob";
// import { NextResponse } from "next/server";


// export async function POST(request) {
//     const {searchParams } = new URL(request.url);
//     const filename = searchParams.get("filename");

//     const blob = await put(filename,request.body,{access:"public",allowOverwrite: true})
//     return NextResponse.json(blob);
// }
// import { put } from "@vercel/blob";
// import { NextResponse } from "next/server";
// import { applyCORS } from "@/lib/cors";

// export async function OPTIONS() {
//   // Handle preflight CORS
//   return applyCORS(new NextResponse(null, { status: 204 }));
// }

// export async function POST(request) {
//   const { searchParams } = new URL(request.url);
//   const filename = searchParams.get("filename");

//   const blob = await put(filename, request.body, {
//     access: "public",
//     allowOverwrite: true,
//   });

//   return applyCORS(NextResponse.json(blob));
// }
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const allowedOrigins = ['https://airbnb-clone-kappa-topaz.vercel.app', 'http://localhost:3000'];

export async function OPTIONS(request) {
  const origin = request.headers.get('origin');
  // Simple check: if the origin is in our allowed list, permit it.
  // For development, you might want to allow all:
  const isAllowed = allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development';

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  const blob = await put(filename, request.body, {
    access: "public",
    allowOverwrite: true,
  });

  const res = NextResponse.json(blob);

  const origin = request.headers.get('origin');
  const isAllowed = allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development';

  res.headers.set('Access-Control-Allow-Origin', isAllowed ? origin : allowedOrigins[0]);
  return res;
}
