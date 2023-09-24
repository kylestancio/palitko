'use client'

import { Button } from '@/components/ui/button'
import { Payment } from '@prisma/client'
import { Check, Eye, Loader2, MailWarning } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function PaymentsContainer() {

  const [payments, setPayments] = useState<Payment[]>()

  const getData = async () => {
    console.log("TEST")
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manager/payments/all`).then(res=>res.json())
    return data
  }

  const handleConfirm = async (paymentId: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manager/payments/confirm`, {
      method: 'POST',
      body: JSON.stringify({
        paymentId: paymentId
      })
    })

    getData().then(data=>setPayments(data))
  }

  useEffect(()=>{
    getData().then(data=>setPayments(data))
  }, [])

  return (
    <div>
      { !payments && 
        <p><Loader2 className='inline-block me-2 animate-spin' />Loading...</p>
      }

      { payments && payments.length === 0 && 
        <p>No payments found.</p>
      }

      { payments && payments.length > 0 && 
        <>
          <p className='mb-5'>Displaying {payments.length} payment{payments.length>1 && 's'}</p>
          { payments.map(payment=>(
            <div key={payment.id} className='border p-3 flex justify-between gap-3'>
              <div className='grow my-auto'>
                <p>Payment #{payment.id}</p>
                <p>Transaction ID: { payment.transactionId }</p>
                <p>Code: {payment.code}</p>
              </div>
              <div className='my-auto'>
                <p>Php {payment.amount.toFixed(2)}</p>
                {payment.status==='confirmed' && <p className='text-green-400'>Confirmed</p>}
                {payment.status==='unconfirmed' && <p className='text-red-500'>Unconfirmed</p>}
              </div>
              <div className='my-auto flex gap-2'>
                <Button variant={'default'} size={'icon'} disabled={payment.status==='confirmed'} onClick={()=>handleConfirm(payment.id)}><Check /></Button>
                <Button variant={'default'} size={'icon'} disabled={payment.status==='confirmed'}><MailWarning /></Button>
                <Button variant={'default'} size={'icon'}><Eye /></Button>
              </div>
            </div>
          ))}
        </>
      }
    </div>
  )
}
