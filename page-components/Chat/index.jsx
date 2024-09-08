import styles from './Chat.module.css';
import Messages from './Messages';
import { NewChat } from '../NewChat';
import { togglePanel } from '../../store/togglePanel';
import { useDispatch, useSelector } from 'react-redux';
import { Close, Forum } from '@mui/icons-material';
import ChatList from '../../page-components/Chat/ChatList';
import clsx from 'clsx';

import { SlidingPanel } from '@/components/SlidingPanel';

export const Chat = ({ chatId }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.panel.isOpen);

  const handleTogglePanel = () => {
    dispatch(togglePanel());
  };
  return (
    <div className={styles.root}>
      <div className={clsx(styles.panel, { [styles.open]: isOpen })}>
        {/* <Close className={styles.panelClose} onClick={handleTogglePanel}/> */}
        <div className={styles.panelContent}>
          <ChatList />
        </div>
      </div>
      <div
        className={clsx(styles.slidingWrapper, { [styles.panelOpen]: isOpen })}
      >
        <SlidingPanel>
          {chatId ? <Messages chatId={chatId}></Messages> : <NewChat />}
        </SlidingPanel>
      </div>
    </div>
  );
};
