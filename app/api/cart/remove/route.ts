import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/db";

interface IRequestBody{
  id: string
}

export async function DELETE(req: NextRequest){
  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;

  const body:IRequestBody = await req.json()

  try{
    const query = await prisma.cart.delete({
      where: {
        id: Number(body.id),
        userId: Number(user.id)
      },
    })
    return NextResponse.json({status: 'ok', message: 'cart item removed successfully'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}