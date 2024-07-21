import { createStore } from 'vuex';

// define your typings for the store state
export interface State {
  count: number;
}

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
