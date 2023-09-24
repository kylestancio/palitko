import Link from 'next/link'
import React from 'react'

export default function CategoriesPage() {

  const categoriesList = [
    {link:'/categories/new', name:'New Arrivals'},
    {link:'/categories/anime', name:'Anime'},
    {link:'/categories/apparels', name:'Apparels'},
    {link:'/categories/appliances', name:'Appliances'},
    {link:'/categories/kitchen', name:'Kitchen'},
    {link:'/categories/food', name:'Food'},
    {link:'/categories/tools', name:'Tools'},
  ]

  return (
    <div>
      <div className="container mt-7">
        <section className="mb-7">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-5">Categories</h1>
          </div>
          <div className="grid  lg:grid-cols-4 gap-2">
            { categoriesList.map((category, i)=>(
              <Link key={i} href={category.link}>
                <div className="w-full h-32 lg:h-full flex lg:aspect-square bg-zinc-100 rounded-lg">
                  <p className="m-auto text-3xl font-bold dark:text-zinc-950">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
