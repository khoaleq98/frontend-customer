'use client'
import { Card, Title, Text,TextInput,Button } from '@tremor/react';
import axios from 'axios';
import { log } from 'console';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form"


export default async function Info() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()
  const [searchParams]: any = useSearchParams();
  const onSubmit: SubmitHandler<any> = async (data) => {
    data.customerId = searchParams[1];
      await axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info', {
        params: data
      });
    reset()
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title color='red'>Nhập các thông tin khách mời</Title>
      <Card className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register("name")}  className='mt-2' placeholder='Nhap Ten Cua Ban'/>
         <TextInput {...register("phone")} className='mt-2' placeholder='Nhap SDT'/>
         <TextInput {...register("company")} className='mt-2' placeholder='Nhap Cty'/>
         <TextInput {...register("email")} className='mt-2' placeholder='Nhap Email'/>
         <Button className='mt-5' type="submit">Submit</Button>
        </form>
      </Card>
    </main>
  );
}
