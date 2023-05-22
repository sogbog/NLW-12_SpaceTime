import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){

    const baseURL = new URL("/", request.url).href

    return NextResponse.redirect(baseURL, {
        headers:{
           "Set-Cookie": `token=; Path=/; max-age=0` 
        }
    })
}