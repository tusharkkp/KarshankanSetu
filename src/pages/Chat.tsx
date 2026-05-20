import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Mic, Volume2, VolumeX, Globe, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useSakhi } from "@/hooks/useSakhi";
import { useVoiceInput } from "@/voice/useVoiceInput";
import { useVoiceOutput } from "@/voice/useVoiceOutput";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/auth/AuthContext";
import { logInteraction } from "@/services/interactionLogService";
import { Textarea } from "@/components/ui/textarea";

const Chat = () => {
  const { user } = useAuth();
  const { askSakhi, response, loading, context } = useSakhi();
  const contextReady = !!context;
  const lastResponseRef = useRef<typeof response>(null);

  const [lastQuestion, setLastQuestion] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [feedbackReason, setFeedbackReason] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLogging, setFeedbackLogging] = useState(false);

  const { supported: voiceOutputSupported, enabled: voiceOutputEnabled, setEnabled: setVoiceOutputEnabled, speak } = useVoiceOutput();

  // Speak Sakhi response once per new response (hook cancels ongoing speech before speaking)
  useEffect(() => {
    if (response?.answer) {
      speak(response.answer);
    }
  }, [response]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai" as const,
      text: "നമസ്കാരം! ഞാൻ കൃഷി സഖി ആണ്. നിങ്ങളുടെ കൃഷിയുമായി ബന്ധപ്പെട്ട ചോദ്യങ്ങൾ ചോദിക്കാം. (Hello! I'm Krishi Sakhi. You can ask me any farming-related questions.)",
      timestamp: "10:00 AM",
      language: "ml"
    },
    {
      id: 2,
      type: "user" as const,
      text: "My cardamom plants are showing yellowing leaves. What should I do?",
      timestamp: "10:02 AM",
      language: "en"
    },
    {
      id: 3,
      type: "ai" as const,
      text: "Yellowing leaves in cardamom can indicate several issues. Based on Wayanad's current weather conditions and your soil type, this could be due to:\n\n1. **Overwatering** - Common during monsoon\n2. **Nutrient deficiency** - Particularly nitrogen\n3. **Root rot** - Check for fungal infection\n\nImmediate actions:\n- Reduce watering frequency\n- Apply organic compost\n- Ensure proper drainage\n\nWould you like specific fertilizer recommendations for your 0.1 hectare cardamom patch?",
      timestamp: "10:03 AM",
      language: "en"
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  // Append Sakhi response to messages when it arrives (once per response)
  useEffect(() => {
    if (response && response !== lastResponseRef.current) {
      lastResponseRef.current = response;
      setFeedbackSent(false);
      setFeedbackReason("");
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "ai" as const,
          text: response.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          language: currentLanguage,
          confidence: response.confidence,
        },
      ]);
    }
  }, [response, currentLanguage]);

  // Utility: scroll chat container to bottom
  const scrollContainerToBottom = (smooth: boolean) => {
    const container = chatContainerRef.current;
    if (!container) return;
    const top = container.scrollHeight;
    if ("scrollTo" in container) {
      container.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    } else {
      container.scrollTop = top;
    }
  };

  const onVoiceResult = useCallback(
    (spokenText) => {
      if (!spokenText?.trim()) return;
      setLastQuestion(spokenText.trim());
      setInputMode("voice");
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "user" as const,
          text: spokenText.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          language: currentLanguage,
        },
      ]);
      scrollContainerToBottom(true);
      askSakhi(spokenText.trim());
    },
    [askSakhi, currentLanguage]
  );

  const { supported: voiceSupported, listening: voiceListening, startListening } = useVoiceInput({
    onResult: onVoiceResult,
  });

  // Check if user is at bottom of chat
  const checkIfUserAtBottom = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold
      setIsUserAtBottom(isAtBottom);
      setShowScrollButton(!isAtBottom && scrollHeight > clientHeight);
    }
  };

  // Auto-scroll to bottom when new messages are added (only if user was at bottom)
  useEffect(() => {
    if (isUserAtBottom && messages.length > 0) {
      // Ensure DOM updated before scroll
      requestAnimationFrame(() => {
        scrollContainerToBottom(true);
      });
    }
  }, [messages.length, isUserAtBottom]);

  const quickQuestions = [
    "When to harvest cardamom?",
    "Best fertilizer for black pepper?",
    "Weather forecast for this week",
    "Pest control for coffee plants",
    "Current spice market prices",
    "Organic farming tips"
  ];

  const handleSendMessage = () => {
    const question = inputValue.trim();
    if (!question || loading || !contextReady) return;

    setLastQuestion(question);
    setInputMode("text");
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      language: currentLanguage,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    scrollContainerToBottom(true);
    askSakhi(question);
  };

  const handleFeedbackAction = async (userAction: "Accepted" | "Rejected") => {
    if (!user || !response || feedbackSent || feedbackLogging) return;
    setFeedbackLogging(true);
    try {
      await logInteraction(user.uid, {
        question: lastQuestion,
        sakhiAnswer: response.answer,
        confidence: response.confidence,
        inputMode,
        userAction,
        userReason: feedbackReason.trim() || null,
        contextSignals: response.signalsUsed || [],
      });
      setFeedbackSent(true);
    } finally {
      setFeedbackLogging(false);
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "ml" : "en");
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
  };

  // Scroll to bottom function (button)
  const scrollToBottom = () => {
    scrollContainerToBottom(true);
    setIsUserAtBottom(true);
    setShowScrollButton(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-header">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Chat with Krishi Sakhi</h1>
            <p className="text-muted-foreground">Your AI farming assistant - available in Malayalam and English</p>
            
            {/* API key is now handled by backend */}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">KS</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Krishi Sakhi</CardTitle>
                        <CardDescription>AI Farming Assistant</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={currentLanguage === "en" ? "default" : "secondary"}>
                        {currentLanguage === "en" ? "English" : "മലയാളം"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={toggleLanguage}>
                        <Globe className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={toggleSpeech}>
                        {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 relative chat-scroll-container" 
                  id="chat-scroll-container"
                  onScroll={checkIfUserAtBottom}
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === "user"
                              ? "chat-bubble-user"
                              : "chat-bubble-ai"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          {message.type === "ai" && "confidence" in message && message.confidence != null && (
                            <p className="text-xs opacity-70 mt-1">Confidence: {message.confidence}%</p>
                          )}
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    {/* Invisible div for auto-scrolling */}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Human override: Accept / Reject + optional reason */}
                  {response && user && (
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Was this advice helpful?</p>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFeedbackAction("Accepted")}
                          disabled={feedbackSent || feedbackLogging}
                        >
                          ✅ Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFeedbackAction("Rejected")}
                          disabled={feedbackSent || feedbackLogging}
                        >
                          ❌ Reject
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Tell Sakhi why (optional)"
                        value={feedbackReason}
                        onChange={(e) => setFeedbackReason(e.target.value)}
                        className="min-h-[60px] text-sm"
                        disabled={feedbackSent}
                      />
                      {feedbackSent && (
                        <p className="text-sm text-muted-foreground">Your feedback has been recorded. Thank you!</p>
                      )}
                    </div>
                  )}
                  
                  {/* Scroll to bottom button */}
                  {showScrollButton && (
                    <Button
                      onClick={scrollToBottom}
                      className="scroll-to-bottom-button"
                      size="sm"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  )}
                  {loading && (
                    <p className="text-sm text-muted-foreground px-4 pb-2">Sakhi is thinking…</p>
                  )}
                </CardContent>

                <div className="border-t p-4">
                  {!contextReady && (
                    <p className="text-sm text-muted-foreground mb-2">Preparing context…</p>
                  )}
                  {!voiceSupported && (
                    <p className="text-sm text-muted-foreground mb-2">Voice input is not supported in this browser.</p>
                  )}
                  {voiceOutputSupported ? (
                    <label className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={voiceOutputEnabled}
                        onCheckedChange={(checked) => setVoiceOutputEnabled(!!checked)}
                      />
                      <span>🔊 Voice Output</span>
                    </label>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-2">Voice output is not supported in this browser.</p>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentLanguage === "en" ? "Ask your farming question..." : "നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കൂ..."}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      onFocus={() => {
                        setTimeout(() => scrollContainerToBottom(false), 0);
                      }}
                      className="flex-1"
                      disabled={!contextReady}
                    />
                    <Button
                      variant={voiceListening ? "default" : "outline"}
                      size="sm"
                      onClick={startListening}
                      disabled={!voiceSupported || loading || voiceListening || !contextReady}
                    >
                      {voiceListening ? "Listening…" : "🎤 Speak"}
                    </Button>
                    <Button onClick={handleSendMessage} disabled={loading || !contextReady}>
                      {loading ? (
                        <span className="text-sm">Sakhi is thinking…</span>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Questions</CardTitle>
                  <CardDescription>Tap to ask common farming questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto py-3 px-4"
                      disabled={!contextReady || loading}
                      onClick={() => {
                        if (!contextReady || loading) return;
                        setLastQuestion(question);
                        setInputMode("text");
                        const userMessage = {
                          id: messages.length + 1,
                          type: "user" as const,
                          text: question,
                          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                          language: currentLanguage,
                        };
                        setMessages((prev) => [...prev, userMessage]);
                        scrollContainerToBottom(true);
                        askSakhi(question);
                      }}
                    >
                      <span className="text-sm">{question}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Services</CardTitle>
                  <CardDescription>What Krishi Sakhi can help with</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Crop-specific advice for cardamom, pepper, coffee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Weather-based farming recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Pest and disease identification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Market price updates and trends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Government scheme guidance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;