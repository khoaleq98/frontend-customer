// app/components/InvitationWithBg.tsx
"use client";
import QRCode from 'react-qr-code';
import React from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import Image from "next/image";

type AgendaItem = { time: string; activity: React.ReactNode };

const agenda: AgendaItem[] = [
  { time: "14:00", activity: "CHECK IN - ĐÓN TIẾP KHÁCH MỜI" },
  {
    time: "14:30",
    activity: "Khai mạc sự kiện – Giới thiệu đại biểu & Tuyên bố lý do",
  },
  {
    time: "14:40",
    activity:
      "Giới thiệu xu hướng hội nghị thông minh và mô hình làm việc từ xa 2025",
  },
  {
    time: "15:00",
    activity: (
      <>
        Ứng dụng Giải pháp Hội nghị thông minh cho Kỷ nguyên số <br />
        Đại diện Bosch - Cisco - Samsung giới thiệu <br />
        <span className="highlight">
          Ademax’s Collaboration Room – Giải pháp công nghệ tích hợp All-In-One
        </span>
      </>
    ),
  },
  { time: "16:00", activity: "Q&A – Mini games" },
  { time: "16:30", activity: "Nghỉ giải lao – Tham quan khu trưng bày sản phẩm" },
  {
    time: "18:00",
    activity: (
      <>
        Khai tiệc Gala dinner – Networking <br />
        Bốc thăm may mắn <br />
        Bế mạc sự kiện
      </>
    ),
  },
];

type InvitationTremorProps = {
  qrCodeUrl: string; // ✅ new prop
};

const InvitationWithBg: React.FC<InvitationTremorProps> = ({ qrCodeUrl }) => {
  return (
    <div className="invite-hero" >
      <div className="overlay">
        <Container fluid="lg" className="py-5 text-light">
          <Row className="g-4">
            <Col lg={7}>
              <Card className="glass p-4 h-100 bg-transparent">
                <Card.Body className="text-center text-white">
                  <div className="letter">THƯ MỜI</div>
                  <div className="mb-2 small text-muted">Trân trọng kính mời</div>

                  <div className="portrait mx-auto mb-3">
                    <Image
                      src="/speakers/nguyen-van-anh.jpg"
                      alt="Ông Nguyễn Văn Ánh"
                      fill
                      className="object"
                    />
                  </div>

                  <h4 className="fw-bold">Ông Nguyễn Văn Ánh</h4>
                  <div className="text-muted mb-3">Tổng giám đốc công ty công nghệ</div>

                  <div className="tagline">
                    HỘI NGHỊ THÔNG MINH <br /> CHO KỶ NGUYÊN SỐ
                  </div>
                  <div className="hybrid">HYBRID CONNECT</div>
                  <div className="year">2025</div>

                  <p className="mt-3">
                    14:00 | 16.09.2025 | Fortuna Hà Nội <br />
                    6B P. Láng Hạ, P. Thành Công, TP. Hà Nội
                  </p>

                  <QRCode size={150} className='mt-8' value={qrCodeUrl}></QRCode>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="glass p-4 h-100">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Agenda</h5>
                    <Badge bg="info">Time</Badge>
                  </div>
                  <Table responsive borderless className="agenda">
                    <thead>
                      <tr>
                        <th style={{ width: 90 }}>Time</th>
                        <th>Activities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agenda.map((a) => (
                        <tr key={a.time}>
                          <td className="fw-bold">{a.time}</td>
                          <td>{a.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <style jsx>{`
        .invite-hero {
          min-height: 100vh;
          background: url("/banner.jpg") no-repeat center center/cover;
          position: relative;
        }
        .overlay {
          background: rgba(10, 18, 60, 0.7); /* overlay mờ để chữ dễ đọc */
          min-height: 100vh;
          padding: 40px 0;
        }
        .glass {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 18px;
        }
        .portrait {
          position: relative;
          width: 128px;
          height: 128px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .portrait .object {
          object-fit: cover;
        }
        .letter {
          font-size: 32px;
          letter-spacing: 0.2rem;
          font-weight: 600;
          color:rgb(255, 255, 255);
        }
        .tagline {
          margin-top: 10px;
          font-size: 14px;
          text-transform: uppercase;
          color: #bcd3ff;
        }
        .hybrid {
          font-size: 38px;
          font-weight: 800;
          color: #eaf2ff;
          text-shadow: 0 0 10px rgba(140, 200, 255, 0.6);
        }
        .year {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.5rem;
          color: #bfe1ff;
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.6);
        }
        .agenda thead th {
          color: #9fb6ff;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
        }
        .agenda tbody td {
          padding: 10px 6px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        }
        .highlight {
          color: #a5b4fc;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default InvitationWithBg;
