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

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title color='red'>Chào mừng đến với sự kiện</Title>
    </main>
  );
}
