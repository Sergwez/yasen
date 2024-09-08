import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Message } from '@/components/Message';
import { Text } from '@/components/Text';
import { useMessagePages } from '@/lib/chats';
import styles from './ChatList.module.css';
import { useEffect } from 'react';
import clsx from 'clsx';
import Poster from './Poster';

const Messages = ({ chatId }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd, mutate } =
    useMessagePages({ chatId });

  useEffect(() => {
    mutate();
  }, []);

  const messages = data
    ? data.reverse().reduce((acc, val) => [...acc, ...val.messages], [])
    : [];

  return (
    <div className={clsx(styles.messages)}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        <div className={styles.wrapper}>
          <Container
            justifyContent="center"
            style={{ flexDirection: 'column', height: '100%' }}
          >
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {isReachingEnd ? (
                <Text color="secondary">
                  {messages.length ? 'Начало чата' : 'Сообщений еще нет'}
                </Text>
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
              <Spacer axis="vertical" size={3} />
              {messages.map((message) => (
                <div className={styles.wrap} key={message._id}>
                  <Message className={styles.message} message={message} />
                </div>
              ))}
            </div>
            <Poster chatId={chatId} />
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Messages;
