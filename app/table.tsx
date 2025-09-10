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
  const [qrSize, setQrSize] = useState(120);
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
  const style = {
    backgroundImage: "url('/bg-new4.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "825.83px",
    height: "567.69px",
  }

  console.log({ show })
  return (
    <>
      {/* <Modal dialogClassName="custom-modal-size" show={show} className='px-auto' > */}
      <Modal size="sm" show={show} className='px-auto d-flex flex-column align-items-center justify-content-center' >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin khách mời: <Bold>{selectedUser ? selectedUser : ''}</Bold> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
          className='py-2'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
            }} >
            <div ref={componentRef}  className="p-0 md:p-0 mx-0 max-w-8xl text-white" style={{
              backgroundColor: '#2857a3 !important',
            }}  >
              <div>
              <QRCode style={{padding: '2px 3px 3px 2px'}} ref={componentRef}  size={qrSize} value={qrUrl} bgColor='white' fgColor='black'></QRCode>
              <div className='d-flex flex-column align-items-center justify-content-center'></div>
              {/* <Bold className='text-black text-center'> <p>MÃ</p> <p>CHECK IN</p></Bold> */}
              </div>
              {/* <div className='custom-div'>
                <div>
                  <p className='custom-name'  >{`${user?.pre_name} ${user?.name}`}</p>
                  <br />
                  <p className='custom-level'>{`${user?.level} ${user?.company}`}</p>
                </div>
              </div> */}

              {/* <Row className='custom-height'>
                <Col lg={6} className="mx-0 d-flex flex-column align-items-center justify-content-center font-size-18">
                  <p className='custom-name'  >{`${user?.pre_name} ${user?.name}`}</p>
                  <br />
                  <p className='custom-level'>{`${user?.level} ${user?.company}`}</p>

                </Col>
              </Row> */}
              {/* <Row className='custom-height-qr'>
                <Col lg={6} className="mx-0">
                  <Card style={{ width: '57px', height: '71px', top: '90px', left: '181px' }}>
                    <CardBody style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}>
                    
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
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
          <TextInput onChange={(e) => setQrSize(Number(e.target.value))} placeholder='qr size'/>
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


