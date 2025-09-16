 export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as {
      messages: Array<{ role: string; text: string }>;
    };

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Missing messages" }), {
        status: 400,
      });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_ENDPOINT = process.env.GEMINI_ENDPOINT;

    if (!GEMINI_API_KEY || !GEMINI_ENDPOINT) {
      return new Response(
        JSON.stringify({
          error: "Server not configured. Set GEMINI_API_KEY and GEMINI_ENDPOINT.",
        }),
        { status: 500 }
      );
    }

     const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const payload = {
      contents,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    };

    const r = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${r.status} ${errText}` }),
        { status: 500 }
      );
    }

    const data = await r.json();

    const assistantText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return new Response(JSON.stringify({ assistant: assistantText }), {
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || "unknown error" }),
      { status: 500 }
    );
  }
}
