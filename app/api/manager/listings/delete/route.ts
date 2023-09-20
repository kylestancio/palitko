import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody {
  id: string
}

export async function DELETE(req: NextRequest){

  const body:IRequestBody = await req.json();
  
  try{
    await prisma.product.delete({
      where: {
        id: Number(body.id)
      }
    })
    return NextResponse.json({status: 'ok', message: 'product deletion success'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}