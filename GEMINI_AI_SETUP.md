# Gemini AI Integration Setup Guide

## Overview
CalmSpace now includes real Gemini AI integration for more intelligent and empathetic wellness conversations. This guide will help you set up the AI service.

## Prerequisites
- Node.js and npm installed
- A Google AI Studio account

## Setup Steps

### 1. Install Dependencies
The required package has already been installed:
```bash
npm install @google/generative-ai
```

### 2. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 3. Configure Environment Variables
1. Create a `.env` file in the project root (copy from `.env.example`)
2. Add your API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 4. Choose Your Service Implementation
You have two options for the Gemini service:

#### Option A: Simple Implementation (Recommended)
- File: `services/geminiServiceSimple.ts`
- Uses direct model calls without chat history
- Simpler and more reliable

#### Option B: Advanced Implementation
- File: `services/geminiServiceReal.ts`
- Uses chat sessions with conversation history
- More sophisticated but requires specific API features

### 5. Update the Service Import
In your components, import from the chosen service:
```typescript
// For simple implementation
import { ai } from '../services/geminiServiceSimple';

// For advanced implementation
import { ai } from '../services/geminiServiceReal';
```

## Features

### AI Personality
The Gemini AI is configured with a specific system instruction to act as "CalmSpace" - an empathetic wellness companion designed for Indian youth, with:
- Cultural sensitivity to Indian contexts
- Empathetic, non-judgmental responses
- Focus on mental wellness and emotional support
- Practical coping strategies

### Streaming Responses
The service supports real-time streaming responses, just like the mock version, providing a smooth conversational experience.

### Fallback System
If the API is unavailable or fails, the service automatically falls back to empathetic mock responses to ensure the app continues working.

## Testing
1. Start the development server: `npm run dev`
2. Open the chat interface
3. Send a message to test the AI integration
4. Check the browser console for any API-related logs

## Troubleshooting

### Common Issues:
1. **API Key Not Found**: Make sure your `.env` file is in the project root and contains the correct API key
2. **CORS Issues**: The API key should work fine with the current setup
3. **Rate Limiting**: Gemini AI has rate limits; the fallback system will handle this
4. **Network Issues**: The service will automatically use fallback responses

### Debug Mode:
Check the browser console for logs like:
- "Gemini AI received message: [your message]"
- "Gemini Chat created with config: [config]"
- Any error messages from the API

## API Usage Limits
- Gemini AI has generous free tier limits
- Monitor your usage in Google AI Studio
- Consider upgrading if you need higher limits

## Privacy & Security
- API keys are stored in environment variables (not in code)
- Conversations are not stored permanently
- The AI is configured to maintain confidentiality

## Next Steps
Once set up, you can:
- Customize the AI personality in the system instructions
- Add more sophisticated conversation features
- Integrate with user accounts for personalized experiences
- Add conversation history persistence

## Support
If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is correct
3. Ensure your internet connection is stable
4. Check Google's Gemini AI status page for any service outages
