'use client';
import { Card, Title, Text, TextInput, Button, Bold } from '@tremor/react';
import axios from 'axios';
import { log } from 'console';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Col, Modal, Row, Spinner } from 'react-bootstrap';

async function submitData(id: any, password: string) {
  const res = await axios.get('https://vercel-nodejs-six.vercel.app/api/customer-info', {
    params: { id, password }
  });
  return res.data;
}

async function getData(id: any) {
  const res = await axios.get('http://34.142.208.124:8080/api/sheet-qr/detail?id=' + id);
  return res.data;
}

export default async function Info() {
  const [loading, setLoading] = useState(true)
  const searchParams: any = useSearchParams();
  const [customerData, setCustomerData] = useState<null | { id: any; name: any; pre_name: any; company: any; level: any }>(null);


  const [submit, setSumit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://34.142.208.124:8080/api/sheet-qr/detail?id=' + searchParams.get('id'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("data", jsonData)
        setCustomerData(jsonData.customer);
      } catch (err) {
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  
  // const customerData = await getData(searchParams.get('id'))
  // console.log(customerData.customer)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>();
 
  const customer = customerData
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await submitData(searchParams.get('id'), data.password)
      setSubmitSuccess(true);
      setSumit(true);
      setShow(true);
    } catch (e) {
      setSubmitSuccess(false);
    }
  };
  return (
    <main className="mx-auto max-w-7xl">
      {loading ? <><Row><Col lg={12} className='mx-0 d-flex flex-column align-items-center justify-content-center font-size-50'><Spinner color='blue'> </Spinner></Col></Row></> : <><Modal size="lg" show={show} >
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
              <Image alt='test' src='/banner-2025.png' width={1500} height={100} priority={false} />
              <Card className="mx-auto">
                <Image alt='confirmtext' src='/confirm.png' width={500} height={100} className='center' />
                <Text><Bold>Qúy khách hàng: </Bold> {`${customer?.pre_name} ${customer?.name} ${customer?.level} ${customer?.company}`} </Text>
                <Text>Ban Tổ chức hân hạnh được đón tiếp!</Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInput {...register("password")} className='mt-2' placeholder='Nhân viên nhập mã tham dự' />
                  <Button className="mt-5" type="submit">
                    Tham Gia (Dành cho nhân viên)
                  </Button>
                </form>
              </Card>
            </main>
          </>
        ) : (
          <>
            {submitSuccess ? <Title color="red">Cảm ơn sự tham gia của bạn</Title> : <>Mã khách hàng không đúng</>}
          </>
        )}</>}

    </main>
  );
}
