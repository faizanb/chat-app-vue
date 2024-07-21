import './assets/main.css';

import { createApp } from 'vue';
import socketIO from 'socket.io-client';
import { store } from './store';
import App from './App.vue';
import router from './router';
import roomData from '../public/rooms.json';

//@ts-ignore
const socket = socketIO.connect('http://localhost:4000');
const app = createApp(App);

app.use(router);
app.use(store);
app.provide('$socket', socket);
app.provide('$rooms', roomData);

app.mount('#app');
