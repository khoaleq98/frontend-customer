'use client'
import { Card, Title, Text,TextInput,Button, Bold } from '@tremor/react';
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
  const searchParams: any = useSearchParams();
  const customer = {
    id: searchParams.get('id'),
    phone: searchParams.get('phone'),
    name: searchParams.get('name'),
    company: searchParams.get('company'),
    email: searchParams.get('email'),
    come: searchParams.get('come'),
  }
  const onSubmit: SubmitHandler<any> = async (data) => {
    data.customerId = searchParams[1];
      await axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info', {
        params: customer
      });
    reset()
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title color='red'>Nhập các thông tin khách mời</Title>
      <Card className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Text className='mt-2'>Tên: <Bold>{customer.name}</Bold></Text>
         <Text className='mt-2'>SDT: <Bold>{customer.phone}</Bold></Text>
         <Text className='mt-2'>Công ty: <Bold>{customer.company}</Bold></Text>
         <Text className='mt-2'>Email: <Bold>{customer.email}</Bold></Text>
         <Text className='mt-2'>Mã Khách Hàng: <Bold>{customer.id}</Bold></Text>
         <Text className='mt-2'>Tham Dự: <Bold>{customer.come}</Bold></Text>
         <Button className='mt-5' type="submit">Submit</Button>
        </form>
      </Card>
    </main>
  );
}
