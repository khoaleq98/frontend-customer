'use client';
import { Card, Title, Text, TextInput, Button, Bold } from '@tremor/react';
import axios from 'axios';
import { log } from 'console';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

export default async function Info() {
  const [submit, setSumit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<any>();
  const searchParams: any = useSearchParams();
  const customer = {
    id: searchParams.get('id'),
    phone: searchParams.get('phone'),
    name: searchParams.get('name'),
    company: searchParams.get('company'),
    email: searchParams.get('email'),
    come: searchParams.get('come')
  };
  const onSubmit: SubmitHandler<any> = (data) => {
    axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info', {
      params: {...customer, password: data.password}
    });
    setSumit(true);
  };
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {!submit ? (
        <>
          <Title color="red">Thông tin khách mời</Title>
          <Card className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="border">
                <img
                  className="img-top"
                  src="https://i.ibb.co/z4pTwvc/download.png"
                />
                <img
                  className="img-bottom"
                  src="https://i.ibb.co/z4pTwvc/download.png"
                />

                <div className="text-content">
                  <p className="fm">
                    Thư mời tới sự kiện Connect to Future
                  </p>
                  <br />
                  <br />
                  <p className="fs">{customer.name}</p>
                  <p className="fs">{customer.company}</p>
                  <p className="fs">{customer.email}</p>
                  <p className="fs">{customer.phone}</p>
                  <br />

                  <br />
                  <p className="fs">Ngày bắt đầu</p>
                  <p className="date">04/10/2023</p>
                  <p className="fs">Sự kiện </p>

                  <p className="fs">..............</p>
                </div>
              </div>
              <TextInput {...register("password")}  className='mt-2' placeholder='Mã tham dự của khách mời'/>
              <Button className="mt-5" type="submit">
                Tham Gia
              </Button>
            </form>
          </Card>
        </>
      ) : (
        <>
          <Title color="red">Cảm ơn sự tham gia của bạn</Title>
        </>
      )}
    </main>
  );
}
