import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  paymentId: string
}

export async function POST(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    const payment = await prisma.payment.update({
      where: {
        id: Number(body.paymentId)
      },
      data: {
        status: 'confirmed'
      }
    })

    // TODO: CHECK IF PAYMENT IS ENOUGH TO COVER TRANSACTION COST

    await prisma.transaction.update({
      where: {
        id: Number(payment.transactionId)
      },
      data:{
        status: 'paid'
      }
    })

    return NextResponse.json({status: 'ok', message: 'payment confirmation successful'})

  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}