import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  try{
    const query = await prisma.payment.findMany({
      include: {
        transaction: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json(query);
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}