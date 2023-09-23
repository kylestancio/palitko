'use client'

import { cn } from '@/lib/utils';
import { Transaction, TransactionProduct } from '@prisma/client';
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

interface TransactionsWithProducts extends Transaction {
  TransactionProduct: TransactionProduct[]
}

export default function OrdersContainer() {

  const [transactions, setTransactions] = useState<TransactionsWithProducts[]>();

  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/all`).then(res=>res.json())
    return data;
  }

  useEffect(()=>{
    getData().then(data=>setTransactions(data))
  },[])

  return (
    <div>
      { !transactions && 
        <div className='flex gap-3'>
          <Loader2 className='animate-spin' />
          <h3 className='text-md'>Loading...</h3>
        </div>
      }

      { transactions && transactions.length === 0 && 
        <div>
          <h3 className='text-md'>No orders found.</h3>
        </div>
      }

      { transactions && transactions.length > 0 && 
        <div className='mb-5'>
          { transactions.map((transaction) => (
            <div key={transaction.id} className='mb-7'>
              <div className='mb-5'>
                <h3 className='text-2xl'>{new Date(transaction.createdAt).getDay()} {monthName[new Date(transaction.createdAt).getMonth()]} {new Date(transaction.createdAt).getFullYear()}</h3>
                <p>{new Date(transaction.createdAt).getHours()}:{new Date(transaction.createdAt).getMinutes()}</p>
                <p>Transaction Id: {transaction.id}</p>
                <p>Status: &nbsp;
                  { transaction.status==='unpaid' && <span className='text-red-500'>Unpaid</span>}
                  { transaction.status==='paid' && <span className='text-green-500'>Paid</span>}
                </p>
              </div>
              <div>
                { !transaction.TransactionProduct && 
                  <p>No products to see here.</p>
                }

                { transaction.TransactionProduct && transaction.TransactionProduct.map(product=>(
                  <div key={product.id} className='p-3 flex justify-between gap-3 border first:rounded-t-lg last:rounded-b-lg'>
                    <p className='font-bold truncate'>{ product.name }</p>
                    <p>{product.quantity} @ Php {product.price.toFixed(2).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }

    </div>
  )
}
