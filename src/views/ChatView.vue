<script setup lang="ts">
import { inject, onMounted, onUpdated, toRaw } from 'vue';
import { initFlowbite } from 'flowbite';
import { useStore } from 'vuex';
import ChatForm from '../components/Chat/ChatForm.vue';
import { dateTimeConvertor } from '../utils/date.utils';

const socket: any = inject('$socket');
const store = useStore();

const { messages, onlineUsers, selectedRoom } = store.state;

onUpdated(() => {
  let scrollableDiv: any = document.getElementById('chat-window');
  //top padding and bottom margin offset added - 80 + 80 - 160px
  window.scrollTo({ top: scrollableDiv.scrollHeight + 80 + 80, left: 0, behavior: 'smooth' });
});

onMounted(() => {
  initFlowbite();
  socket.on('users', (resp: any) => {
    store.dispatch('updateOnlineUsers', {
      usersList: resp.users,
      isExiting: resp.isExiting,
      exitingUser: resp.isExiting ? resp.exitingUser : null,
      currentUser: store.state.userName
    });
  });
  socket.on('notification', (resp: any) => {
    store.dispatch('setMessages', {
      isNotification: true,
      message: resp.message,
      user: 'chat_bot',
      __createdtime__: resp.__createdtime__
    });
  });
  socket.on('receive_message', (resp: any) => {
    store.dispatch('setMessages', {
      isNotification: false,
      message: resp.message,
      user: resp.user,
      __createdtime__: resp.__createdtime__
    });
  });
});

const leaveRoom = () => {
  let { userName, selectedRoom } = store.state;
  socket.emit('leave_room', { user: userName, room: selectedRoom }, () => {
    location.href = '/';
  });
};
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end ms-2 md:me-24">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg me-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <img src="@/assets/chat.png" class="h-8 me-3" alt="Chat Logo" />
          <span
            class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
            >Chat Application</span
          >
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 mb-5 overflow-y-auto bg-white dark:bg-gray-800">
      <span class="ms-3 font-bold tex-lg py-2">{{ selectedRoom?.name }}</span>
      <ul class="font-medium mt-2">
        <li
          v-for="(user, index) in onlineUsers"
          :key="index"
          class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
        >
          <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span class="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span
            >{{ index === 0 ? `${user} (You)` : user }}</span
          >
        </li>
      </ul>
      <button
        type="button"
        class="fixed bottom-0 text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3 mb-5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:border-gray-600 me-2 mb-2"
        @click.prevent="leaveRoom"
      >
        Leave Room
      </button>
    </div>
  </aside>

  <div class="pt-20 sm:ml-64 h-full">
    <div id="chat-window" class="mb-20">
      <div v-for="(messageObj, index) in messages" :key="index">
        <div v-if="messageObj.isNotification" class="text-center px-4 py-3 text-sm">
          {{
            `${messageObj.message} at ${dateTimeConvertor(messageObj.__createdtime__, true, true)}`
          }}
        </div>
        <div v-else>
          <div
            v-if="messageObj.user !== store.state.userName"
            class="flex items-start gap-2.5 px-4 pb-2"
          >
            <div class="flex flex-col gap-1 w-fit-content max-w-[320px]">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
                  messageObj.user
                }}</span>
              </div>
              <div
                class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
              >
                <p class="text-sm font-normal text-gray-900 dark:text-white">
                  {{ messageObj.message }}
                </p>
              </div>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{
                dateTimeConvertor(messageObj.__createdtime__)
              }}</span>
            </div>
          </div>
          <div v-else class="flex items-start justify-end gap-2.5 px-4 pb-2">
            <div class="flex flex-col gap-1 w-fit-content max-w-[320px]">
              <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ `You` }}</span>
              </div>
              <div
                class="flex flex-col leading-1.5 p-4 border-emerald-500 bg-emerald-500 rounded-s-xl rounded-ee-xl dark:bg-emerald-500"
              >
                <p class="text-sm font-normal text-white">
                  {{ messageObj.message }}
                </p>
              </div>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{
                dateTimeConvertor(messageObj.__createdtime__)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ChatForm></ChatForm>
  </div>
</template>
