import React, { useState } from "react";
import { User, Camera, Save } from "lucide-react";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function DashboardProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "Sarah Chen",
    email: "sarah@techflow.com",
    company: "TechFlow",
    role: "VP Operations",
    bio: "Passionate about automation and helping teams scale efficiently.",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen"
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast({
        type: 'success',
        title: 'Profile updated',
        description: 'Your profile has been saved successfully.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Update failed',
        description: 'Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-monks-black mb-2">Profile</h1>
          <p className="text-monks-gray">Manage your personal information and preferences</p>
        </div>

        <div className="bg-white rounded-3xl p-8">
          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-monks-accent/10 rounded-full flex items-center justify-center">
                  <User size={32} className="text-monks-accent" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-monks-black text-white rounded-full flex items-center justify-center hover:bg-monks-accent transition-colors duration-300">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-monks-black">{profileData.name}</h2>
                <p className="text-monks-gray">{profileData.role} at {profileData.company}</p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Company</label>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Role</label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Website</label>
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Twitter</label>
                  <input
                    type="url"
                    value={profileData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-monks-black text-white px-8 py-3 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}