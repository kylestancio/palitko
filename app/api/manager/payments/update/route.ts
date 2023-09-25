import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  paymentId: string,
  updatedAmount: string
}

export async function POST(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    await prisma.payment.update({
      where: {
        id: Number(body.paymentId)
      },
      data: {
        amount: Number(body.updatedAmount)
      }
    })
    return NextResponse.json({status: 'ok', message: 'payment updated successfully'})
  }catch(err){
    console.error(err);
    return NextResponse.error();
  }
}