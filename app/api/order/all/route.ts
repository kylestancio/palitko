import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest){

  const session = await getServerSession(authOptions);
  const user = session ? session.user : null;

  try{
    const query = await prisma.transaction.findMany({
      where: {
        userId: user.id
      },
      include: {
        TransactionProduct: true
      },
    })
    return NextResponse.json(query)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}