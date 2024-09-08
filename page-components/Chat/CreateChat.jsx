import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import {
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  ButtonGroup,
  Button,
} from '@mui/material';
import styles from './CreateChat.module.css';
import toast from 'react-hot-toast';
import { fetcher } from '@/lib/fetch';
import { usePromptPages, useChatPages } from '@/lib/chats';

const CreateChat = ({ triggerButton }) => {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const { data } = usePromptPages();
  const { mutate } = useChatPages();
  const prompts = data?.[0] ? data[0] : [];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const models = [
    'gpt-4o',
    'gpt-4o-2024-05-13',
    'gpt-4o-mini',
    'gpt-4o-mini-2024-07-18',
    'gpt-4-turbo',
    'gpt-4-turbo-2024-04-09',
    'gpt-4-0125-preview',
    'gpt-4-turbo-preview',
    'gpt-4-1106-preview',
    'gpt-4-vision-preview',
    'gpt-4',
    'gpt-4-0314',
    'gpt-4-0613',
    'gpt-4-32k',
    'gpt-4-32k-0314',
    'gpt-4-32k-0613',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
    'gpt-3.5-turbo-0301',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-16k-0613',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetcher(`/api/chats/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt,
        }),
      });
      toast.success('Новый чат создан');
      setModel('');
      setPrompt('');
      router.push(`/chat/${response.chat._id}`);
      mutate();
    } catch (e) {
      toast.error(e.message);
    }

    handleClose();
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <div className={styles.Wrapper}>
      {React.cloneElement(triggerButton, { onClick: handleOpen })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={styles.Popup}>
          <Typography variant="h6" id="modal-title">
            Создать новый чат
          </Typography>
          <form onSubmit={handleSubmit} size="small">
            <Select
              className={styles.CreateChatSelect}
              onChange={handleModelChange}
              displayEmpty
              value={model || ''}
              inputProps={{ 'aria-label': 'Without label' }}
              id="crate-chate-change-model"
            >
              {models.map((model, index) => {
                return (
                  <MenuItem value={model} key={index}>
                    {model}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Выберите модель из списка</FormHelperText>

            <Select
              className={styles.CreateChatSelect}
              onChange={handlePromptChange}
              displayEmpty
              value={prompt || ''}
              inputProps={{ 'aria-label': 'Without label' }}
              id="crate-chate-change-model"
            >
              {prompts.map((prompt) => {
                return (
                  <MenuItem value={prompt._id} key={prompt._id}>
                    {prompt.title}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Выберите промпт из списка</FormHelperText>
            <ButtonGroup
              aria-label="Basic button group"
              sx={{ mt: 3, width: '100%' }}
            >
              <Button
                sx={{ ml: 'auto' }}
                onClick={handleOpen}
                type="submit"
                variant="contained"
              >
                Отправить
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateChat;
