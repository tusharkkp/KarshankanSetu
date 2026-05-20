import { useState, useEffect } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [farmerData, setFarmerData] = useState({
    mobile: "",
    password: "",
    rememberMe: false
  });
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  // Test Supabase connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection on mount...');
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.log('Supabase auth test error:', error);
        } else {
          console.log('Supabase auth test successful:', data);
        }
      } catch (err) {
        console.log('Supabase connection test failed:', err);
      }
    };
    testConnection();
  }, []);

  const handleFarmerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOrMobile = farmerData.mobile.trim();
    const password = farmerData.password;
    
    // If you use mobile-as-email, transform to email here or use phone auth
    const email = emailOrMobile.includes("@") ? emailOrMobile : `${emailOrMobile}@example.com`;
    
    try {
      console.log('Attempting login with:', { email, password: '***' });
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Login error:', error);
        alert(`Login failed: ${error.message}`);
        return;
      }
      
      console.log('Login successful:', data);
      // Redirect will happen automatically via auth state change
    } catch (err) {
      console.error('Login catch error:', err);
      alert(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleFarmerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOrMobile = farmerData.mobile.trim();
    const password = farmerData.password;
    
    // Validate password length
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    const email = emailOrMobile.includes("@") ? emailOrMobile : `${emailOrMobile}@example.com`;
    
    // Test Supabase connection first
    try {
      console.log('Testing Supabase connection...');
      const { data: testData, error: testError } = await supabase.from('_supabase_auth.users').select('count').limit(1);
      if (testError) {
        console.log('Supabase connection test failed:', testError);
      } else {
        console.log('Supabase connection test successful');
      }
    } catch (testErr) {
      console.log('Supabase connection test error:', testErr);
    }
    
    try {
      console.log('Attempting registration with:', { email, password: '***' });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });
      
      if (error) {
        console.error('Registration error:', error);
        console.error('Error details:', {
          message: error.message,
          status: error.status
        });
        
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          alert('This email is already registered. Please try logging in instead.');
          setIsRegistering(false);
        } else if (error.message.includes('Invalid email')) {
          alert('Please enter a valid email address');
        } else if (error.message.includes('Password should be at least')) {
          alert('Password must be at least 6 characters long');
        } else {
          alert(`Registration failed: ${error.message}`);
        }
        return;
      }
      
      console.log('Registration successful:', data);
      console.log('User data:', data.user);
      console.log('Session data:', data.session);
      
      if (data.user && !data.session) {
        alert('Registration successful! Please check your email for verification link.');
        setIsRegistering(false);
      } else if (data.session) {
        alert('Registration successful! You are now logged in.');
        setIsRegistering(false);
      }
    } catch (err) {
      console.error('Registration catch error:', err);
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace');
      alert(`Registration failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token: otpCode,
        type: 'email',
        email: farmerData.mobile.includes("@") ? farmerData.mobile : `${farmerData.mobile}@example.com`
      });
      
      if (error) {
        console.error('OTP verification error:', error);
        alert(`Verification failed: ${error.message}`);
        return;
      }
      
      console.log('OTP verification successful:', data);
      alert('Email verified successfully! You can now login.');
      setOtpSent(false);
      setOtpCode("");
    } catch (err) {
      console.error('OTP verification catch error:', err);
      alert(`Verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle admin login logic
    console.log("Admin login:", adminData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">K</span>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Karshakan Setu</h1>
          <p className="text-muted-foreground">Your AI Farming Companion</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your farming dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="farmer" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="farmer">Farmer Login</TabsTrigger>
                <TabsTrigger value="admin">Admin/Extension</TabsTrigger>
              </TabsList>

              <TabsContent value="farmer">
                {!otpSent ? (
                  <form onSubmit={isRegistering ? handleFarmerRegister : handleFarmerLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Email or Mobile Number</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="mobile"
                          type="text"
                          placeholder="your@email.com or 9876543210"
                          value={farmerData.mobile}
                          onChange={(e) => setFarmerData({...farmerData, mobile: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farmer-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="farmer-password"
                          type={showPassword ? "text" : "password"}
                          value={farmerData.password}
                          onChange={(e) => setFarmerData({...farmerData, password: e.target.value})}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {!isRegistering && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="farmer-remember"
                            checked={farmerData.rememberMe}
                            onCheckedChange={(checked) => 
                              setFarmerData({...farmerData, rememberMe: checked as boolean})
                            }
                          />
                          <Label htmlFor="farmer-remember" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                        <Button variant="link" className="px-0 text-sm">
                          Forgot password?
                        </Button>
                      </div>
                    )}

                    <Button type="submit" className="w-full">
                      {isRegistering ? "Create Account" : "Sign In as Farmer"}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {isRegistering ? "Already have an account? " : "New to Karshakan Setu? "}
                        <Button 
                          type="button"
                          variant="link" 
                          className="px-0 text-sm"
                          onClick={() => setIsRegistering(!isRegistering)}
                        >
                          {isRegistering ? "Sign In" : "Register now"}
                        </Button>
                      </p>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerification} className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Verify Your Email</h3>
                      <p className="text-sm text-muted-foreground">
                        We've sent a verification code to your email. Please enter it below.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Verify Email
                    </Button>

                    <div className="text-center">
                      <Button 
                        type="button"
                        variant="link" 
                        className="px-0 text-sm"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpCode("");
                        }}
                      >
                        Back to Login
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={adminData.username}
                        onChange={(e) => setAdminData({...adminData, username: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        value={adminData.password}
                        onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="admin-remember"
                        checked={adminData.rememberMe}
                        onCheckedChange={(checked) => 
                          setAdminData({...adminData, rememberMe: checked as boolean})
                        }
                      />
                      <Label htmlFor="admin-remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="px-0 text-sm">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full" variant="secondary">
                    Sign In as Admin
                  </Button>

                  <div className="bg-muted/50 rounded-lg p-3 mt-4">
                    <p className="text-xs text-muted-foreground text-center">
                      Admin access is restricted to authorized personnel only.
                      Contact IT support for account assistance.
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            {/* Quick Access Options */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium text-center mb-3">Quick Access</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Guest Demo
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Voice Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Information */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Need help? Contact support
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>📞 1800-XXX-XXXX</span>
            <span>✉️ support@karshakansetu.gov.in</span>
          </div>
        </div>

        {/* Language Options */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Languages</p>
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs px-2 py-1">
              English
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-2 py-1">
              മലയാളം
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;