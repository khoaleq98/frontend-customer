'use client';
import { Card, Title, Text, TextInput, Button, Bold } from '@tremor/react';
import axios from 'axios';
import { log } from 'console';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import { Col, Modal, Row } from 'react-bootstrap';

async function submitData(id: any, password: string) {
  const res = await axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info', {
        params: {id, password}
      });
  return res.data;
}

async function checkSubmitted(id: any) {
  const res = await axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info/check?id='+id);
  return res.data;
}

export default async function Info() {

  const [submit, setSumit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>();
  const searchParams: any = useSearchParams();
  const customer = searchParams ? {
    id: searchParams.get('id'),
    phone: searchParams.get('phone'),
    name: searchParams.get('name'),
    company: searchParams.get('company'),
    email: searchParams.get('email'),
    come: searchParams.get('come')
  }: null;
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await submitData(searchParams.get('id'), data.password)
      setSubmitSuccess(true);
      setSumit(true);
      setShow(true);
    }catch(e) {
      setSubmitSuccess(false);
    }
  };
  return (
    <main className="mx-auto max-w-7xl">
        <Modal size="lg"  show={show} >
        <Modal.Header closeButton>
          Sự kiện
        </Modal.Header>
        <Modal.Body >
        <Text><Title>Checkin thành công</Title></Text>
    </Modal.Body>
    </Modal>
      {!submit ? (
        <>
        <main className="mx-auto max-w-7xl">
          <Image alt='test' src='/banner.png' width={1500} height={100} priority={false} />
          <Card className="mx-auto">
            <Image alt='confirmtext' src='/confirm.png' width={500} height={100} className='center'/>
            <Text><Bold>Qúy khách hàng: </Bold> {customer?.name} </Text>
            <Text><Bold>Công ty: </Bold>{customer?.company}</Text>
            <Text><Bold>SĐT: </Bold>{customer?.phone}</Text>
            <Text><Bold>Email: </Bold>{customer?.email}</Text>
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
