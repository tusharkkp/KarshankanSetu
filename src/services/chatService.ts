interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  error?: string;
}

class ChatService {
  private backendUrl = '/api/chat';

  constructor() {
    // No longer need API key in frontend - backend handles it securely
  }

  // System prompt is now handled by the backend

  async sendMessage(userMessage: string, conversationHistory: ChatMessage[] = [], language: string = 'en'): Promise<ChatResponse> {
    try {
      const response = await fetch(this.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          messages: conversationHistory,
          language: language
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        message: data.message
      };

    } catch (error) {
      console.error('Chat service error:', error);
      return {
        message: "I'm sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Helper method to convert chat history to OpenAI format
  convertToOpenAIFormat(messages: any[]): ChatMessage[] {
    return messages
      .filter(msg => msg.type === 'user' || msg.type === 'ai')
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
  }
}

export const chatService = new ChatService();
export type { ChatMessage, ChatResponse };
