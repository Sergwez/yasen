import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';
import { Send } from '@mui/icons-material';
import { useMessagePages } from '@/lib/chats';

const PosterInner = ({ user, chatId }) => {
  const contentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMessagePages({ chatId: chatId.chatId });

  const onSubmit = useCallback(async () => {
    try {
      if (!contentRef.current.value.trim()) return; // Проверка на пустое сообщение
      setIsLoading(true);
      await fetcher(`/api/chats/${chatId.chatId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: contentRef.current.value,
          chatId: chatId.chatId,
        }),
      });
      toast.success('Сообщение отправлено');
      contentRef.current.value = '';
      // refresh post lists
      mutate();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [mutate, chatId.chatId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // предотвращает добавление новой строки
        onSubmit();
      }
    },
    [onSubmit]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Очистка обработчика события при размонтировании
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Container className={styles.poster}>
      <Textarea
        ref={contentRef}
        className={styles.input}
        placeholder={`Ваш вопрос, ${user.name}?`}
        ariaLabel={`Ваш вопрос, ${user.name}?`}
      />
      <Button
        icon={true}
        className={styles.posterButton}
        type="secondary"
        loading={isLoading}
        onClick={onSubmit}
      >
        <Send />
      </Button>
    </Container>
  );
};

const Poster = (chatId) => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        {/* <h3 className={styles.heading}>Задайте свой вопрос</h3> */}
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} chatId={chatId} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
