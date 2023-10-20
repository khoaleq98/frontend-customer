'use client';
import { Card,  Text, TextInput, Button, Bold, Title,  } from '@tremor/react';
import Image from 'next/image';
import { Row , Col} from 'react-bootstrap';
import QRCode from 'react-qr-code';

export default async function Page() {

  return (  
    <main className="p-4 md:p-10 mx-auto max-w-4xl">
          <Image alt='test' src='/banner.png' width={1500} height={100} priority={false} />
          <Card className="mx-auto">
            <Image alt='confirmtext' src='/confirm.png' width={500} height={100} className='center'/>
            <Title className="px-auto-2">Kính gửi anh/chị</Title>
            <Text>Xin chân thành cảm ơn quý khách hàng đã đăng ký tham dự sự kiện <Bold>"COLLAB PARTNER CONNECT - CONNECT THE FUTURE"</Bold> do nhà phân phối Collab VietNam tổ chức</Text>
            <Text><Bold>Địa Điểm: </Bold> Victoria Ballroom - Tầng 4, Khách sạn Fortuna, 6B Láng Hạ, Ba Đình, Hà Nội</Text>
            <Text><Bold>Thời gian: </Bold>14:00 ngày 24/10/2023</Text>
            <Text><Bold>Khi đến Quý anh/chị vui lòng mang theo mã QR này để check-in sự kiện.</Bold></Text>
            <Text>Lưu ý: Mã QR được mã hóa cá nhân, vui lòng không chia sẻ với người khác.</Text>
            <Row> 
            < Col md={{ span: 4, offset: 8 }}>
                <QRCode size={150} className='mt-8' value={'test12345124'}></QRCode>
              </Col>
            </Row>
            <Text>Ban Tổ chức hân hạnh được đón tiếp</Text>
          </Card>
    </main>
  );
}
