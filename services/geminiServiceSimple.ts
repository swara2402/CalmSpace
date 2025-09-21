import { genAI, systemInstruction, getFallbackStream, convertStream } from './geminiServiceCommon';

// Get the Gemini model with system instructions
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  systemInstruction: systemInstruction
});

class GeminiChat {
  async sendMessageStream(params: { message: string }): Promise<AsyncIterable<{ text: string }>> {
    try {
      console.log(`Gemini AI received message: ${params.message}`);
      const result = await model.generateContentStream(params.message);
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
