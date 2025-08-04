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

const allowedOrigin = 'https://airbnb-clone-kappa-topaz.vercel.app';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
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
  res.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  return res;
}
