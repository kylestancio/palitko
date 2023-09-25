import React from 'react'
import CategoriesContainer from './CategoriesContainer';

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
        <CategoriesContainer categories={params.category} />
      </div>
    </div>
  )
}
