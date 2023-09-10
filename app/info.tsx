import { Card, Title, Text,TextInput} from '@tremor/react';
import axios from 'axios';
import { usePathname} from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Info() {
  const path = usePathname();
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title color='red'>Vui Long Nhap thong tin </Title>
      {/* <Search /> */}
      <Card className="mt-6">
         <TextInput placeholder='Nhap Ten Cua Ban'/>
         <TextInput placeholder='Nhap Tuoi'/>
         <TextInput placeholder='Nhap SDT'/>
         <TextInput placeholder='Nhap Danh Gia'/>
      </Card>
    </main>
  );
}
