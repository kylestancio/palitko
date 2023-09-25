import prisma from "@/lib/db";
import { getTransactionStatus } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  paymentId: string,
}

export async function POST(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    const payment = await prisma.payment.update({
      where: {
        id: Number(body.paymentId)
      },
      data: {
        status: 'confirmed',
      },
      include: {
        transaction: {
          include: {
            TransactionProduct: true
          }
        }
      }
    })

    // TODO: CHECK IF PAYMENT IS ENOUGH TO COVER TRANSACTION COST
    const payments = await prisma.payment.findMany({
      where: {
        transactionId: payment.transactionId
      },
      select: {
        amount: true
      }
    }).then(data=>data.reduce((a, b)=> a + b.amount, 0))

    const totalCost = payment.transaction!.TransactionProduct!.reduce((a, b)=> a + (b.quantity * b.price), 0)

    await prisma.transaction.update({
      where: {
        id: Number(payment.transactionId)
      },
      data:{
        status: getTransactionStatus(payments, totalCost)
      }
    })

    return NextResponse.json({status: 'ok', message: 'payment confirmation successful'})

  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}