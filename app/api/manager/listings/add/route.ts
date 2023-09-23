import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBody {
  name: string,
  description: string,
  price: number,
  quantityInStock: number,
  image: File
}

export async function POST(req: NextRequest){

  const body = await req.formData()
  const _name: string | null = body.get('name') as unknown as string
  const _description: string | null = body.get('description') as unknown as string
  const _price: number | null = body.get('price') as unknown as number
  const _quantityInStock: number | null = body.get('quantityInStock') as unknown as number
  const _image: File | null = body.get('image') as unknown as File

  // console.log(`IMAGE: ${_image}`)

  try{
    const createdProduct = await prisma.product.create({
      data: {
        name: _name,
        description: _description,
        price: Number(_price),
        quantityInStock: Number(_quantityInStock)
      }
    })

    if (_image){
      // sanitize filename
      const date = new Date()
      var filename = `${
        createdProduct.id}_${ 
          date.toJSON().toString()
            .replaceAll('-', '_')
            .replaceAll(':','_')
            .replaceAll(':','_')
            .replaceAll('.','_')}.`
              .concat('',_image.name.split('.')[_image.name.split('.').length - 1])

      var data = new FormData()
      data.append('file', _image, filename)
      
      const backendPOST = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/upload`, {
        method: 'POST',
        body: data
      }).then(res=>res.json())

      if (backendPOST){
        await prisma.product.update({
          where: {
            id: createdProduct.id
          },
          data: {
            imageLink: filename
          }
        })
      }
    }

    return NextResponse.json({status:'ok', message:'create product success'})
  }catch(err){
    console.error(err);
    return NextResponse.error()
  }
}