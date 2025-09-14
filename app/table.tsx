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
  Bold,
  TextInput
} from '@tremor/react';

import QRCode from 'react-qr-code';
import { Modal, Col, Row, CardImg, CardBody, CardText } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import InvitationBootstrapPro from './invite-card';
import { m, px } from 'framer-motion';
import { set } from 'react-hook-form';
import html2canvas from 'html2canvas';
import { backgroundImage } from 'html2canvas/dist/types/css/property-descriptors/background-image';
import jsPDF from 'jspdf';


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
  const [qrSize, setQrSize] = useState(67);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState<null | { id: any; name: any; pre_name: any; company: any; level: any }>(null);
  useEffect(() => {
    // // const head = users.shift();
    // setHead(head)
  }, [])
  const componentRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!componentRef.current) {
      console.error('Component reference is null');
      return;
    }
    try {
      const canvas = await html2canvas(componentRef.current, { scale: 1 });
      const dataUrl = canvas.toDataURL('image/png');
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
      console.log("data: ", data)
      const query = '?id=' + data.id;
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
  const style: React.CSSProperties = {
    width: "825px",
    height: "567px",
    position: 'relative',
    overflow: 'hidden',
    padding: 0,
  }

  console.log({ show })
  return (
    <>
      {/* <Modal dialogClassName="custom-modal-size" show={show} className='px-auto' > */}
      <Modal size="xl" show={show} >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin khách mời: <Bold>{selectedUser ? selectedUser : ''}</Bold> </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div ref={componentRef} style={style}>
            <img
              src="/banner-7.png"
              alt="Background"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
            <div className="content-name text-white d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: '105px', width: '450px', position: 'relative', zIndex: 1 }} >
              <p className='custom-name'>{`${user?.pre_name} ${user?.name}`}</p>
              <p className='custom-level d-flex flex-column align-items-center justify-content-center'>
                {`${user?.level}`}
                <br />
                <span>
                  {`${user?.company}`}
                </span>
              </p>

            </div>
            <div className="content-name flex-column align-items-center justify-content-center"
              style={{
                position: 'absolute',
                top: '447px',
                left: '196px',
                padding: 0,
                margin: 0,
                // width: `${qrSize}px`,
                // height: `${qrSize}px`,
                zIndex: 1
              }}
            >
              <QRCode
                size={qrSize}
                value={qrUrl}
                bgColor='transparent'
                fgColor='white'
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </div>

        </Modal.Body >
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShow(false);
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            handleDownload()
          }}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
      <Table>
        <TableHead>
          <TextInput onChange={(e) => setQrSize(Number(e.target.value))} placeholder='qr size' />
          <Button variant="secondary" onClick={() => {
            setShow(false);
          }}>
            Setting
          </Button>
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


