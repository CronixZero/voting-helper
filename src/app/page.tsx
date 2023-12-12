import { redirect } from 'next/navigation';

// There is no Homepage. Redirects to the Candidates Page
export default async function Home() {
  redirect('/candidates');
}