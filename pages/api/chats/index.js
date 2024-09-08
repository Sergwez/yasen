import { ValidateProps } from '@/api-lib/constants';
import { findChats, insertChat } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const chats = await findChats(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  res.json({ chats });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      prompt: ValidateProps.chat.prompt,
      model: ValidateProps.chat.model,
    },
    required: ['prompt', 'model'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const chat = await insertChat(db, {
      promptId: req.body.prompt,
      model: req.body.model,
      creatorId: req.user._id,
    });

    return res.json({ chat });
  }
);

export default handler;
