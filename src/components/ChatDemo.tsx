import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mic, Send, Bot, User } from "lucide-react";

const ChatDemo = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Namaste! I'm Krishi Sakhi, your AI farming companion. How can I help you today?",
      time: "Just now"
    },
    {
      type: "user", 
      content: "My cardamom plants are showing yellow leaves. What should I do?",
      time: "Just now"
    },
    {
      type: "ai",
      content: "Yellow leaves in cardamom can indicate several issues. Based on Kerala's current weather patterns, this might be due to excess moisture. Here's what I recommend:\n\n• Improve drainage around plants\n• Reduce watering frequency\n• Apply neem-based fungicide\n• Check for root rot\n\nWould you like me to connect you with the nearest KVK for soil testing?",
      time: "Just now"
    }
  ]);

  const [inputValue, setInputValue] = useState("");

  const demoQueries = [
    "When should I harvest my rubber trees?",
    "Best fertilizer for coconut palms?",
    "Pest control for rice paddy",
    "Weather advisory for next week"
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, {
        type: "user",
        content: inputValue,
        time: "Just now"
      }]);
      setInputValue("");
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: "ai",
          content: "I understand your concern. Let me analyze the current conditions and provide you with personalized recommendations based on your farm profile and local agricultural data.",
          time: "Just now"
        }]);
      }, 1500);
    }
  };

  return (
    <section id="chat" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Talk to Your
              <span className="block text-primary">AI Farming Expert</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ask questions in Malayalam or English. Get instant, personalized advice 
              based on your location, crops, and current conditions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <Card className="chat-container">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Krishi Sakhi</h3>
                  <p className="text-sm text-muted-foreground">AI Farming Assistant</p>
                </div>
                <div className="ml-auto w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Messages */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-primary to-primary-light' 
                          : 'bg-muted'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about your crops, pests, weather..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="icon" variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Quick Questions</h3>
                <div className="space-y-3">
                  {demoQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4 hover:bg-muted"
                      onClick={() => setInputValue(query)}
                    >
                      <MessageCircle className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>{query}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">What Krishi Sakhi Can Help With:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Crop-specific advice for cardamom, rubber, coconut</li>
                  <li>• Pest and disease identification</li>
                  <li>• Weather-based farming recommendations</li>
                  <li>• Market price trends and selling advice</li>
                  <li>• Government scheme eligibility</li>
                  <li>• Organic farming techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;