'use client'

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
  price: z.coerce.number().gt(0).nonnegative(),
  quantityInStock: z.coerce.number().gt(0).nonnegative(),
  // image: z.instanceof(File)
  image: z.custom<File>().optional()
  // image: z.any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // )
})


export default function AddListingPage() {

  const router = useRouter()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      quantityInStock: 0
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const formData = new FormData();
    formData.set('name', values.name)
    formData.set('description', values.description)
    formData.set('price', values.price.toString())
    formData.set('quantityInStock', values.quantityInStock.toString())

    if (values.image){
      console.log("HAS IMAGE")
      formData.append('image', values.image)
    }else{
      console.log("NO IMAGE FOUND")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manager/listings/add`, {
      method: 'POST',
      body: formData
    })
    router.push(`${process.env.NEXT_PUBLIC_URL}/manager/listings`)
  }

  return (
    <div>
      <div className='container mt-7'>
        <h1 className="text-3xl font-bold mb-5">Add listing</h1>
        <Form {...form}>
          <form name='addProductForm' onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantityInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity in stock</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload image</FormLabel>
                  <FormControl>
                    <Input 
                      type='file' 
                      accept=".jpg, .jpeg, .png"
                      size={10000}
                      onChange={(e)=>field.onChange(e.target.files ? e.target.files[0] : null) } />
                  </FormControl>
                  <FormDescription>
                    Files accepted: .jpg .jpeg .png
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
