import Link from "next/link";
import ViewMoreButton from "./ViewMoreButton";
import prisma from "@/lib/db";
import Image from "next/image";

export default async function Home() {

  const newArrivals = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const categoriesList = [
    {link:'/categories/anime', name:'Anime'},
    {link:'/categories/apparels', name:'Apparels'},
    {link:'/categories/appliances', name:'Appliances'},
    {link:'/categories/kitchen', name:'Kitchen'},
    {link:'/categories/food', name:'Food'},
    {link:'/categories/tools', name:'Tools'},
  ]

  return (
    <div>
      <div className="w-full h-96 bg-gray-100 dark:bg-zinc-900 flex mb-28">
        <p className="block m-auto text-5xl ">PALIT <span className="font-black">KA?</span></p>
      </div>

      <div className="container mb-60">
        <section className="mb-7">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-5">Categories</h1>
            <ViewMoreButton href='/categories' />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            { categoriesList.map((category, i)=>(
              <Link key={i} href={category.link}>
                <div className="w-full h-full flex aspect-square bg-zinc-100 rounded-lg">
                  <p className="m-auto text-3xl font-bold dark:text-zinc-950">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between">
            <h1 className="text-2xl mb-5">New Arrivals</h1>
            <ViewMoreButton href='/categories/new' />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2">
            <div className="w-full h-72 md:h-auto col-span-2 row-span-2 bg-zinc-100">
              { newArrivals && newArrivals[0] && 
                <Link href={`${process.env.NEXT_PUBLIC_URL}/listings/${newArrivals[0].id}`} className="relative block w-full h-full">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${newArrivals[0].imageLink}`} alt='' className="object-cover object-center" fill />
                </Link>
              }
            </div>
            <div className="w-full h-60 bg-zinc-100">
              { newArrivals && newArrivals[1] && 
                <Link href={`${process.env.NEXT_PUBLIC_URL}/listings/${newArrivals[1].id}`} className="relative block w-full h-full">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${newArrivals[1].imageLink}`} alt='' className="object-cover object-center" fill />
                </Link>
              }
            </div>
            <div className="w-full h-60 bg-zinc-100">
              { newArrivals && newArrivals[1] && 
                <Link href={`${process.env.NEXT_PUBLIC_URL}/listings/${newArrivals[2].id}`} className="relative block w-full h-full">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${newArrivals[2].imageLink}`} alt='' className="object-cover object-center" fill />
                </Link>
              }
            </div>
            <div className="w-full h-60 bg-zinc-100">
              { newArrivals && newArrivals[1] && 
                <Link href={`${process.env.NEXT_PUBLIC_URL}/listings/${newArrivals[3].id}`} className="relative block w-full h-full">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${newArrivals[3].imageLink}`} alt='' className="object-cover object-center" fill />
                </Link>
              }
            </div>
            <div className="w-full h-60 bg-zinc-100">
              { newArrivals && newArrivals[1] && 
                <Link href={`${process.env.NEXT_PUBLIC_URL}/listings/${newArrivals[4].id}`} className="relative block w-full h-full">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${newArrivals[4].imageLink}`} alt='' className="object-cover object-center" fill />
                </Link>
              }
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}
