import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { description, tone } = await req.json()

    if (!description || !tone) {
      return NextResponse.json({ error: 'Missing description or tone' }, { status: 400 })
    }

    const prompt = `Write 4 creative Instagram captions about: "${description}" in a ${tone} tone. Number each one.`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ OpenAI API Error:', errorText)
      return NextResponse.json({ error: 'OpenAI API failed' }, { status: 500 })
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || ''

    const captions = text
      .split('\n')
      .map(line => line.replace(/^[-*\d.]+\s*/, '').trim())
      .filter(Boolean)

    return NextResponse.json({ captions })
  } catch (err) {
    console.error('🛑 Server Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
