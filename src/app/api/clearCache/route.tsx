import { clearToken } from '@/app/app-actions/cookie-actions';
import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  clearToken();  
  redirect('/');
}