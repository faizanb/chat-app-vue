<script setup lang="ts">
import { inject, reactive, onMounted } from 'vue';
import ChatForm from '../components/Chat/ChatForm.vue';

const socket: any = inject('$socket');
const data: any = reactive({
  messages: []
});

onMounted(() => {
  socket.on('notification', (resp: any) => {
    data.messages.push({
      isNotification: true,
      message: resp.message,
      user: 'chat_bot',
      __createdtime__: resp.__createdtime__
    });
  });
  socket.on('receive_message', (resp: any) => {
    data.messages.push({
      isNotification: false,
      message: resp.message,
      user: resp.user,
      __createdtime__: resp.__createdtime__
    });
  });
});
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end ms-2 md:me-24">
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
    class="fixed top-0 left-0 z-40 w-2/12 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
          <span class="ms-3">Dashboard</span>
        </li>
      </ul>
    </div>
  </aside>

  <div class="pt-20 sm:ml-[16.666667%] h-full w-10/12">
    <div v-for="(messageObj, index) in data.messages" :key="index">
      <div v-if="messageObj.isNotification" class="flex justify-center pb-3 text-sm">
        {{ messageObj.message }}
      </div>
      <div v-else class="flex items-start gap-2.5 px-4 pb-2">
        <div class="flex flex-col gap-1 w-full max-w-[320px]">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
              messageObj.user
            }}</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
          </div>
          <div
            class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
          >
            <p class="text-sm font-normal text-gray-900 dark:text-white">
              {{ messageObj.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <ChatForm></ChatForm>
  </div>
</template>
