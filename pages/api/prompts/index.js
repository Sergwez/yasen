import { findPrompts } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const prompts = await findPrompts(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  res.json(prompts);
});

// handler.post(
//   ...auths,
//   validateBody({
//     type: 'object',
//     properties: {
//       question: ValidateProps.chat.question,
//       prompt: ValidateProps.chat.prompt,
//       model: ValidateProps.chat.model,
//     },
//     required: ['question', 'prompt', 'model'],
//     additionalProperties: false,
//   }),
//   async (req, res) => {
//     if (!req.user) {
//       return res.status(401).end();
//     }

//     const db = await getMongoDb();

//     const chat = await insertChat(db, {
//       content: req.body.content,
//       creatorId: req.user._id,
//     });

//     return res.json({ chat });
//   }
// );

export default handler;
