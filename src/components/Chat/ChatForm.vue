<script setup lang="ts">
import { inject, reactive, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const socket: any = inject('$socket');
const store = useStore();

const data = reactive({
  message: ''
});

onBeforeUnmount(() => {
  socket.off('notification');
});

const sendMessage = () => {
  if (data.message.trim()) {
    const __createdtime__ = Date.now();
    socket.emit('send_message', {
      message: data.message,
      user: store.state.userName,
      room: store.state.selectedRoom,
      __createdtime__
    });
  }
  data.message = '';
};
</script>

<template>
  <div class="fixed bottom-0 px-4 w-full sm:w-10/12">
    <form class="my-5 flex justify-between w-full" @submit.prevent="sendMessage">
      <div class="w-full">
        <input
          type="text"
          class="w-[95%] sm:w-[99%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write a message"
          v-model="data.message"
          required
        />
      </div>
      <button
        type="submit"
        class="w-[35%] sm:w-[15%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Send
      </button>
    </form>
  </div>
</template>
