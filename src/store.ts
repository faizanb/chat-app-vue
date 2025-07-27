import { createStore } from 'vuex';
import axios from 'axios';
import cookies from 'vue-cookies';

export interface State {
  userName: string | null;
  password: string | null;
  selectedRoom: string | null;
  formClicked: boolean;
  token: any;
  messages: any[];
  onlineUsers: any[];
}

export const store = createStore<State>({
  state: {
    userName: null,
    password: null,
    selectedRoom: null,
    formClicked: false,
    //@ts-ignore
    token: cookies.get('token') || null,
    messages: [],
    onlineUsers: []
  },
  mutations: {
    FORM_CLICKED: (state) => {
      state.formClicked = !state.formClicked;
    },
    LOGIN_USER: (state, token) => {
      state.token = token;
    },
    SET_USERNAME: (state, name) => {
      state.userName = name;
    },
    SET_PASSWORD: (state, password) => {
      state.password = password;
    },
    SET_ROOM: (state, room) => {
      state.selectedRoom = room;
    },
    UPDATE_MESSAGES: (state, message) => {
      state.messages.push({ ...message });
    },
    UPDATE_USERS: (state, data) => {
      if (!data.isExiting) {
        data.usersList.forEach((user: any) => {
          if (!state.onlineUsers.includes(user.name)) {
            if (user.name === data.currentUser) {
              state.onlineUsers.unshift(user.name);
            } else {
              state.onlineUsers.push(user.name);
            }
          }
        });
      } else {
        let userIndex = state.onlineUsers.indexOf(data.exitingUser);
        if (userIndex !== -1) {
          state.onlineUsers.splice(userIndex, 1);
        }
      }
    }
  },
  actions: {
    loginUser(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('FORM_CLICKED');
        axios.post(`${import.meta.env.VITE_API_BASE_PATH}/loginUser`, payload).then((resp) => {
          //@ts-ignore
          cookies.set('token', resp.data.token, '1d');
          context.commit('LOGIN_USER', resp.data.token);
          resolve(true);
        });
      });
    },
    setUserName(context, name) {
      context.commit('SET_USERNAME', name);
    },
    setPassword(context, password) {
      context.commit('SET_PASSWORD', password);
    },
    setSelectedRoom(context, room) {
      context.commit('SET_ROOM', room);
    },
    setMessages(context, message) {
      context.commit('UPDATE_MESSAGES', message);
    },
    updateOnlineUsers(context, data) {
      context.commit('UPDATE_USERS', data);
    }
  }
});
