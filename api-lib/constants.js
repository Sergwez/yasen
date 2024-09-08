export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  chat: {
    model: { type: 'string', minLength: 1, maxLength: 280 },
    prompt: { type: 'string', minLength: 1, maxLength: 32000 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 32000 },
    from: { type: 'string', minLength: 1, maxLength: 280 },
    chatId: { type: 'string', minLength: 1, maxLength: 280 },
    model: { type: 'string', minLength: 1, maxLength: 280 },
  },
};
