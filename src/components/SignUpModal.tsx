import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUpModal({ onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Sign up:", formData);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md relative shadow-card animate-slide-up max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-monks-gray hover:text-monks-black transition-colors duration-300"
          onClick={onClose}
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-monks-black">Create account</h2>
          <p className="text-monks-gray text-sm sm:text-base">Join Findawise and start automating your operations</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-monks-black mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 text-sm sm:text-base"
              placeholder="Your username"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-monks-black mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 text-sm sm:text-base"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-monks-black mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 pr-10 sm:pr-12 text-sm sm:text-base"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 text-monks-gray hover:text-monks-black transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-monks-black text-white px-4 py-3 sm:py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 text-sm sm:text-base"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-monks-gray text-sm sm:text-base">
            Already have an account?{" "}
            <button
              className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
              onClick={onSwitchToSignIn}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}