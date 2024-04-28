import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Home() {
  const didDocs = await sql`SELECT * FROM registry`
  return (
    <div>
      did web registry를 위한 웹
      {didDocs.rows.length}
      <div>주로 route handler를 활용한다</div>
    </div>
  );
}
