import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are identical.'
      });
      return;
    }

    if (formData.password.length < 8) {
      addToast({
        type: 'error',
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      addToast({
        type: 'success',
        title: 'Password reset successful!',
        description: 'You can now sign in with your new password.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Reset failed',
        description: 'Please try again or request a new reset link.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!token) {
    return (
      <div className="pt-20 min-h-screen bg-monks-light-gray flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 text-center shadow-card">
            <h1 className="text-2xl font-bold text-monks-black mb-4">
              Invalid Reset Link
            </h1>
            <p className="text-monks-gray mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-monks-light-gray flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 text-center shadow-card">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-monks-black mb-4">
              Password Reset Complete
            </h1>
            
            <p className="text-monks-gray mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            
            <Link
              to="/signin"
              className="block w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray flex items-center justify-center">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 shadow-card">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold text-monks-black">Reset Password</h1>
            <p className="text-monks-gray">Enter your new password below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 pr-12"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-monks-gray hover:text-monks-black transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-monks-gray mt-2">
                Must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 pr-12"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-monks-gray hover:text-monks-black transition-colors duration-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-monks-black text-white px-4 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link
              to="/signin"
              className="text-monks-gray hover:text-monks-black transition-colors duration-300 text-sm"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}