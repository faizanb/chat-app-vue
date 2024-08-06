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
  <div class="bg-white fixed bottom-0 px-4 w-full sm:w-10/12">
    <form class="my-5 flex justify-between w-full" @submit.prevent="sendMessage">
      <div class="w-full">
        <input
          type="text"
          class="w-[95%] sm:w-[99%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700"
          placeholder="Write a message"
          v-model="data.message"
          required
        />
      </div>
      <button
        type="submit"
        class="w-[35%] sm:w-[15%] text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700"
      >
        Send
      </button>
    </form>
  </div>
</template>
