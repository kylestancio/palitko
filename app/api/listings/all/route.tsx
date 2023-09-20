import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  
  try{
    const res = await prisma.product.findMany({
      // where: {
      //   status: 'approved'
      // }
    })
    return NextResponse.json(res)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}