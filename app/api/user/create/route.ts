import prisma from "@/lib/db";
import * as bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody{
  firstName: string,
  lastName: string,
  birthdate: string,
  email: string,
  username: string,
  password: string
}

export async function POST(req: NextRequest){

  const body:IRequestBody = await req.json()

  try{
    await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        role: "admin",
        birthdate: new Date(body.birthdate),
        // birthdate: '2000-01-04T00:00:00.000+0900',
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10)
      }
    })
    return NextResponse.json({status: 'ok', message: 'user creation success'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}