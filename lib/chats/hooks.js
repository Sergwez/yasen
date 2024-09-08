import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useChatPages({ creatorId, limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.chats.length === 0) return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (creatorId) searchParams.set('by', creatorId);

      if (index !== 0) {
        // using oldest chats createdAt date as cursor
        // We want to fetch chats which has a date that is
        // before (hence the .getTime()) the last chat's createdAt
        const before = new Date(
          new Date(
            previousPageData.chats[previousPageData.chats.length - 1].createdAt
          ).getTime()
        );

        searchParams.set('before', before.toJSON());
      }

      return `/api/chats?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.chats?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}

export function useMessagePages({ chatId, limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.messages.length === 0)
        return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (chatId) searchParams.set('by', chatId);
      console.log(chatId);
      if (index !== 0) {
        // using oldest chats createdAt date as cursor
        // We want to fetch chats which has a date that is
        // before (hence the .getTime()) the last chat's createdAt
        const before = new Date(
          new Date(previousPageData.messages[0].createdAt).getTime()
        );

        searchParams.set('before', before.toJSON());
      }

      return `/api/messages?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 0,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.messages?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}

export function usePromptPages({ limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.messages.length === 0)
        return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (index !== 0) {
        // using oldest chats createdAt date as cursor
        // We want to fetch chats which has a date that is
        // before (hence the .getTime()) the last chat's createdAt
        const before = new Date(
          new Date(previousPageData.messages[0].createdAt).getTime()
        );

        searchParams.set('before', before.toJSON());
      }

      return `/api/prompts?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 0,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.prompts?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
