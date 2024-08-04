import { createStore } from 'vuex';
import axios from 'axios';
import cookies from 'vue-cookies';

export interface State {
  userName: string | null;
  password: string | null;
  selectedRoom: string | null;
  count: number;
  formClicked: boolean;
  token: any;
}

export const store = createStore<State>({
  state: {
    userName: null,
    password: null,
    selectedRoom: null,
    count: 0,
    formClicked: false,
    //@ts-ignore
    token: cookies.get('token') || null
  },
  mutations: {
    INCREMENT: (state) => {
      state.count++;
    },
    FORM_CLICKED: (state) => {
      state.formClicked = !state.formClicked;
    },
    LOGIN_USER: (state, data) => {
      state.token = data;
    },
    SET_USERNAME: (state, data) => {
      state.userName = data;
    },
    SET_PASSWORD: (state, data) => {
      state.password = data;
    },
    SET_ROOM: (state, data) => {
      state.selectedRoom = data;
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
    }
  }
});
