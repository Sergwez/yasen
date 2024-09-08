import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Chat } from '@/components/Chat';
import { Text } from '@/components/Text';
import { useChatPages } from '@/lib/chats';
import Link from 'next/link';
import styles from './ChatList.module.css';
import CreateChat from './CreateChat';

const ChatList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useChatPages();
  const chats = data
    ? data.reduce((acc, val) => [...acc, ...val.chats], [])
    : [];
  return (
    <div className={styles.chatList}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        <div className={styles.newChat}>
          <CreateChat
            triggerButton={<Button>Создать новый чат</Button>}
          ></CreateChat>
        </div>
        <div className={styles.list}>
          {chats.map((chat) => (
            <Link key={chat._id} href={`/chat/${chat._id}`} passHref>
              <div className={styles.wrap}>
                <Chat className={styles.chat} chat={chat} />
              </div>
            </Link>
          ))}

          <Container justifyContent="center">
            {isReachingEnd ? (
              <div>
                <Text color="secondary">Чатов больше нет</Text>
                <Spacer axis="vertical" size={1} />
              </div>
            ) : (
              <Button
                variant="ghost"
                type="success"
                loading={isLoadingMore}
                onClick={() => setSize(size + 1)}
              >
                Load more
              </Button>
            )}
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default ChatList;
