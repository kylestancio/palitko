import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import prisma from "@/lib/db";

interface IRequestBody{
  productId: string
}

export async function POST(req: NextRequest){
  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;

  const body:IRequestBody = await req.json()

  try{
    const savedList = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        Saved: true
      }
    })

    if (savedList){
      const indexToRemove = savedList.Saved.indexOf(Number(body.productId))
      savedList.Saved.splice(indexToRemove, 1)
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          Saved: {
            set: savedList.Saved
          }
        }
      })
    }


    return NextResponse.json({status: 'ok', message: 'removed product from saved'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}