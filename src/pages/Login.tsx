
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login API call with basic validation
    setTimeout(() => {
      // Simple email validation
      const isValidEmail = email.includes('@');
      const isValidPassword = password.length >= 6;

      if (isValidEmail && isValidPassword) {
        // Simulate getting user info
        const storedUserInfo = localStorage.getItem('userInfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : { name: 'John Doe', email: email, interests: [] };
        
        // Store current user info to local storage
        if (!storedUserInfo) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
        
        toast.success('Login successful');
        
        // Check if there's a pending reservation or logo creation
        const pendingReservation = sessionStorage.getItem('pendingReservation');
        const pendingLogoTeam = sessionStorage.getItem('pendingLogoTeam');
        
        if (pendingReservation) {
          sessionStorage.removeItem('pendingReservation');
          navigate('/reservation', { state: { teamName: pendingReservation } });
        } else if (pendingLogoTeam) {
          sessionStorage.removeItem('pendingLogoTeam');
          navigate('/logo', { state: { teamName: pendingLogoTeam } });
        } else {
          // Redirect to the user portal
          navigate('/portal');
        }
      } else {
        toast.error('Invalid email or password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">
              Log in to access your fantasy team names
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
