import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getTransactionStatus(totalAmountPaid:number, totalCost:number){
  if (totalAmountPaid === totalCost){
    return 'paid'
  }

  if (totalAmountPaid < totalCost){
    return 'insufficient'
  }

  if (totalAmountPaid > totalCost){
    return 'excess'
  }

  return 'unknown'
}