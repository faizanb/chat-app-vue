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
PORT=4010
TOKEN_SECRET=your_key
VITE_SERVER_URL=http://localhost:4010
VITE_API_BASE_PATH=http://localhost:4010/api/
MONGO_URL=mongodb://localhost:27017/mydatabase
```

- Update the MongoDB connection string in `server/db.js` if needed.

### Running the Frontend

```bash
npm run build
npm run preview
```

The app will be available at `http://localhost:4173/chatify/`.

### Running the Backend

```bash
npm run start
```

## License

[MIT](LICENSE)
