# Whisper Backend - Real-time Chat Server

Backend server for Whisper chat application built with Express.js, Socket.IO, and MongoDB. Powered by Bun for blazing-fast performance.

## Features

- **RESTful API**: Express.js endpoints for user, chat, and message management
- **Real-time Communication**: Socket.IO for instant messaging and presence
- **Authentication**: Clerk integration for secure user authentication
- **MongoDB Database**: Mongoose ODM for data modeling
- **TypeScript**: Full type safety across the codebase
- **Error Handling**: Centralized error handling middleware
- **CORS**: Configured for cross-origin requests from mobile/web clients
- **Fast Runtime**: Uses Bun instead of Node.js for improved performance

## Tech Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Real-time**: Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Language**: TypeScript
- **Validation**: Express middleware

## Prerequisites

- Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- MongoDB instance (local or Atlas)
- Clerk account for authentication

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/whisper
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whisper

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Frontend URLs (for CORS)
FRONTEND_URL=https://your-production-url.com
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd whisper-backend
```

2. Install dependencies with Bun:

```bash
bun install
```

3. Configure environment variables (see above)

4. Start MongoDB (if running locally):

```bash
mongod
```

5. Run the development server:

```bash
bun run dev
```

The server will start on `http://localhost:3000`

## Available Scripts

```bash
# Development mode with hot reload
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Type checking
bun run type-check

# Linting
bun run lint
```

## Project Structure

```
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── controllers/           # Route controllers
│   │   ├── authController.ts
│   │   ├── chatController.ts
│   │   ├── messageController.ts
│   │   └── userController.ts
│   ├── middlewares/           # Custom middlewares
│   │   ├── auth.ts            # Authentication middleware
│   │   └── errorHandler.ts   # Error handling middleware
│   ├── models/                # Mongoose models
│   │   ├── User.ts
│   │   ├── Chat.ts
│   │   └── Message.ts
│   ├── routes/                # API routes
│   │   ├── authRoutes.ts
│   │   ├── chatRoutes.ts
│   │   ├── messageRoutes.ts
│   │   └── userRoutes.ts
│   └── utils/
│       └── socket.ts          # Socket.IO configuration
├── config/
│   └── database.ts            # MongoDB connection
└── index.ts                   # Server entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/callback` - Sync user after Clerk authentication
- `GET /api/auth/me` - Get current authenticated user

### Users

- `GET /api/users` - Get all users (excluding current user)

### Chats

- `GET /api/chats` - Get all chats for current user
- `POST /api/chats/with/:participantId` - Get or create chat with a user

### Messages

- `GET /api/messages/chat/:chatId` - Get all messages in a chat

### Health Check

- `GET /health` - Server health status

## Socket.IO Events

### Client → Server

| Event          | Payload                               | Description          |
| -------------- | ------------------------------------- | -------------------- |
| `join-chat`    | `chatId: string`                      | Join a chat room     |
| `leave-chat`   | `chatId: string`                      | Leave a chat room    |
| `send-message` | `{chatId: string, text: string}`      | Send a message       |
| `typing`       | `{chatId: string, isTyping: boolean}` | Notify typing status |

### Server → Client

| Event          | Payload                                               | Description                   |
| -------------- | ----------------------------------------------------- | ----------------------------- |
| `connect`      | -                                                     | Socket connected successfully |
| `disconnect`   | -                                                     | Socket disconnected           |
| `online-users` | `{userIds: string[]}`                                 | List of online users          |
| `user-online`  | `{userId: string}`                                    | User came online              |
| `user-offline` | `{userId: string}`                                    | User went offline             |
| `new-message`  | `Message`                                             | New message received          |
| `typing`       | `{userId: string, chatId: string, isTyping: boolean}` | User typing status            |
| `socket-error` | `{message: string}`                                   | Error occurred                |

## Database Models

### User

```typescript
{
  clerkId: string,      // Unique Clerk ID
  name: string,         // User display name
  email: string,        // User email
  avatar?: string,      // Avatar URL
  createdAt: Date,
  updatedAt: Date
}
```

### Chat

```typescript
{
  participants: ObjectId[],  // Array of 2 user IDs
  lastMessage?: ObjectId,    // Reference to last message
  lastMessageAt?: Date,      // Timestamp of last message
  createdAt: Date,
  updatedAt: Date
}
```

### Message

```typescript
{
  chat: ObjectId,       // Reference to chat
  sender: ObjectId,     // Reference to user
  text: string,         // Message content
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

1. **Client Authentication**:
   - Client authenticates with Clerk
   - Gets JWT token from Clerk
   - Sends token in Authorization header

2. **Middleware Verification**:
   - `protectRoute` middleware validates token
   - Finds user in database by Clerk ID
   - Attaches `userId` to request object

3. **Socket Authentication**:
   - Client sends token in socket handshake
   - Server verifies token with Clerk
   - Stores user ID in socket data
   - Joins user-specific room

## Real-time Features

### Online Presence

- Users stored in `onlineUsers` Map (userId → socketId)
- Broadcasts online/offline status to all connected clients
- New connections receive current online users list

### Message Delivery

- Messages sent to specific chat rooms
- Also emitted to participants' personal rooms
- Optimistic updates on client, confirmed by server
- Updates chat's `lastMessage` and `lastMessageAt`

### Typing Indicators

- Sent to chat room and other participant's personal room
- Non-critical feature (fails silently)
- Automatically cleared when message is sent

## Error Handling

Centralized error handling with custom middleware:

```typescript
// All errors pass through errorHandler
app.use(errorHandler);

// Controllers use next(error) to pass errors
try {
  // ... code
} catch (error) {
  res.status(500);
  next(error);
}
```

## CORS Configuration

Allowed origins:

- `http://localhost:8081` - Expo mobile development
- `http://localhost:5173` - Vite web development
- Production frontend URL from environment variable

## Performance Optimizations

### Using Bun Runtime

- **Faster startup**: 3x faster than Node.js
- **Lower memory usage**: More efficient memory management
- **Built-in TypeScript**: No need for ts-node
- **Faster package installation**: Uses native code

### Database Optimizations

- Indexed fields for faster queries
- Population only when necessary
- Sorting at database level
- Limited queries (50 users max)

### Socket.IO Optimizations

- Room-based messaging (not broadcasting to all)
- Personal rooms for user-specific events
- In-memory storage for online users
- Efficient event handling

## Development

### Running with Bun

```bash
# Install dependencies
bun install

# Development mode (auto-reload)
bun --watch src/index.ts

# Production mode
bun src/index.ts
```

### Database Setup

**Local MongoDB:**

```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh
```

**MongoDB Atlas:**

1. Create cluster at mongodb.com/cloud/atlas
2. Get connection string
3. Add to `.env` as `MONGODB_URI`

### Testing Socket Connections

Use tools like:

- **Socket.IO Client Tool**: `socket.io-client-tool`
- **Postman**: WebSocket testing
- **wscat**: CLI WebSocket client

Example with wscat:

```bash
bun add -g wscat
wscat -c ws://localhost:3000 \
  --auth "token=your_clerk_token"
```

## Deployment

### Railway / Render / Fly.io

1. Connect GitHub repository
2. Set environment variables
3. Set build command: `bun install`
4. Set start command: `bun run start`

### Docker

```dockerfile
FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "start"]
```

Build and run:

```bash
docker build -t whisper-backend .
docker run -p 3000:3000 --env-file .env whisper-backend
```

## Troubleshooting

**MongoDB connection fails:**

- Verify `MONGODB_URI` is correct
- Check MongoDB service is running
- Ensure IP whitelist (for Atlas)
- Check network connectivity

**Socket authentication fails:**

- Verify `CLERK_SECRET_KEY` is correct
- Check token is being sent from client
- Ensure token is valid and not expired

**CORS errors:**

- Add client URL to `allowedOrigins` array
- Verify frontend URL matches exactly
- Check CORS credentials setting

**Port already in use:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**Bun-specific issues:**

```bash
# Clear Bun cache
rm -rf ~/.bun/install/cache

# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

## Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ JWT token verification on all protected routes
- ✅ CORS configured with specific origins
- ✅ Input validation on all endpoints
- ✅ MongoDB injection prevention (Mongoose)
- ✅ Rate limiting (consider adding)
- ✅ Helmet middleware (consider adding)

## Future Enhancements

- [ ] Rate limiting for API and Socket
- [ ] Message pagination
- [ ] File/image upload support
- [ ] Group chat functionality
- [ ] Message read receipts
- [ ] Message search
- [ ] Push notifications
- [ ] User blocking/reporting
- [ ] Message reactions
- [ ] Voice/video calls

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:

- Create an issue in the repository
- Check MongoDB logs for database errors
- Review Socket.IO connection logs
- Verify Clerk dashboard for auth issues

---

Built with ⚡ using Bun, Express.js, and Socket.IO
