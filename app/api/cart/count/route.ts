import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function GET(req: NextRequest){

  const session = await getServerSession(authOptions)
  const user:User = session ? session.user : null;
  try{
    const res = await prisma.cart.count({
      where: {
        userId: user.id
      }
    })
    return NextResponse.json(res)
  }catch(err){
    console.error(err);
    return NextResponse.error();
  }
}