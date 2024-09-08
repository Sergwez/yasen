import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

// export async function findPromptById(db, id) {
//   const chats = await db
//     .collection('prompts')
//     .aggregate([
//       { $match: { _id: new ObjectId(id) } },
//       { $limit: 1 },
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'creatorId',
//           foreignField: '_id',
//           as: 'creator',
//         },
//       },
//       { $unwind: '$creator' },
//       { $project: dbProjectionUsers('creator.') },
//     ])
//     .toArray();
//   if (!chats[0]) return null;
//   return chats[0];
// }

export async function findPrompts(db, before, by, limit = 10) {
  return db
    .collection('prompts')
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
    ])
    .toArray();
}

// export async function insertChat(db, { content, creatorId }) {
//   const chat = {
//     content,
//     creatorId,
//     createdAt: new Date(),
//   };
//   const { insertedId } = await db.collection('prompts').insertOne(chat);
//   chat._id = insertedId;
//   return chat;
// }
