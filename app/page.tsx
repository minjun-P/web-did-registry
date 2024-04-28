export const revalidate = 0; 
import { sql } from "@vercel/postgres";

export default async function Home() {
  const didDocs = await sql`SELECT * FROM registry`
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2 text-black">
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
      <div className="w-full max-w-[600px] mx-4 flex flex-col gap-1 border p-2">
        <h3 className="text-lg font-bold">현재 등록된 did list ({didDocs.rowCount}개)</h3>
        {didDocs.rows.map((e,i) => (
          <div key={i}>
            {e.did}
          </div>
        ))}
      </div>
    </div>
  );
}
