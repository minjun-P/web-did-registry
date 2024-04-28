import { sql } from "@vercel/postgres";

// did resolver 역할을 한다.
export async function GET(
  request: Request,
  { params }: { params: { did: string } }
) {
  console.log(params.did);
  const query = await sql`SELECT * FROM registry WHERE did=${params.did}`;
  const rows = query.rows;
  if (rows.length===0) {
    return new Response(null, {status:204})
  }
  return Response.json(query.rows[0].did_doc, {
    status:200
  });
}

export async function POST(
  request: Request,
  { params } : { params : {did : string}}
) {
  const reqBody = await request.json();
  const docHasDid = reqBody.did;
  const did = params.did;
  if (!docHasDid) {
    return Response.json({
        msg : "body에 did 정보가 존재하지 않습니다."
      },
      {status : 400}
    )
  }
  if (reqBody.did !== did) {
    return Response.json({
      msg : "path의 did와 did doc 안의 did가 일치하지 않습니다",
      detail : {
        didInPath : did,
        didInDoc : reqBody.did
      }
    },
    {status : 400}
    )
  }
  const now = new Date();
  try {
    await sql`INSERT INTO registry (did, did_doc, created_dt, updated_dt)
      VALUES (${did}, ${reqBody}, ${now.toISOString()}, ${now.toISOString()});`;
  } catch(error) {
    return new Response("something wrong",{status:400})
  }
  return new Response(null,{status:200})
}