export const revalidate = 100; 
import { sql } from "@vercel/postgres";

export default async function Home() {
  const didDocs = await sql`SELECT * FROM registry`
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">
        did web registry를 위한 임시 next js
      </h2>
      <div>주로 route handler를 활용한다</div>
      <p>현재 {didDocs.rowCount}개의 did doc이 등록되어 있습니다</p>
    </div>
  );
}
