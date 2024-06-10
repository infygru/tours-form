import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract the user's IP address from the request headers
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("fastly-client-ip") ||
    request.headers.get("true-client-ip") ||
    request.headers.get("x-client-ip") ||
    request.headers.get("x-cluster-client-ip") ||
    request.headers.get("x-forwarded") ||
    request.headers.get("forwarded-for") ||
    request.headers.get("forwarded") ||
    request.headers.get("via") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-forwarded-host") ||
    request.headers.get("x-forwarded-server") ||
    request.headers.get("x-host") ||
    request.headers.get("x-originating-ip") ||
    request.headers.get("x-proxy-user") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("xremote-ip") ||
    request.headers.get("xremote-addr") ||
    request.headers.get("clientip") ||
    request.headers.get("client-ip") ||
    request.headers.get("clientip") ||
    request.headers.get("client") ||
    request.headers.get("client_address");

  return NextResponse.json({
    ip,
  });
}
