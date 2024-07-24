import { createStore } from 'vuex';
import axios from 'axios';
import cookie from 'vue-cookies';

// define your typings for the store state
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
      axios.post('http://localhost:4000/api/loginUser', payload).then((resp) => {
        //@ts-ignore
        cookie.set('token', resp.data.token, { expires: '1d' });
        context.commit('LOGIN_USER', resp.data.token);
      });
    }
  }
});
