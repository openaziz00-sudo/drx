import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, Loader2, Bot, User as UserIcon, Home, MessageSquare } from 'lucide-react';

export default function ChatPageNew() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4.1-mini');
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    if (conversationId && token) {
      loadConversation();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/conversations/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load conversation');
      }

      const data = await response.json();
      setMessages(data.conversation.messages);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const saveMessage = async (role, content, model = null, tokens = null) => {
    if (!conversationId || !user) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          content,
          model,
          tokens,
        }),
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);

    // Save user message
    if (conversationId && user) {
      await saveMessage('user', userMessage.content);
    }

    abortControllerRef.current = new AbortController();

    try {
      // Determine API endpoint based on model
      const endpoint = selectedModel.includes('deepseek')
        ? 'http://localhost:5000/api/chat/deepseek'
        : 'http://localhost:5000/api/chat';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          model: selectedModel,
          stream: true,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('فشل في الحصول على الرد');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                setCurrentStreamingMessage(accumulatedContent);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }

      const assistantMessage = {
        role: 'assistant',
        content: accumulatedContent,
        model: selectedModel,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentStreamingMessage('');

      // Save assistant message
      if (conversationId && user) {
        await saveMessage('assistant', accumulatedContent, selectedModel);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error:', error);
        const errorMessage = {
          role: 'assistant',
          content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentStreamingMessage('');
    navigate('/chat');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-xl font-bold text-primary">Gentle AI</h1>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-1 rounded-md border border-border bg-background text-sm"
              disabled={isLoading}
            >
              <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
              <option value="gpt-4.1-nano">GPT-4.1 Nano</option>
              <option value="deepseek-reasoner">DeepSeek Reasoner</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            {user && (
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <Home className="h-4 w-4 ml-2" />
                لوحة التحكم
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleNewChat}>
              <MessageSquare className="h-4 w-4 ml-2" />
              محادثة جديدة
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && !currentStreamingMessage && (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">مرحباً بك في Gentle AI</h2>
              <p className="text-muted-foreground">
                كيف يمكنني مساعدتك اليوم؟
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                }`}
              >
                <div className="flex items-start space-x-2 space-x-reverse">
                  {message.role === 'assistant' && (
                    <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                  {message.role === 'user' && (
                    <UserIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.model && (
                      <p className="text-xs mt-2 opacity-70">
                        النموذج: {message.model}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}

          {currentStreamingMessage && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 bg-card">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{currentStreamingMessage}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs text-muted-foreground">جاري الكتابة...</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card px-4 py-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex space-x-2 space-x-reverse">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          {!user && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              <a href="/login" className="text-primary hover:underline">
                سجل الدخول
              </a>{' '}
              لحفظ محادثاتك
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
