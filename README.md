# Tatra

Tatra is a live streaming platform similar to Twitch, built with modern web technologies to provide a seamless streaming experience for both content creators and viewers.

## Features

- **Stream Key Integration**: Users can easily stream using their preferred streaming software (e.g., OBS) with a unique stream key.
- **Social Interactions**: Viewers can Follow/Unfollow streamers and Block/Unblock other users.
- **Live Chat**: Real-time chat functionality for viewers to interact during streams.
- **Creator Dashboard**: A comprehensive dashboard for streamers to manage their streams and community.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Next.js API Routes
- **Database**: Prisma with Supabase
- **Streaming**: Livekit
- **Authentication**: Clerk
- **File Uploads**: UploadThing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account
- Livekit account
- Clerk account
- UploadThing account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tatra.git
   cd tatra
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   # Database
   DATABASE_URL=your_supabase_database_url

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

   # UploadThing
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id

   # Livekit
   LIVEKIT_API_SECRET=your_livekit_api_secret
   NEXT_PUBLIC_LIVEKIT_WS_URL=your_livekit_websocket_url

   # Maintenance Mode
   NEXT_PUBLIC_MAINTENANCE_MODE=off # Set to 'on' to enable maintenance mode
   ```

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

We welcome contributions to Tatra! Please read our [Contributing Guide](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.io/)
- [Livekit](https://livekit.io/)
- [Clerk](https://clerk.dev/)
- [UploadThing](https://uploadthing.com/)





