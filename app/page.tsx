export const revalidate = 100; 
import { sql } from "@vercel/postgres";

export default async function Home() {
  const didDocs = await sql`SELECT * FROM registry`
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl font-bold">
        did web registry를 위한 임시 next js
      </h2>
      <div className="border-4 p-2 rounded w-full max-w-[800px] mx-4 flex flex-col gap-4">
        <p className="text-lg font-semibold">주로 route handler를 활용한다</p>
        <div className="border-2 p-2 rounded flex flex-col gap-2">
          <p className="underline decoration-slate-700 underline-offset-4 font-bold text-2xl">GET /did/{"{did}"}</p>
          <p>- did를 단서로 did document를 찾아 리턴한다</p>
        </div>

        <div className="border-2 p-2 rounded flex flex-col gap-2">
          <p className="underline decoration-slate-700 underline-offset-4 font-bold text-2xl">POST /did/{"{did}"}</p>
          <p>- body로 받은 did doc을 그대로 저장하여 등록한다</p>
          <p>- did doc 규격은 링크 참조 : <a className="underline" href="https://www.w3.org/TR/did-core/#example-an-example-of-a-relative-did-url">링크</a></p>
          <p>- 기본적인 validation은 실행함. did_doc.id 와 path에 입력한 did가 같아야 함</p>
        </div>
        
      </div>
      <p>현재 {didDocs.rowCount}개의 did doc이 등록되어 있습니다</p>
    </div>
  );
}
