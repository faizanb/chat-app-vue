import { createStore } from 'vuex';
import axios from 'axios';
import cookies from 'vue-cookies';

export interface State {
  count: number;
  token: any;
}

export const store = createStore<State>({
  state: {
    count: 0,
    token: null
  },
  mutations: {
    increment: (state) => {
      state.count++;
    },
    LOGIN_USER: (state, data) => {
      state.token = data;
    }
  },
  actions: {
    loginUser(context, payload) {
      axios.post(`${import.meta.env.VITE_API_BASE_PATH}/loginUser`, payload).then((resp) => {
        //@ts-ignore
        cookies.set('token', resp.data.token, '1d');
        context.commit('LOGIN_USER', resp.data.token);
      });
    }
  }
});
