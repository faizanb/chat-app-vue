import { createApp } from 'vue';
import socketIO from 'socket.io-client';

import './assets/main.css';

import { store } from './store';
import App from './App.vue';
import router from './router';
import roomData from './data/rooms.json';

//@ts-ignore
const socket = socketIO.connect(import.meta.env.VITE_SERVER_URL);
const app = createApp(App);

app.use(router);
app.use(store);

app.provide('$socket', socket);
app.provide('$rooms', roomData);

app.mount('#app');
