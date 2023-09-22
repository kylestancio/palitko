import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

interface IRequestBody {
  method: 'gcash' | 'instore',
  referenceCode?: string
}

export async function POST(req: NextRequest){

  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;

  const body:IRequestBody = await req.json()

  var errorFlag = false
  var errorMessage = "";

  try{
    // CHECK VALIDITY OF CHECKOUT
    const cartItems = await prisma.cart.findMany({
      where:{
        userId: user.id
      },
      include: {
        product: true
      }
    })

    cartItems.forEach((item) => {
      if (item.quantity > item.product.quantityInStock){
        errorFlag = true;
        errorMessage = "One or more items are out of stock."
      }
    })
    // END CHECK VALIDITY OF CHECKOUT

    if (errorFlag){
      console.error('Something went wrong')
      return NextResponse.json({status: 'error', message: errorMessage})
    }

    const paymentCode = generateCode(6);
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        TransactionProduct: {
          createMany: {
            data: cartItems.map((cartItem)=>{
              return {
                name: cartItem.product.name,
                description: cartItem.product.description,
                price: cartItem.product.price,
                quantity: cartItem.quantity,
              }
            })
          }
        },
        Payment: {
          create: {
            method: body.method,
            code: paymentCode,
            status: 'unconfirmed',
            referenceCode: body.referenceCode,
            amount: cartItems.reduce((a, item)=> a + (item.product.price*item.quantity), 0)
          }
        },
        status: 'unpaid',
      },
      include: {
        Payment: true
      }
    })

    // DECREMENT STOCK QUANTITY
    cartItems.forEach(async (item)=>{
      await prisma.product.update({
        where: {
          id: item.productId
        },
        data: {
          quantityInStock: {
            decrement: item.quantity
          }
        }
      })
    })
    // END DECREMENT STOCK QUANTITY

    // CLEAR ALL CART ITEMS
    await prisma.cart.deleteMany({
      where: {
        userId: user.id
      }
    })
    // END CLEAR ALL CART ITEMS

    return NextResponse.json({status: 'ok', message: 'checkout successful', data: {
      referenceCode: paymentCode
    }})

  }catch(err){
    console.error(err);
    return NextResponse.error();
  }
}

function generateCode(length:number = 5) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}