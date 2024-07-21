<script setup lang="ts">
import Header from '../components/Header.vue';
import { inject, reactive } from 'vue';
const rooms: any = inject('$rooms');
const socket: any = inject('$socket');
const data = reactive({
  userName: null,
  password: null,
  selectedRoom: null
});

const loginToChatWindow = () => {
  if (data.userName && data.password && data.selectedRoom) {
    socket.emit('join_room', { ...data }, () => {
      location.href = '/chat';
    });
  }
};
</script>

<template>
  <div class="hd-wrap">
    <Header></Header>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-8 h-8 mr-2" src="@/assets/chat.png" alt="logo" />
          Login to Chat Room
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="space-y-4 md:space-y-6" @submit.prevent="loginToChatWindow">
              <div>
                <label
                  for="user-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >User Name</label
                >
                <input
                  type="text"
                  id="user-name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-400 dark:focus:border-emerald-400"
                  placeholder="Enter Username"
                  v-model="data.userName"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-400 dark:focus:border-emerald-400"
                  v-model="data.password"
                  required
                />
              </div>
              <div>
                <label
                  for="large"
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >Room</label
                >
                <select
                  id="large"
                  class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-400 focus:border-emerald-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-400 dark:focus:border-emerald-400"
                  v-model="data.selectedRoom"
                  required
                >
                  <option :value="null" disabled>Choose a Room</option>
                  <option v-for="room in rooms" :value="room.name" :key="room.id">
                    {{ room.name }}
                  </option>
                </select>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hd-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  .hd-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
