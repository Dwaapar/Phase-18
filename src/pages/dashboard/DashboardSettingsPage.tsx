import React, { useState } from "react";
import { User, Bell, Shield, CreditCard, Key, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function DashboardSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "Sarah Chen",
    email: "sarah@techflow.com",
    company: "TechFlow",
    role: "VP Operations",
    timezone: "America/Los_Angeles"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    workflowAlerts: true,
    agentUpdates: true,
    marketingEmails: false,
    weeklyReports: true
  });

  const handleSaveProfile = async () => {
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

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast({
        type: 'success',
        title: 'Notifications updated',
        description: 'Your notification preferences have been saved.'
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

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-monks-black mb-2">Account Settings</h1>
          <p className="text-monks-gray">Manage your account preferences and security settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard size={16} />
              Billing
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key size={16} />
              API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-monks-black mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
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
                      onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">Role</label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Timezone</label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  >
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-monks-black mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-monks-light-gray rounded-2xl">
                    <div>
                      <h3 className="font-medium text-monks-black capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-monks-gray">
                        {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                        {key === 'workflowAlerts' && 'Get notified when workflows fail or need attention'}
                        {key === 'agentUpdates' && 'Receive updates about your AI agents'}
                        {key === 'marketingEmails' && 'Receive marketing emails and product updates'}
                        {key === 'weeklyReports' && 'Get weekly performance reports'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotificationSettings(prev => ({ 
                          ...prev, 
                          [key]: e.target.checked 
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-monks-gray/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-monks-accent"></div>
                    </label>
                  </div>
                ))}

                <button
                  onClick={handleSaveNotifications}
                  disabled={isLoading}
                  className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Saving...
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-monks-black mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">Password</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    Last changed 30 days ago
                  </p>
                  <button className="bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                    Change Password
                  </button>
                </div>

                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="bg-monks-accent text-white px-4 py-2 rounded-full font-medium hover:bg-monks-hover transition-all duration-300">
                    Enable 2FA
                  </button>
                </div>

                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">Active Sessions</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    Manage your active login sessions
                  </p>
                  <button className="border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-monks-black mb-6">Billing & Subscription</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-monks-black">Current Plan</h3>
                      <p className="text-sm text-monks-gray">Professional Plan</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-monks-black">$49</div>
                      <div className="text-sm text-monks-gray">/month</div>
                    </div>
                  </div>
                  <button className="bg-monks-accent text-white px-4 py-2 rounded-full font-medium hover:bg-monks-hover transition-all duration-300">
                    Upgrade Plan
                  </button>
                </div>

                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">Payment Method</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    •••• •••• •••• 4242 (Expires 12/25)
                  </p>
                  <button className="border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    Update Payment
                  </button>
                </div>

                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">Billing History</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    View and download your invoices
                  </p>
                  <button className="border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    View Invoices
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-monks-black mb-6">API Access</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">API Keys</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    Manage your API keys for programmatic access
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div>
                        <div className="font-medium text-monks-black">Production Key</div>
                        <div className="text-sm text-monks-gray">pk_live_••••••••••••4242</div>
                      </div>
                      <button className="text-monks-gray hover:text-monks-black transition-colors duration-300">
                        <Key size={16} />
                      </button>
                    </div>
                    <button className="w-full bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                      Generate New Key
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-monks-light-gray rounded-2xl">
                  <h3 className="font-semibold text-monks-black mb-2">Webhooks</h3>
                  <p className="text-sm text-monks-gray mb-4">
                    Configure webhook endpoints for real-time notifications
                  </p>
                  <button className="border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    Manage Webhooks
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl p-8 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
            <Trash2 size={20} />
            Danger Zone
          </h2>
          
          <div className="space-y-4">
            <div className="p-6 bg-red-50 rounded-2xl">
              <h3 className="font-semibold text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-600 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all duration-300">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}