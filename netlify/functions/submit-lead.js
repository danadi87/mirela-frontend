// netlify/functions/submit-lead.js
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, position, company, resourceTitle } = body || {};

  if (
    !name?.trim() ||
    !/\S+@\S+\.\S+/.test(email || "") ||
    !position?.trim() ||
    !company?.trim()
  ) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid fields" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE;
  const token = process.env.AIRTABLE_TOKEN;

  if (!baseId || !table || !token) {
    console.error("Missing Airtable env vars on the Netlify function");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Position: position,
            Company: company,
            Resource: resourceTitle || "",
            Timestamp: new Date().toISOString(),
            Status: "New",
          },
        }),
      },
    );

    if (!airtableRes.ok) {
      const detail = await airtableRes.text();
      console.error("Airtable write failed:", airtableRes.status, detail);
      return new Response(JSON.stringify({ ok: true, logged: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, logged: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Airtable request error:", err);
    return new Response(JSON.stringify({ ok: true, logged: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
