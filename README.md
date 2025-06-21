# Chat App Vue

A real-time chat application built with Vue.js.

## Features

- Real-time messaging
- User authentication
- Responsive UI
- Group and private chats

## Tech Stack

- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/) (if used)
- [Socket.io](https://socket.io/) (for real-time communication)
- Backend: Node.js/Express (if applicable)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/chat-app-vue.git
cd chat-app-vue
npm install
```

## Project Structure

```
chat-app-vue/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   └── App.vue
├── package.json
└── README.md
```

## Technologies Used

- Vue 3
- Vuex
- Vue Router
- Tailwind CSS
- Flowbite
- Socket.IO
- Express
- MongoDB + Mongoose
- Cypress
- Vitest

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values::

```
PORT=4000
TOKEN_SECRET=your_key
VITE_SERVER_URL=http://localhost:4000
VITE_API_BASE_PATH=http://localhost:4000/api
```

- Update the MongoDB connection string in `server/db.js` if needed.

### Running the Frontend

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Running the Backend

```bash
npm run start
```

## License

[MIT](LICENSE)
