import React, { useState, useRef, useEffect } from 'react'

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('')
  const messagesEndRef = useRef(null)
  const abortControllerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentStreamingMessage])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsStreaming(true)

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'gpt-4.1-mini',
          stream: false
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response from server')
      }

      // Non-streaming response
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Add assistant message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content
      }])

      setIsStreaming(false)
      setIsLoading(false)

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted')
      } else {
        console.error('Error sending message:', error)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `عذراً، حدث خطأ: ${error.message}`
        }])
      }
      setIsStreaming(false)
      setIsLoading(false)
      setCurrentStreamingMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setIsStreaming(false)
    setIsLoading(false)
    
    // Save current streaming message if any
    if (currentStreamingMessage) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: currentStreamingMessage
      }])
      setCurrentStreamingMessage('')
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1a1a1a' }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        backgroundColor: '#171717',
        borderRight: '1px solid #2d2d2d',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px'
      }}>
        <button style={{
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>+</span>
          محادثة جديدة
        </button>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px', padding: '0 8px' }}>
            المحادثات السابقة
          </div>
          {['حول الذكاء الاصطناعي', 'أسئلة برمجية', 'مساعدة في الكتابة', 'تحليل البيانات'].map((chat, index) => (
            <div key={index} style={{
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#d1d5db',
              marginBottom: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2d2d2d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {chat}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: '16px' }}>
          {['الإعدادات', 'المساعدة', 'تسجيل الخروج'].map((item, index) => (
            <div key={index} style={{
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#d1d5db',
              marginBottom: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2d2d2d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d2d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/assets/logo.svg" alt="Gentle AI" style={{ width: '32px', height: '32px' }} />
            <h2 style={{ color: 'white', margin: 0, fontSize: '18px', fontWeight: '600' }}>Gentle AI</h2>
          </div>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.length === 0 && (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <img src="/assets/logo.svg" alt="Gentle AI" style={{ width: '64px', height: '64px', opacity: 0.5 }} />
              <h3 style={{ color: '#9ca3af', fontSize: '20px', fontWeight: '600' }}>مرحباً بك في Gentle AI</h3>
              <p style={{ color: '#6b7280', textAlign: 'center', maxWidth: '500px' }}>
                كيف يمكنني مساعدتك اليوم؟ Gentle AI مرحباً! أنا
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {message.role === 'assistant' && (
                <img src="/assets/logo.svg" alt="AI" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              )}
              <div style={{
                backgroundColor: message.role === 'user' ? '#2d2d2d' : '#1e293b',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '70%',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {message.content}
              </div>
              {message.role === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  أ
                </div>
              )}
            </div>
          ))}

          {currentStreamingMessage && (
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <img src="/assets/logo.svg" alt="AI" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <div style={{
                backgroundColor: '#1e293b',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '70%',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {currentStreamingMessage}
                <span style={{ animation: 'blink 1s infinite' }}>▊</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #2d2d2d'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="إرسل رسالة إلى Gentle AI..."
              disabled={isLoading}
              style={{
                flex: 1,
                backgroundColor: '#2d2d2d',
                border: '1px solid #404040',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '14px',
                resize: 'none',
                minHeight: '50px',
                maxHeight: '200px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              rows={1}
            />
            {isStreaming ? (
              <button
                onClick={stopStreaming}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                إيقاف
              </button>
            ) : (
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                style={{
                  backgroundColor: input.trim() && !isLoading ? '#10b981' : '#374151',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isLoading) {
                    e.target.style.backgroundColor = '#059669'
                  }
                }}
                onMouseLeave={(e) => {
                  if (input.trim() && !isLoading) {
                    e.target.style.backgroundColor = '#10b981'
                  }
                }}
              >
                إرسال
              </button>
            )}
          </div>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '12px',
            marginTop: '12px'
          }}>
            قد يرتكب Gentle AI أخطاء. يرجى التحقق من المعلومات المقدمة.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default ChatPage
