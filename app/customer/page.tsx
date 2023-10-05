'use client';
import { Card, Title, Text, TextInput, Button, Bold } from '@tremor/react';
import axios from 'axios';
import { log } from 'console';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';

export default async function Info() {
  const [submit, setSumit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<any>();
  const searchParams: any = useSearchParams();
  console.log({searchParams})
  const customer = {
    id: searchParams.get('id'),
    phone: searchParams.get('phone'),
    name: searchParams.get('name'),
    company: searchParams.get('company'),
    email: searchParams.get('email'),
    come: searchParams.get('come')
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info', {
        params: {id: searchParams.get('id'), password: data.password}
      });
      setSubmitSuccess(true);
      setSumit(true);
    }catch(e) {
      setSubmitSuccess(false);
    }
  };
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {!submit ? (
        <>
        <main className="p-4 md:p-10 mx-auto max-w-4xl">
          <Image alt='test' src='/banner.png' width={1500} height={100} priority={false} />
          <Card className="mx-auto">
            <Image alt='confirmtext' src='/confirm.png' width={500} height={100} className='center'/>
            <Text><Bold>Qúy khách hàng: </Bold> {customer.name} </Text>
            <Text><Bold>Công ty: </Bold>{customer.company}</Text>
            <Text><Bold>SĐT: </Bold>{customer.phone}</Text>
            <Text><Bold>Email: </Bold>{customer.email}</Text>
            <Text>Ban Tổ chức hân hạnh được đón tiếp!</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput {...register("password")}  className='mt-2' placeholder='Nhân viên nhập mã tham dự'/>
            <Button className="mt-5" type="submit">
                Tham Gia (Dành cho nhân viên)
              </Button>
            </form>
          </Card>
          </main>
        </>
      ) : (
        <>
          {submitSuccess ?  <Title color="red">Cảm ơn sự tham gia của bạn</Title>: <>Mã khách hàng không đúng</>} 
        </>
      )}
    </main>
  );
}
