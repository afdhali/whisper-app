# Whisper App

A real-time chat application built with modern technologies for seamless communication.

## 🚀 Tech Stack

### Backend

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework**: [Express.js](https://expressjs.com/) - Web application framework
- **Database**: [MongoDB](https://www.mongodb.com/) - NoSQL database
- **Real-time**: [Socket.IO](https://socket.io/) - WebSocket library for real-time communication
- **Authentication**: [Clerk](https://clerk.com/) - User authentication and management

### Mobile

- **Framework**: [Expo](https://expo.dev/) - React Native framework
- **Styling**: [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- **Authentication**: [Clerk Expo](https://clerk.com/docs/quickstarts/expo) - Mobile authentication

## 📁 Project Structure

```
whisper-app/
├── backend/          # Backend API (Submodule)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── socket/
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
│
└── mobile/           # Mobile App (Submodule)
    ├── app/
    │   ├── (auth)/
    │   ├── (tabs)/
    │   └── _layout.tsx
    ├── components/
    ├── hooks/
    ├── package.json
    └── tailwind.config.js
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (for MongoDB)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## 📦 Installation

### 1. Clone the Repository

```bash
# Clone with submodules
git clone --recursive https://github.com/afdhali/whisper-app.git
cd whisper-app

# Or if already cloned without submodules
git submodule update --init --recursive
```

### 2. Setup MongoDB with Docker

```bash
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root123 \
  -e MONGO_INITDB_DATABASE=whisper-app-db \
  -p 27017:27017 \
  mongo:latest
```

### 3. Setup Clerk

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Get your API keys from the dashboard

### 4. Backend Setup

```bash
cd backend

# Install dependencies
bun install

# Create .env file
cat > .env << EOL
# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# MongoDB
MONGODB_URI=mongodb://root:root123@localhost:27017/whisper-app-db?authSource=admin

# Server
PORT=3000
NODE_ENV=development
EOL

# Run development server
bun dev
```

Backend will run on `http://localhost:3000`

### 5. Mobile Setup

```bash
cd ../mobile

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# API
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
EOL

# Start Expo development server
npx expo start
```

> **Note**: Replace `192.168.1.100` with your actual local IP address. You can find it by running `ipconfig` (Windows) or `ifconfig` (Mac/Linux).

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
bun dev
```

**Terminal 2 - Mobile:**

```bash
cd mobile
npx expo start
```

Then:

- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app for physical device

### Production Build

**Backend:**

```bash
cd backend
bun run build
bun start
```

**Mobile:**

```bash
cd mobile
# For Android
npx expo build:android

# For iOS
npx expo build:ios
```

## 📱 Features

- ✅ Real-time messaging with Socket.IO
- ✅ User authentication with Clerk
- ✅ One-on-one chat
- ✅ Message history
- ✅ Online status
- ✅ Modern UI with NativeWind
- ✅ TypeScript for type safety

## 🔧 Environment Variables

### Backend (.env)

```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=mongodb://root:root123@localhost:27017/whisper-app-db?authSource=admin
PORT=3000
NODE_ENV=development
```

### Mobile (.env)

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/callback` - Initialize user in database
- `GET /api/auth/me` - Get current user

### Chats

- `GET /api/chats` - Get all chats
- `GET /api/chats/:participantId` - Get or create chat with participant

### Messages

- `GET /api/messages/:chatId` - Get messages for a chat
- `POST /api/messages/:chatId` - Send a message

### Socket.IO Events

- `join-chat` - Join a chat room
- `send-message` - Send a message
- `receive-message` - Receive a message
- `user-typing` - User typing indicator

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
docker ps

# Restart MongoDB container
docker restart mongodb

# Check MongoDB logs
docker logs mongodb
```

### Backend Issues

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install

# Check Bun version
bun --version
```

### Mobile Issues

```bash
# Clear Expo cache
npx expo start -c

# Clear Metro bundler cache
npx react-native start --reset-cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Can't Connect to Backend from Mobile

1. Make sure both devices are on the same WiFi network
2. Check your local IP address
3. Update `EXPO_PUBLIC_API_URL` in mobile `.env`
4. Disable firewall temporarily to test

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Afdhali**

- GitHub: [@afdhali](https://github.com/afdhali)

## 🙏 Acknowledgments

- [Clerk](https://clerk.com/) for authentication
- [Bun](https://bun.sh/) for blazing fast runtime
- [Expo](https://expo.dev/) for amazing mobile development experience
- [Socket.IO](https://socket.io/) for real-time communication

---

**Happy Coding! 🚀**
