import clsx from 'clsx';
import styles from './Message.module.css';
import { Avatar } from '../Avatar';
import ReactMarkdown from 'react-markdown';

const Message = ({ message, className }) => {
  const fromBot = message.role === 'assistant';
  return (
    <div
      className={clsx(
        styles.root,
        styles.rootAnimate,
        className,
        fromBot ? styles.fromBot : styles.fromUser
      )}
    >
      {fromBot && <div className={styles.model}>{message.chat.model}</div>}
      <div className={['animateShow', styles.wrap]}>
        {/* <p className={styles.content}>{`${message.content}`}</p> */}
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
      {/* <div className={styles.wrap}>
        <time dateTime={String(message.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div> */}
      {!fromBot && (
        <div className={styles.avatar}>
          <Avatar
            size={36}
            url={message.creator.profilePicture}
            username={message.creator.username}
          />
        </div>
      )}
    </div>
  );
};

export default Message;
