import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

  const url = new URL(req.url);
  const categories = url.searchParams.get('categories')

  const args:Prisma.ProductFindManyArgs = {}
  
  if (categories){
    args.where = {
      ...args.where,
      categories: {
        hasSome: categories.split(',')
      }
    }
  }
  
  try{
    const res = await prisma.product.findMany(args)
    return NextResponse.json(res)
  }catch(err){
    console.error(err)
    return NextResponse.error()
  }
}