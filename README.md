# IKaad - KYC Verification Platform

> Lightning Fast KYC Verification for Nigerian Startups and Scale-ups - built efficiently for the Nigerian people.

IKaad is a comprehensive Know Your Customer (KYC) verification platform designed specifically for Nigerian financial institutions, startups, and scale-ups. The platform provides secure identity verification through document validation, liveness detection, and facial recognition.

## 🚀 Features

### Core Functionality

- **Multi-Document Verification**: Support for NIN, International Passport, Driver's License, and Voter's Card
- **Liveness Detection**: Real-time face detection and expression analysis using Face-API.js
- **BVN Verification**: Bank Verification Number validation
- **Secure Authentication**: JWT-based authentication with protected routes for the business side.
- **Mobile-First Design**: Optimized for mobile devices with responsive UI

### Technical Features

- **Face Recognition**: Advanced facial detection and expression analysis
- **Document Upload**: Secure document capture and validation
- **Video Recording**: Liveness test video capture for verification
- **QR Code Generation**: Mobile device redirection via QR codes
- **Session Management**: Secure session handling and data persistence

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: ShadCN
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Modern browser with camera access

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/thekingslee/ikaad-client.git
   cd ikaad
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL= your_api_endpoint_here
   ```

   > Reachout personally for this

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 KYC Verification Stages

1. **Start**: User initiates verification process
2. **Document Selection**: Choose document type (NIN, Passport, etc.)
3. **Liveness Test**:
   - Face detection
   - Smile detection
   - Mouth opening test
4. **Document Upload**: Capture or upload ID document
5. **Form Data**: Enter personal information
6. **BVN Verification**: Validate Bank Verification Number
7. **Completion**: Review results and finish

## 🛠️ Development & Configuration

### Environment Variables

| Variable              | Required |
| --------------------- | -------- |
| `NEXT_PUBLIC_API_URL` | Yes      |

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Production Build

```bash
npm run build
npm run start
```

## 📄 License

This project is proprietary software. All rights reserved.

---
