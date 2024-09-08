import styles from './NewChat.module.css';
import { Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateChat from '../Chat/CreateChat';

export const NewChat = () => {
  return (
    <div className={styles.root}>
      <CreateChat
        className={styles.root}
        triggerButton={
          <Paper elevation={0} className={styles.wrapper}>
            <Add sx={{ fontSize: 36 }} />
            <Typography variant="h6" id="modal-title">
              Создать новый чат
            </Typography>
          </Paper>
        }
      ></CreateChat>
    </div>
  );
};
