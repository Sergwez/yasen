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

export async function findChats(db, before, by, limit = 10) {
  return db
    .collection('chats')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
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
      {
        $lookup: {
          from: 'prompts',
          localField: 'promptId',
          foreignField: '_id',
          as: 'prompt',
        },
      },
      { $unwind: '$prompt' },
      { $project: dbProjectionUsers('prompt.') },
    ])
    .toArray();
}

export async function insertChat(db, { promptId, model, creatorId }) {
  const chat = {
    promptId: new ObjectId(promptId),
    model,
    creatorId: creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('chats').insertOne(chat);
  chat._id = insertedId;
  return chat;
}
