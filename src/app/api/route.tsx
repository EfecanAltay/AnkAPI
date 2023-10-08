import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  console.log("Hello");
  redirect('/login');
}