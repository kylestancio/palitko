import Link from 'next/link';
import React from 'react'

export default function CategoryPage({params}:{params:{category:string}}) {

  var _category = "UNSA"

  switch(params.category){
    case 'new':
      _category = "NEW STUFF";
      break;
    case 'anime':
      _category = "ANIME";
      break;
    case 'apparels':
      _category = "APPARELS";
      break;
    case 'appliances':
      _category = "APPLIANCES";
      break;
    case 'kitchen':
      _category = "KITCHEN STUFF";
      break;
    case 'food':
      _category = "FOOD";
      break;
    case 'tools':
      _category = "TOOLS";
      break;
    default:
      _category = "UNSA"
      break;
  }

  return (
    <div>
      <div className="w-full h-96 bg-gray-100 dark:bg-zinc-900 flex mb-28">
        <p className="block m-auto text-5xl ">PALIT KA <span className="font-black">{_category}?</span></p>
      </div>

      <div className="container">
        <section>
          <div className='grid grid-cols-5 gap-2'>
              { [...new Array(20)].map((_, i)=>(
                <Link key={i} href={'/listings/1'}>
                  <div className='w-full h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg'>
                    {/* IMAGE CONTAINER */}
                  </div>
                  <p className='text-2xl font-bold truncate'>Name</p>
                  <p className='text-zinc-500 truncate mb-3'>Category</p>
                  <p>Php 150.00</p>
                </Link>
              ))}
            </div>
        </section>
      </div>
    </div>
  )
}
