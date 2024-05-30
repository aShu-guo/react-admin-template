import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CacheEntity, isExpire } from '@common/cache';
import dayjs from 'dayjs';

const CacheKey = 'userinfo';

type State = {
  token: CacheEntity<string>;
  userinfo: Record<string, any> | null;
};

type Actions = {
  setUserInfo: (info: State['userinfo']) => void;
  setToken: (token: string) => void;
  reset: () => void;
};

const genInitialState = (): State => {
  const state = localStorage.getItem(CacheKey);
  const initial: State = {
    token: {
      value: '',
      start: 0,
      expire: 0,
    },
    userinfo: null,
  };
  if (state) {
    const { token, userinfo } = JSON.parse(state).state;
    const isValid = isExpire(token as string);
    initial.token = {
      value: isValid ? '' : token.value,
      start: isValid ? 0 : token.start,
      expire: isValid ? 0 : token.expire,
    };
    initial.userinfo = userinfo;
  }
  return initial;
};

const initialState: State = genInitialState();

const useUserinfoStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        setUserInfo: (userinfo: State['userinfo']) => set(() => ({ userinfo })),
        setToken: (Authorization: string) => {
          const now = dayjs();
          set(() => ({
            token: {
              value: Authorization,
              start: now.valueOf(),
              expire: 7 * 24 * 60 * 60 * 1000, // 默认token有效期为7天
            },
          }));
        },
        reset: () => {
          set(initialState);
        },
      })),
      {
        name: CacheKey,
      },
    ),
  ),
);

export default useUserinfoStore;

type Person = {
  name: string;
  age: number;
};
