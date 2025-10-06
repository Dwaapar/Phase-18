import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      addToast({
        type: 'success',
        title: 'Reset link sent!',
        description: 'Check your email for password reset instructions.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to send reset link',
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-monks-light-gray flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 text-center shadow-card">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={24} className="text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-monks-black mb-4">
              Check Your Email
            </h1>
            
            <p className="text-monks-gray mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Click the link in the email to reset your password.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/signin"
                className="block w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
              >
                Back to Sign In
              </Link>
              
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="block w-full text-monks-gray hover:text-monks-black transition-colors duration-300"
              >
                Try different email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray flex items-center justify-center">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 shadow-card">
          <div className="mb-8">
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-6"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
            
            <h1 className="text-3xl font-bold text-monks-black mb-4">
              Forgot Password?
            </h1>
            <p className="text-monks-gray">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
                placeholder="you@company.com"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-monks-black text-white px-4 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-monks-gray text-sm">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}