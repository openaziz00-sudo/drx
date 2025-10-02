import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MessageSquare, Plus, LogOut, User, Settings } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    loadConversations();
  }, [navigate]);

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/conversations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load conversations');
      }

      const data = await response.json();
      setConversations(data.conversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNewConversation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/conversations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'محادثة جديدة' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      const data = await response.json();
      navigate(`/chat/${data.conversation.id}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleDeleteConversation = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه المحادثة؟')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/conversations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete conversation');
      }

      // Reload conversations
      loadConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/" className="text-2xl font-bold text-primary">
                Gentle AI
              </Link>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{user?.name || user?.email}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">مرحباً، {user?.name || 'مستخدم'}!</h1>
            <p className="text-muted-foreground">
              ابدأ محادثة جديدة أو تابع محادثاتك السابقة
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="cursor-pointer hover:border-primary transition-colors" onClick={handleNewConversation}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Plus className="h-5 w-5" />
                  <span>محادثة جديدة</span>
                </CardTitle>
                <CardDescription>ابدأ محادثة جديدة مع Gentle AI</CardDescription>
              </CardHeader>
            </Card>

            <Link to="/chat">
              <Card className="cursor-pointer hover:border-primary transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <MessageSquare className="h-5 w-5" />
                    <span>الدردشة</span>
                  </CardTitle>
                  <CardDescription>انتقل إلى صفحة الدردشة</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/settings">
              <Card className="cursor-pointer hover:border-primary transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Settings className="h-5 w-5" />
                    <span>الإعدادات</span>
                  </CardTitle>
                  <CardDescription>إدارة حسابك وإعداداتك</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Conversations List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">محادثاتك السابقة</h2>
            {conversations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد محادثات بعد</p>
                  <Button className="mt-4" onClick={handleNewConversation}>
                    ابدأ محادثة جديدة
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {conversations.map((conversation) => (
                  <Card key={conversation.id} className="hover:border-primary transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">{conversation.title}</CardTitle>
                      <CardDescription>
                        {conversation._count.messages} رسالة • {new Date(conversation.updatedAt).toLocaleDateString('ar-EG')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/chat/${conversation.id}`)}
                        >
                          فتح
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteConversation(conversation.id)}
                        >
                          حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
