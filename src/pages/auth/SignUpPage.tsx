import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function SignUpPage() {
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
      // Redirect to dashboard or intended page
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "Access to 350+ workflows",
    "Deploy AI agents instantly",
    "14-day free trial",
    "No credit card required"
  ];

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-display font-bold text-monks-black mb-6">
                Start Building Smarter
              </h1>
              <p className="text-xl text-monks-gray leading-relaxed">
                Join thousands of teams already scaling with Findawise. 
                Get started in minutes, not months.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-monks-accent" />
                  <span className="text-monks-black">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl p-8 shadow-card">
            <div className="mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-monks-black">Create your account</h2>
              <p className="text-monks-gray">Free forever. Upgrade when ready.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
                  placeholder="Your username"
                />
              </div>
              
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
                    placeholder="Create a strong password"
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
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-monks-black text-white px-4 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? "Creating Account..." : "Get Started Free"}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-monks-gray">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-monks-gray/10 text-center">
              <p className="text-xs text-monks-gray">
                By creating an account, you agree to our{" "}
                <Link to="/legal/terms" className="text-monks-accent hover:underline">Terms</Link> and{" "}
                <Link to="/legal/privacy" className="text-monks-accent hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}