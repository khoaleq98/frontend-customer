import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import UsersTable from './table';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const getData = async () => {
    const res = await axios
      .get("https://vercel-nodejs-six.vercel.app/api/sheet-qr");
    return res.data;
  };
  const {sheetName, rows} = await getData();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title color='red'>Khách mời trong sheet: {sheetName} </Title>
      {/* <Search /> */}
      <Card className="mt-6">
        <UsersTable users={rows} />
      </Card>
    </main>
  );
}
