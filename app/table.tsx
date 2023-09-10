'use client'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

import QRCode from 'react-qr-code';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UsersTable({ users }: { users: User[] | any[] }) {
  const head = users.shift();
  return (
    <Table>
      <TableHead>
        <TableRow>
          {head.map((item: string, index: null) => {
            return (  <TableHeaderCell key={index}>{item}</TableHeaderCell>)
          } )}
          <TableHeaderCell>QR Code</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {users.map((user: any, index: number) => {
        const url = `http://localhost:3000/customer?customerId=${user[4]}`
        return (
        <TableRow key={index}>
          {user.map((item: any, index: number) => {
            return <TableCell key={index}>{item}</TableCell>
          })}
          {/* <TableCell>
            <Text>{user.username}</Text>
          </TableCell>
          <TableCell>
            <Text>{user.email}</Text>
          </TableCell> */}
          <TableCell>
            <QRCode size={150} value={url}></QRCode>
          </TableCell>
        </TableRow>)
      })}
      
      </TableBody>
    </Table>
  );
}
