import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ViewMoreButton from "./ViewMoreButton";

export default function Home() {

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

      <div className="container">
        <section className="mb-7">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-5">Categories</h1>
            <ViewMoreButton href='/categories' />
          </div>
          <div className="grid grid-cols-6 gap-2">
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
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <div className="w-full col-span-2 row-span-2 bg-zinc-100">
              <p className="text-zinc-950">0</p>
            </div>
            <div className="w-full h-60 bg-zinc-100">
              <p className="text-zinc-950">1</p>
            </div>
            <div className="w-full h-60 bg-zinc-100">
              <p className="text-zinc-950">2</p>
            </div>
            <div className="w-full h-60 bg-zinc-100">
              <p className="text-zinc-950">3</p>
            </div>
            <div className="w-full h-60 bg-zinc-100">
              <p className="text-zinc-950">4</p>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}
