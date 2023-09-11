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
import { data } from 'autoprefixer';
import { log } from 'console';

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
        const data = {
           name: user[0],
           phone: user[1],
           company: user[2],
           email: user[3],
           id: user[4],
           come: user[5],
        }
        const query = '?' + new URLSearchParams(data).toString();
        let url = `https://frontend-customer-kappa.vercel.app/customer${query}`;
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
