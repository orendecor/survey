import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';

export default function Home() {
const id = randomUUID();
  redirect(`/survey/edit/${id}`); 

  return null; 
}
