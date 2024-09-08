import { ValidateProps } from '@/api-lib/constants';
import { findPostById, insertMessage } from '@/api-lib/db';
import { findComments, findMessages } from '@/api-lib/db/message';
import { findChatById } from '@/api-lib/db/chat';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { sendMessage } from '@/api-lib/openai';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const post = await findPostById(db, req.query.postId);

  if (!post) {
    return res.status(404).json({ error: { message: 'Post is not found.' } });
  }

  const comments = await findComments(
    db,
    req.query.postId,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ comments });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.comment.content,
      chatId: ValidateProps.comment.chatId,
    },
    required: ['content'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const content = req.body.content;
    console.log(req.body, 'req.body.chatId');
    const chat = await findChatById(db, req.body.chatId);
    console.log(chat, 'chat');
    const comment = await insertMessage(db, req.body.chatId, {
      creatorId: req.user._id,
      content,
      role: 'user',
    });

    //берем всю историю переписки
    const messages = await findMessages(
      db,
      req.query.before ? new Date(req.query.before) : undefined,
      req.body.chatId,
      10000
    );

    const gptMessages = messages.map((mes) => {
      return {
        role: mes.role,
        content: mes.content,
      };
    });
    // console.log(chat.model, 'chat.model')
    await sendMessage(gptMessages, chat.model).then(async (answer) => {
      await insertMessage(db, req.body.chatId, {
        creatorId: req.user._id,
        content: answer,
        role: 'assistant',
      });
    });

    return res.json({ comment });
  }
);

export default handler;
