import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast({
        type: 'success',
        title: 'Welcome back!',
        description: 'You have been signed in successfully.'
      });
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Sign in failed',
        description: 'Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-display font-bold text-monks-black mb-6">
                Welcome Back
              </h1>
              <p className="text-xl text-monks-gray leading-relaxed">
                Sign in to access your workflows, agents, and automation dashboard.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-2">Quick Access</h3>
                <p className="text-monks-gray text-sm">
                  Jump right back into your automation projects and deployed workflows.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-2">Team Collaboration</h3>
                <p className="text-monks-gray text-sm">
                  Collaborate with your team on shared workflows and agent deployments.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-2">Performance Insights</h3>
                <p className="text-monks-gray text-sm">
                  Monitor your automation performance with detailed analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl p-8 shadow-card">
            <div className="mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-monks-black">Sign In</h2>
              <p className="text-monks-gray">Access your Findawise account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
                  placeholder="you@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-monks-gray hover:text-monks-black transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                    className="rounded border-monks-gray/30 text-monks-accent focus:ring-monks-accent"
                  />
                  <span className="text-sm text-monks-gray">Remember me</span>
                </label>
                
                <Link
                  to="/forgot-password"
                  className="text-sm text-monks-accent hover:text-monks-black transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-monks-black text-white px-4 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-monks-gray">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-monks-gray/10">
              <div className="text-center space-y-4">
                <p className="text-sm text-monks-gray">Or continue with</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-monks-gray/20 rounded-2xl hover:border-monks-accent/30 transition-all duration-300">
                    <div className="w-5 h-5 bg-monks-gray rounded"></div>
                    <span className="text-sm text-monks-black">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-monks-gray/20 rounded-2xl hover:border-monks-accent/30 transition-all duration-300">
                    <div className="w-5 h-5 bg-monks-gray rounded"></div>
                    <span className="text-sm text-monks-black">GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}