import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findChatById(db, id) {
  const chats = await db
    .collection('chats')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
  if (!chats[0]) return null;
  return chats[0];
}

export async function findMessages(db, before, by, limit = 10) {
  console.log(before, 'before');
  return db
    .collection('messages')
    .aggregate([
      {
        $match: {
          ...(by && { chatId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      { $sort: { _id: 1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $lookup: {
          from: 'chats',
          localField: 'chatId',
          foreignField: '_id',
          as: 'chat',
        },
      },
      { $unwind: '$chat' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertMessage(db, chatId, { content, creatorId, role }) {
  const message = {
    content,
    role,
    chatId: new ObjectId(chatId),
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('messages').insertOne(message);
  message._id = insertedId;
  return message;
}

// export async function insertChat(db, { content, creatorId }) {
//   const chat = {
//     content,
//     creatorId,
//     createdAt: new Date(),
//   };
//   const { insertedId } = await db.collection('chats').insertOne(chat);
//   chat._id = insertedId;
//   return chat;
// }
