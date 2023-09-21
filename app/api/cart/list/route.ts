import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/db";

export async function GET(req: NextRequest){
  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;

  try{
    const query = await prisma.cart.findMany({
      where: {
        userId: user.id
      },
      include: {
        product: true
      }
    })
    return NextResponse.json(query)
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}