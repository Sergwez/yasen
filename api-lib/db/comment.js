import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from '.';

export async function findComments(db, postId, before, limit = 10) {
  return db
    .collection('comments')
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
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

export async function insertComment(db, chatId, { content, creatorId, from }) {
  const comment = {
    content,
    from,
    chatId: new ObjectId(chatId),
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('messages').insertOne(comment);
  comment._id = insertedId;
  return comment;
}
