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
import { Modal, Col, Row } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import InvitationBootstrapPro from './invite-card';
import { m, px } from 'framer-motion';
import { set } from 'react-hook-form';
import html2canvas from 'html2canvas';


interface User {
  id: string;
  name: string;
  pre_name: string;
  company: string;
  level: string
}

export default function UsersTable({ users }: { users: User[] | any[] }) {
  const [head, setHead] = useState([]);
  const [show, setShow] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState<null | { id: any; name: any; pre_name: any; company: any; level: any }>(null);
  useEffect(() => {
    // // const head = users.shift();
    // setHead(head)
  }, [])
  const componentRef = useRef(null);
  const handleDownload = async () => {
    if (!componentRef.current) {
      console.error('Component reference is null');
      return;
    }
    try {
      const canvas = await html2canvas(componentRef.current);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = user?.pre_name + user?.name + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image:', error);
      alert('Failed to download image.');
    }
  };
  const handleCopy = async () => {
    if (!componentRef.current) {
      console.error('Component reference is null');
      return;
    }
    try {
      const canvas = await html2canvas(componentRef.current);
      const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      } else {
        throw new Error('Failed to create image blob');
      }
    } catch (error) {
      console.error('Failed to copy image:', error);
      alert('Failed to copy image. Please ensure your browser permissions are granted and you are using a supported browser (Chrome/Edge, HTTPS).');
    }
  };
  const handleGeneratePdf = (id: number) => {
    const user = users.find(item => item[4] == id);
    if (user) {
      setSelectedUser(user);
      setShow(true);
      const data = {
        id: user[4],
        pre_name: user[0],
        name: user[1],
        company: user[2],
        level: user[3]
      }
      console.log(user);
      const query = '?id=' + user[4];
      const baseUrl = 'http://app.ademax-event.online';
      let url = `${baseUrl}/customer${query}`;
      console.log(url)
      setQrUrl(url);
      setUser(data)
    }
    else {
      console.error('ID khong hop le')
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `thu moi khach ${selectedUser}`
  });
  const style = {
    backgroundImage: "url('/bg-new.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "1600px",
    height: "1000px",
  }
  return (
    <>
      <Modal dialogClassName="custom-modal-size" show={show} className='px-auto' >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin khách mời: <Bold>{selectedUser ? selectedUser : ''}</Bold> </Modal.Title>
        </Modal.Header>
        <Modal.Body  >
          <main className="p-0 md:p-5 mx-0 max-w-8xl text-white"  ref={componentRef}>
            <Row className='custom-height'>
              <Col lg={3} className="mx-0 d-flex flex-column align-items-center justify-content-center font-size-50">
                {/* <p className='custom-name'  >{`${user?.pre_name} ${user?.name}`}</p>
                <br />
                <p>{`${user?.level} ${user?.company}`}</p> */}
                                <QRCode size={100} value={qrUrl} bgColor='#2253A5' fgColor='white'></QRCode>

              </Col>
            </Row>
            {/* <Row className='custom-height'>
              <Col lg={7} className="mx-0 d-flex flex-column align-items-center justify-content-center font-size-50">
                <QRCode size={100} value={qrUrl} bgColor='#2253A5' fgColor='white'></QRCode>

              </Col>
            </Row> */}
          </main>
        </Modal.Body >
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShow(false);
          }}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => {
            handlePrint()
          }}>
            Get PDF
          </Button> */}

          <Button variant="primary" onClick={() => {
            handleDownload()
          }}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
      <Table>
        <TableHead>
          {/* <TableRow>
            {head.map((item: string, index: number) => {
              return (<TableHeaderCell key={index}>{item}</TableHeaderCell>)
            })}
            <TableHeaderCell>PDF</TableHeaderCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {users.map((user: any, index: number) => {
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


