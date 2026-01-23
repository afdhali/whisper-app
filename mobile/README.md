# Whisper - Real-time Chat Application

A modern, real-time chat application built with React Native and Expo, featuring social authentication, live messaging, and typing indicators.

## Features

- **Social Authentication**: Sign in with Google or Apple using Clerk
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Online Status**: See when users are online
- **Typing Indicators**: Know when someone is typing
- **Optimistic Updates**: Messages appear instantly with server confirmation
- **Beautiful UI**: Gradient backgrounds with animated orbs and blur effects
- **Error Tracking**: Integrated Sentry for monitoring and debugging
- **Offline Support**: React Query caching for better UX

## Tech Stack

### Frontend

- **React Native** with Expo
- **Expo Router** for navigation
- **NativeWind** (Tailwind CSS for React Native)
- **TypeScript** for type safety

### Authentication

- **Clerk** - Social authentication (Google, Apple)
- Token-based authentication with secure token caching

### State Management

- **Zustand** - Socket state management
- **TanStack Query (React Query)** - Server state and caching

### Real-time Communication

- **Socket.IO Client** - WebSocket connections for live chat

### Monitoring

- **Sentry** - Error tracking, performance monitoring, and session replay

### UI Components

- **expo-image** - Optimized image loading
- **expo-linear-gradient** - Gradient backgrounds
- **expo-blur** - Blur effects
- **@expo/vector-icons** - Icon library

## Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI
- iOS Simulator (macOS) or Android Studio
- Clerk account for authentication
- Sentry account for monitoring
- Backend server running (Socket.IO and REST API)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend API
API_URL=https://your-api-url.com
SOCKET_SERVER_URL=https://your-socket-server-url.com

# Sentry
SENTRY_DSN=your_sentry_dsn
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd whisper-chat
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables (see above)

4. Start the development server:

```bash
npx expo start
```

5. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Project Structure

```
├── app/
│   ├── (auth)/              # Authentication screens
│   ├── (tabs)/              # Main app tabs
│   ├── _layout.tsx          # Root layout with providers
│   └── new-chat/            # New chat modal
├── components/
│   ├── AnimatedOrb.tsx      # Animated background orbs
│   ├── AuthSync.tsx         # Auth state synchronization
│   └── SocketConnection.tsx # Socket connection handler
├── hooks/
│   ├── useAuth.ts           # Auth API hooks
│   ├── useChats.ts          # Chat management hooks
│   ├── useMessages.ts       # Message fetching hooks
│   ├── useSocialAuth.ts     # Social auth flow
│   └── useUsers.ts          # User data hooks
├── lib/
│   ├── axios.ts             # API client configuration
│   └── socket.ts            # Socket.IO store (Zustand)
└── types/                   # TypeScript type definitions
```

## Key Features Implementation

### Authentication Flow

1. User clicks Google/Apple button on auth screen
2. Clerk handles OAuth flow
3. Session created and token stored securely
4. `AuthSync` component syncs with backend `/auth/callback`
5. User redirected to chat interface

### Real-time Messaging

1. Socket connects on app launch with auth token
2. User joins chat room when opening a conversation
3. Messages sent via `send-message` event
4. Optimistic updates show messages immediately
5. Server confirms and replaces temporary messages
6. React Query cache updated for instant UI refresh

### Socket Events

**Client Emits:**

- `join-chat` - Join a chat room
- `leave-chat` - Leave a chat room
- `send-message` - Send a new message
- `typing` - Notify typing status

**Server Emits:**

- `connect` - Socket connected
- `disconnect` - Socket disconnected
- `online-users` - List of online user IDs
- `user-online` - User came online
- `user-offline` - User went offline
- `new-message` - New message received
- `typing` - User typing status
- `socket-error` - Error occurred

## Error Handling

The app includes comprehensive error handling:

- **API Errors**: Axios interceptors log to Sentry
- **Socket Errors**: Error events logged and displayed
- **Auth Errors**: User-friendly alerts for auth failures
- **Optimistic Updates**: Rollback on message send failure

## Monitoring with Sentry

Sentry is configured to track:

- Application errors and crashes
- API request failures
- Socket connection issues
- Performance metrics
- User session replays (10% sample rate)
- Error session replays (100% sample rate)

## Customization

### Styling

- Modify `tailwind.config.js` for theme colors
- Update gradient colors in `AnimatedOrb` component
- Adjust blur intensity in auth screen

### Features

- Add file/image sharing in message component
- Implement read receipts in socket handler
- Add push notifications for new messages
- Create group chat functionality

## API Integration

The app expects the following backend endpoints:

**Auth:**

- `POST /auth/callback` - Sync user after Clerk auth
- `GET /auth/me` - Get current user

**Chats:**

- `GET /chats` - List user's chats
- `POST /chats/with/:participantId` - Get or create chat

**Messages:**

- `GET /messages/chat/:chatId` - Get chat messages

**Users:**

- `GET /users` - List all users

## Troubleshooting

**Socket not connecting:**

- Verify `SOCKET_SERVER_URL` is correct
- Check backend Socket.IO server is running
- Ensure auth token is valid

**Images not loading:**

- Check asset paths in `require()` statements
- Verify images exist in `assets/images/`

**Auth not working:**

- Verify Clerk publishable key is correct
- Check OAuth credentials in Clerk dashboard
- Ensure redirect URLs are configured

**Build errors:**

- Clear cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo: `npx expo install expo@latest`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:

- Create an issue in the repository
- Check Sentry dashboard for error logs
- Review Socket.IO connection logs

---

Built with ❤️ using React Native and Expo
