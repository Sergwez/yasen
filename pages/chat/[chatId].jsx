import { Chat } from '@/page-components/Chat';

export async function getServerSideProps(context) {
  return { props: { chatId: context.params.chatId } };
}

const ChatPage = ({ chatId }) => {
  return (
    <>
      <Chat chatId={chatId} />
    </>
  );
};

export default ChatPage;
