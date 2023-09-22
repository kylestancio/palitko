'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { CheckCircle, Loader2, Store, Wallet } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function PaymentContainer({className}:{className?:string}) {

  const { toast } = useToast()

  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>()
  const [paymentCode, setPaymentCode] = useState<string>()

  const [gcashReferenceCode, setGcashReferenceCode] = useState('')

  // const handlePayWithGCash = () => {
  //   setPaymentDone(true)
  //   setPaymentMethod('gcash')
  //   handleCheckout().then(data => setPaymentCode(data.data.referenceCode))
  // }

  // const handlePayInStore = () => {
  //   setPaymentDone(true)
  //   setPaymentMethod('instore')
  //   handleCheckout().then(data => setPaymentCode(data.data.referenceCode))
  // }

  const handleCheckout = async (method:string) => {
    
    setPaymentMethod(method);

    var _referenceCode = null;
    if (method==='gcash'){
      _referenceCode = gcashReferenceCode;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        method: method,
        referenceCode: _referenceCode 
      }),
    }).then(res=>res.json()).then(data => setPaymentCode(data.data.referenceCode))
  }

  if (!paymentDone && !paymentCode){
    return (
      <div className={cn('', className)}>
        <h2 className='text-2xl mb-14'>Payment</h2>
        <div className='flex flex-col gap-3'>
          <div className='p-3 border rounded-lg'>
            <Image src={'/gcash_logo.png'} alt='gcash logo' width={100} height={80} className='mx-auto' quality={10} />
            <div className='relative w-full h-60 rounded-lg overflow-hidden mb-3'>
              <Image src={'/gcash_account.png'} alt={'gcash account'} className='object-cover object-center' fill />
            </div>
            <Label htmlFor='gcashReferenceCode' className='text-sm'>GCash Payment Reference Number</Label>
            <Input type='text' id='gcashReferenceCode' className='mb-3' value={gcashReferenceCode} onChange={e=>setGcashReferenceCode(e.target.value)} />
            <Button className='w-full' onClick={()=>handleCheckout('gcash')}><Wallet className='me-3' />Pay with GCash</Button>
          </div>
          <p className='text-center'> or </p>
          <Button className='w-full' onClick={()=>handleCheckout('instore')}><Store className='me-3' />Pay in store</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      <h2 className='text-2xl mb-14'>Payment</h2>
      <div className='w-full h-72 flex'>
        { !paymentCode && 
          <div className='m-auto'>
            <Loader2 className='mx-auto mb-3 animate-spin' size={50} />
            <p className='text-3xl text-center mb-2'>Generating Payment Information</p>
          </div>
        }

        { paymentCode && 
          <div className='m-auto'>
            <CheckCircle className='mx-auto mb-3 text-green-400' size={50} />
            <p className='text-3xl text-center mb-2'>Payment Information Sent</p>
            { paymentMethod && paymentMethod==='gcash' && 
              <>
                <p className='text-center mb-3'>Your payment has been registered. Please wait for 3 business days to complete the process.</p>
                <p className='text-center'>You can visit our actual store to speed up the process.</p>
              </>
            }

            {paymentMethod && paymentMethod==='instore' && 
              <>
                <p className='text-center mb-10'>Your payment has been registered. You can go to the store to pay by presenting this reference number to the staff.</p>
                <p className='text-center'>Reference Number</p>
                <p className='text-center text-4xl'>{paymentCode}</p>
              </>
            }
          </div>
        }
      </div>
    </div>
  )
}
