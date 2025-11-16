'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Upload, X, Eye, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface ChatMessage {
  id: string
  type: 'user' | 'admin'
  message: string
  mediaUrl?: string
  mediaType?: 'image' | 'payment_proof'
  timestamp: Date
  status: 'sent' | 'delivered'
  isAutoReply?: boolean
}

interface ChatSession {
  id: string
  productTitle: string
  productType: 'account' | 'gems' | 'diamonds' | 'bot'
  status: 'new' | 'payment_marked' | 'verified' | 'delivered'
  createdAt: Date
  messages: ChatMessage[]
}

export default function ChatPage() {
  const [chats, setChats] = useState<ChatSession[]>([
    {
      id: 'chat-1',
      productTitle: 'T5 Account - 60M Might',
      productType: 'account',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000),
      messages: [],
    },
    {
      id: 'chat-2',
      productTitle: '500 Gems Package',
      productType: 'gems',
      status: 'payment_marked',
      createdAt: new Date(Date.now() - 7200000),
      messages: [],
    },
  ])

  const [activeChat, setActiveChat] = useState<ChatSession | null>(chats[0])
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat?.messages])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = async () => {
    if (!activeChat || (!message.trim() && !selectedFile)) return

    setIsLoading(true)

    setTimeout(() => {
      if (activeChat) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          message: message || (selectedFile ? `Uploaded: ${selectedFile.name}` : ''),
          mediaUrl: previewImage || undefined,
          mediaType: selectedFile ? 'payment_proof' : undefined,
          timestamp: new Date(),
          status: 'sent',
        }

        const updatedChat = {
          ...activeChat,
          messages: [...activeChat.messages, newMessage],
        }

        setTimeout(() => {
          newMessage.status = 'delivered'
          setActiveChat({ ...updatedChat })
        }, 500)

        if (activeChat.messages.length === 0) {
          setTimeout(() => {
            const autoReply: ChatMessage = {
              id: (Date.now() + 1).toString(),
              type: 'admin',
              message: 'Send Your Might And Your Wishlist Sir!',
              timestamp: new Date(),
              status: 'delivered',
              isAutoReply: true,
            }
            const withReply = {
              ...updatedChat,
              messages: [...updatedChat.messages, autoReply],
            }

            setTimeout(() => {
              const secondReply: ChatMessage = {
                id: (Date.now() + 2).toString(),
                type: 'admin',
                message: 'Be patient, Admin will contact you soon.',
                timestamp: new Date(),
                status: 'delivered',
                isAutoReply: true,
              }
              setActiveChat({
                ...withReply,
                messages: [...withReply.messages, secondReply],
              })
              setChats(
                chats.map((c) =>
                  c.id === activeChat.id
                    ? { ...withReply, messages: [...withReply.messages, secondReply] }
                    : c
                )
              )
            }, 1000)

            setActiveChat(withReply)
            setChats(chats.map((c) => (c.id === activeChat.id ? withReply : c)))
          }, 1500)
        }

        setChats(chats.map((c) => (c.id === activeChat.id ? updatedChat : c)))
        setActiveChat(updatedChat)
        setMessage('')
        setSelectedFile(null)
        setPreviewImage(null)
      }
      setIsLoading(false)
    }, 800)
  }

  const handlePaymentMarked = () => {
    if (!activeChat) return
    const updated = { ...activeChat, status: 'payment_marked' as const }
    setActiveChat(updated)
    setChats(chats.map((c) => (c.id === activeChat.id ? updated : c)))
  }

  const getStatusColor = (status: ChatSession['status']) => {
    switch (status) {
      case 'new':
        return 'bg-purple-200/40 text-purple-700 border-purple-400'
      case 'payment_marked':
        return 'bg-yellow-200/40 text-yellow-700 border-yellow-400'
      case 'verified':
        return 'bg-green-200/40 text-green-700 border-green-400'
      case 'delivered':
        return 'bg-cyan-200/40 text-cyan-700 border-cyan-400'
      default:
        return 'bg-slate-200/40 text-slate-700'
    }
  }

  const getStatusLabel = (status: ChatSession['status']) => {
    switch (status) {
      case 'new':
        return '🆕 New Chat'
      case 'payment_marked':
        return '💳 Payment Marked'
      case 'verified':
        return '✅ Verified'
      case 'delivered':
        return '📦 Delivered'
      default:
        return status
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />

      <section className="border-b-2 border-purple-200/50 px-4 py-16 sm:px-6 lg:px-8 section-gradient">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-3 text-4xl font-black gradient-text">Chat Support</h1>
          <p className="text-lg text-slate-700 font-semibold">Real-time support for your transactions</p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <h2 className="mb-4 font-black text-base text-slate-900">Conversations</h2>
              <div className="space-y-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                      activeChat?.id === chat.id
                        ? 'border-purple-500 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 shadow-lg'
                        : 'border-purple-200/50 hover:border-purple-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <p className="font-bold text-sm line-clamp-1 text-slate-900">{chat.productTitle}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold border-2 ${getStatusColor(chat.status)}`}>
                        {getStatusLabel(chat.status)}
                      </span>
                      {chat.messages.length > 0 && (
                        <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-1 rounded-full font-bold">
                          {chat.messages.length}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeChat ? (
                <Card className="border-2 border-purple-200/50 h-full flex flex-col bg-white shadow-lg">
                  {/* Header */}
                  <CardHeader className="border-b-2 border-purple-200/50 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl gradient-text">{activeChat.productTitle}</CardTitle>
                        <CardDescription className="text-base font-semibold text-slate-700">
                          {activeChat.productType.charAt(0).toUpperCase() + activeChat.productType.slice(1)} • Started {activeChat.createdAt.toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getStatusColor(activeChat.status)}`}>
                        {getStatusLabel(activeChat.status)}
                      </span>
                    </div>
                  </CardHeader>

                  {/* Payment Instructions Alert */}
                  {activeChat.status === 'new' && (
                    <Alert className="m-4 border-2 border-cyan-400 bg-gradient-to-r from-cyan-100/50 to-blue-100/50">
                      <AlertCircle className="h-5 w-5 text-cyan-700 font-bold" />
                      <AlertDescription className="text-base font-bold text-slate-900">
                        💳 <strong>Payment Instructions:</strong> Our admin will provide payment details in chat. Send payment proof once transferred.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-slate-50/30">
                    {activeChat.messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-slate-600 font-semibold">
                        <p className="text-lg">Start a conversation with the seller</p>
                      </div>
                    ) : (
                      <>
                        {activeChat.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-sm rounded-xl p-4 shadow-md font-semibold ${
                                msg.type === 'user'
                                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                  : msg.isAutoReply
                                    ? 'bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-300 text-slate-900'
                                    : 'bg-white border-2 border-purple-200/50 text-slate-900'
                              }`}
                            >
                              {msg.mediaUrl && (
                                <button
                                  onClick={() => {
                                    setPreviewImage(msg.mediaUrl || null)
                                    setShowImageModal(true)
                                  }}
                                  className="mb-2 block hover:opacity-80 transition-opacity rounded-lg overflow-hidden"
                                >
                                  <img
                                    src={msg.mediaUrl || "/placeholder.svg"}
                                    alt="Payment proof"
                                    className="max-h-48 rounded-lg cursor-pointer"
                                  />
                                </button>
                              )}
                              <p className="text-base">{msg.message}</p>
                              <div className={`mt-2 text-xs flex items-center gap-1 ${msg.type === 'user' ? 'text-white/80' : 'text-slate-600'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                                {msg.type === 'user' && msg.status === 'delivered' && (
                                  <CheckCircle2 className="h-3 w-3" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </CardContent>

                  {/* Image Preview */}
                  {previewImage && !showImageModal && (
                    <div className="mx-4 mb-4 relative rounded-lg overflow-hidden">
                      <img src={previewImage || "/placeholder.svg"} alt="Preview" className="max-h-32 rounded-lg" />
                      <button
                        onClick={() => {
                          setPreviewImage(null)
                          setSelectedFile(null)
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-300"
                      >
                        <X className="h-4 w-4 font-bold" />
                      </button>
                    </div>
                  )}

                  {/* Payment Marked Button */}
                  {activeChat.status === 'new' && activeChat.messages.length > 2 && (
                    <div className="mx-4 mb-4">
                      <Button
                        onClick={handlePaymentMarked}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:shadow-xl text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        💳 I Have Paid - Mark Payment
                      </Button>
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="border-t-2 border-purple-200/50 p-4 space-y-3 bg-gradient-to-t from-slate-50/30 to-white">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="border-2 border-purple-200 focus:border-purple-500 bg-white flex-1 h-11 font-semibold transition-all duration-300 rounded-xl"
                        disabled={isLoading}
                      />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-100/50 transition-all duration-300 font-bold rounded-xl"
                        disabled={isLoading}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || (!message.trim() && !selectedFile)}
                        className="btn-game font-bold"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold">Max 5MB • Images only</p>
                  </div>
                </Card>
              ) : (
                <Card className="flex items-center justify-center h-96 border-2 border-purple-200/50 bg-white">
                  <CardContent className="text-center">
                    <p className="text-slate-700 text-lg font-semibold">Select a conversation to start chatting</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {showImageModal && previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border-2 border-purple-300">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 right-2 p-2 hover:bg-slate-100 rounded-lg transition-all duration-300"
            >
              <X className="h-6 w-6 text-slate-700 font-bold" />
            </button>
            <img src={previewImage || "/placeholder.svg"} alt="Full view" className="w-full rounded-xl" />
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
