import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './Post.module.css';
import { Model } from '../Model';
import { Avatar } from '../Avatar';
import { useRouter } from 'next/router';

const Chat = ({ chat, className }) => {
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();
  const { chatId } = router.query;
  useEffect(() => {
    setIsActive(chatId === chat._id);
  }, [chat._id, chatId]);
  const createdAt = new Date(chat.createdAt).getTime();
  const now = Date.now();

  const timestampTxt = useMemo(() => {
    const diff = now - createdAt;
    if (diff < (1 * 60 * 1000) / 10) return 'Только что';
    return `${format(diff, true)} ago`;
  }, [now, createdAt]);
  return (
    <div className={clsx(styles.root, className, isActive && styles.active)}>
      <Container className={styles.creator}>
        <Model size={36} url={chat.creator.profilePicture} model={chat.model} />
        <Container className={styles.vs}>
          <p>VS</p>
        </Container>
        <Container className={styles.meta}>
          <Avatar
            size={36}
            url={chat.creator.profilePicture}
            username={chat.creator.username}
          />
          <p
            className={styles.name}
          >{`${chat.creator.name} (${chat.creator.username})`}</p>
        </Container>
      </Container>
      <div className={styles.wrap}>
        <p className={styles.content}>{`Промпт: ${chat.prompt.title}`}</p>
        <p className={styles.content}>{`Вопрос: ${
          chat.question || 'Диалог не начинался'
        }`}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(chat.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div>
    </div>
  );
};

export default Chat;
