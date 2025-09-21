import { GenerativeModel, ChatSession } from '@google/generative-ai';
import { genAI, systemInstruction, getFallbackStream, convertStream } from './geminiServiceCommon';

// Get the Gemini model
const model: GenerativeModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  systemInstruction: systemInstruction,
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  }
});

class GeminiChat {
  private chatSession: ChatSession;

  constructor() {
    this.chatSession = model.startChat();
  }

  async sendMessageStream(params: { message: string }): Promise<AsyncIterable<{ text: string }>> {
    try {
      console.log(`Gemini AI received message: ${params.message}`);

      const result = await this.chatSession.sendMessageStream(params.message);

      return convertStream(result.stream);
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      return getFallbackStream(params.message);
    }
  }
}

class GoogleGenAI {
  chats = {
    create: (config?: any) => {
      console.log('Gemini Chat created with config:', config);
      return new GeminiChat();
    }
  };
}

// Export a singleton instance of the real Gemini AI service
export const ai = new GoogleGenAI();
