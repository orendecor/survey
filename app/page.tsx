import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/survey/edit/'); // Redirect to "/survey/edit"

  return null; 
}
