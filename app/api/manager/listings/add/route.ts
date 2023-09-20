import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody {
  name: string,
  description: string,
  price: number,
  quantityInStock: number,
}

export async function POST(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        quantityInStock: body.quantityInStock
      }
    })

    return NextResponse.json({status:'ok', message:'create product success'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}