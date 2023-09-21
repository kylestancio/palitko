import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

interface IRequestBody{
  productId: string,
  quantity: string
}

export async function POST(req: NextRequest){

  const session = await getServerSession(authOptions);
  const user = session ? session.user : null

  const body:IRequestBody = await req.json()

  try{
    await prisma.cart.create({
      data:{
        productId: Number(body.productId),
        userId: user?.id,
        quantity: Number(body.quantity)
      }
    })
    return NextResponse.json({status: 'ok', message: 'product added to cart successfully'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}