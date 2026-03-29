import { client } from '@/sanity/lib/client';
import AboutSectionClient from './AboutSectionClient';

export default async function AboutSection() {
  const query = `*[_type == "about"][0]{title, body}`;
  const data = await client.fetch(query);

  return (
    <AboutSectionClient
      title={data?.title ?? 'Quiet by Design'}
      body={data?.body ?? ''}
    />
  );
}