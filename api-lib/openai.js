import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

export async function sendMessage(messages, model) {
  // Non-streaming:
  const completion = await openai.chat.completions.create({
    model,
    messages,
  });
  return completion.choices[0]?.message?.content;

  // Streaming:
  // const stream = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: 'Say this is a test' }],
  //   stream: true,
  // });
  // for await (const part of stream) {
  //   process.stdout.write(part.choices[0]?.delta?.content || '');
  // }
  // process.stdout.write('\n');
}
