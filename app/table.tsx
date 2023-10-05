'use client'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button,
  Card,
  Title,
  Bold
} from '@tremor/react';

import QRCode from 'react-qr-code';
import { Modal , Col, Row} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Image from 'next/image';


interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UsersTable({ users }: { users: User[] | any[] }) {
  const [head, setHead] = useState([]);
  const [show, setShow] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  useEffect(() => {  
    const head = users.shift();
    setHead(head)
  }, [])  
  const handleGeneratePdf = (id: number) => {
    const user = users.find(item => item[4] == id);
    if (user ) { 
      setShow(true);
      const data = {
        id: user[4],
        name: user[0],
        phone: user[1],
        company: user[2],
        email: user[3],
     }
     const query = '?' + new URLSearchParams(data).toString();
     const baseUrl = 'https://frontend-customer-kappa.vercel.app';
     let url = `${baseUrl}/customer${query}`;
     console.log({
      url
     })
     console.log(users)
     setQrUrl(url);
    }
    else {
       console.error('ID khong hop le')
    }
  }
  
  return (
    <>
    <Modal size="lg"  show={show} >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body ><main  className="p-4 md:p-10 mx-auto max-w-4xl">
          <Image alt='test' src='/banner.png' width={1500} height={100} priority={false} />
          <Card className="mx-auto">
            <Image alt='confirmtext' src='/confirm.png' width={500} height={100} className='center'/>
            <Title className="px-auto-2">Kính gửi anh/chị</Title>
            <Text>Xin chân thành cảm ơn quý khách hàng đã đăng ký tham dự sự kiện <Bold>"COLLAB PARTNER CONNECT - CONNECT THE FUTURE"</Bold> do nhà phân phối Collab VietNam tổ chức</Text>
            <Text><Bold>Địa Điểm: </Bold> Victoria Ballroom - Tầng 1, Khách sạn Fortuna, 6B Láng Hạ, Ba Đình, Hà Nội</Text>
            <Text><Bold>Thời gian: </Bold>14:00 ngày 24/10/2023</Text>
            <Text><Bold>Khi đến Quý anh/chị vui lòng mang theo mã QR này để check-in sự kiện.</Bold></Text>
            <Text>Lưu ý: Mã QR được mã hóa cá nhân, vui lòng không chia sẻ với người khác.</Text>
            <Row> 
            < Col md={{ span: 4, offset: 8 }}>
                <QRCode size={150} className='mt-8' value={qrUrl}></QRCode>
              </Col>
            </Row>
            <Text>Ban Tổ chức hân hạnh được đón tiếp</Text>
          </Card>
    </main></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => {
            setShow(false); 
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            console.log('close  ')
          }}>
            Get PDF
          </Button>
        </Modal.Footer>
      </Modal>
      <Table>
      <TableHead>
        <TableRow>
          {head.map((item: string, index: number) => {
            return (  <TableHeaderCell key={index}>{item}</TableHeaderCell>)
          } )}
          <TableHeaderCell>PDF</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {users.map((user: any, index: number) => {
        const data = {
           name: user[0],
           phone: user[1],
           company: user[2],
           email: user[3],
           id: user[4],
        }
        const query = '?' + new URLSearchParams(data).toString();
        let url = `https://frontend-customer-kappa.vercel.app/customer${query}`;
        return (
        <TableRow key={index}>
          {user.map((item: any, index: number) => {
            return <TableCell key={index}>{item}</TableCell>
          })}
          {/* <TableCell>
            <QRCode size={150} value={url}></QRCode>
          </TableCell> */}
          <TableCell>
            <Button onClick={() => handleGeneratePdf(user[4])}>PDF</Button>
          </TableCell>
        </TableRow>)
      })}
      </TableBody>
    </Table>
    </>
    
    
  );
}
