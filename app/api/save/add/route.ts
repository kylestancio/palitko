import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

interface IRequestBody{
  productId: string,
}

export async function POST(req: NextRequest){

  const session = await getServerSession(authOptions)
  const user = session ? session.user : null

  const body:IRequestBody = await req.json()

  try{
    await prisma.save.create({
      data: {
        userId: Number(user.id),
        productId: Number(body.productId)
      }
    })
    return NextResponse.json({status: 'ok', message: 'product added to saved successfully'})
  }catch(err){
    console.error(err);
    return NextResponse.error();
  }
}