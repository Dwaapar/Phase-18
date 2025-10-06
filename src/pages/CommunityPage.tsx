import React from "react";
import { MessageSquare, Users, BookOpen, Code, Heart, Trophy, Calendar, ExternalLink, Star, CheckCircle } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { FeatureGrid } from "../components/ui/FeatureGrid";
import { StatsGrid } from "../components/ui/StatsGrid";

const communityChannels = [
  {
    title: "Discord Community",
    description: "Join our active Discord server for real-time discussions, support, and networking with fellow automation enthusiasts",
    icon: MessageSquare,
    features: ["Real-time chat", "Voice channels", "Screen sharing", "Community events"]
  },
  {
    title: "GitHub Discussions",
    description: "Contribute to open-source projects, share code snippets, and collaborate on automation solutions",
    icon: Code,
    features: ["Code sharing", "Issue tracking", "Feature requests", "Open source contributions"]
  },
  {
    title: "Community Forum",
    description: "Ask questions, share knowledge, and get help from experienced automation practitioners",
    icon: Users,
    features: ["Q&A discussions", "Knowledge sharing", "Best practices", "Peer support"]
  },
  {
    title: "Learning Hub",
    description: "Access tutorials, guides, and educational content created by the community",
    icon: BookOpen,
    features: ["Video tutorials", "Written guides", "Case studies", "Best practices"]
  }
];

const communityPrograms = [
  {
    title: "Community Champions",
    description: "Recognize and reward active community members who help others succeed",
    icon: Trophy,
    benefits: ["Exclusive access", "Special recognition", "Direct feedback channel", "Beta testing"]
  },
  {
    title: "Expert Network",
    description: "Connect with automation experts and consultants for specialized help",
    icon: Star,
    benefits: ["Expert consultations", "Implementation help", "Custom solutions", "Training sessions"]
  },
  {
    title: "User Groups",
    description: "Join local and virtual user groups for networking and knowledge sharing",
    icon: Users,
    benefits: ["Local meetups", "Virtual events", "Networking opportunities", "Industry insights"]
  }
];

const upcomingEvents = [
  {
    title: "Automation Best Practices Webinar",
    date: "December 20, 2024",
    time: "2:00 PM PST",
    type: "Webinar",
    description: "Learn advanced automation techniques from industry experts"
  },
  {
    title: "Community Meetup - San Francisco",
    date: "January 15, 2025",
    time: "6:00 PM PST",
    type: "In-Person",
    description: "Network with local automation practitioners and share experiences"
  },
  {
    title: "AI Agents Workshop",
    date: "January 25, 2025",
    time: "10:00 AM PST",
    type: "Workshop",
    description: "Hands-on workshop for building and deploying AI agents"
  },
  {
    title: "Quarterly Community Call",
    date: "February 1, 2025",
    time: "11:00 AM PST",
    type: "Community Call",
    description: "Product updates, roadmap discussion, and community Q&A"
  }
];

const stats = [
  { label: "Community Members", value: 15000, suffix: "+" },
  { label: "Monthly Active Users", value: 8500, suffix: "+" },
  { label: "Questions Answered", value: 25000, suffix: "+" },
  { label: "Code Contributions", value: 1200, suffix: "+" }
];

export default function CommunityPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Join the Community"
        description="Connect with thousands of automation practitioners, share knowledge, and grow together in our vibrant community ecosystem."
        variant="dark"
      />

      <ContentSection
        title="Community Channels"
        description="Multiple ways to connect, learn, and contribute to the automation community."
        variant="default"
      >
        <FeatureGrid features={communityChannels} columns={2} />
      </ContentSection>

      <ContentSection
        title="Community Programs"
        description="Special programs designed to recognize contributors and provide additional value to active members."
        variant="gray"
      >
        <FeatureGrid features={communityPrograms} columns={3} />
      </ContentSection>

      <ContentSection
        title="Upcoming Events"
        description="Join our regular events to learn, network, and stay updated with the latest in automation."
        variant="default"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingEvents.map((event, i) => (
            <div key={i} className="bg-monks-light-gray rounded-3xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-monks-gray" />
                    <span className="text-sm text-monks-gray">{event.date}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-monks-black">{event.title}</h3>
                <p className="text-monks-gray">{event.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-monks-gray">{event.time}</span>
                  <button className="bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Community Stats"
        description="Our growing community of automation practitioners and enthusiasts."
        variant="gray"
      >
        <StatsGrid stats={stats} columns={4} />
      </ContentSection>

      <ContentSection
        title="Quick Links"
        description="Jump right into the community channels that interest you most."
        variant="default"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <a
            href="https://discord.gg/findawise"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-monks-light-gray rounded-2xl p-6 text-center hover:bg-monks-accent hover:text-white transition-all duration-300"
          >
            <MessageSquare size={24} className="mx-auto mb-3 text-monks-accent group-hover:text-white" />
            <h3 className="font-semibold mb-2">Join Discord</h3>
            <div className="flex items-center justify-center gap-1 text-sm">
              <span>Open Discord</span>
              <ExternalLink size={12} />
            </div>
          </a>
          
          <a
            href="https://github.com/findawise/community"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-monks-light-gray rounded-2xl p-6 text-center hover:bg-monks-accent hover:text-white transition-all duration-300"
          >
            <Code size={24} className="mx-auto mb-3 text-monks-accent group-hover:text-white" />
            <h3 className="font-semibold mb-2">GitHub</h3>
            <div className="flex items-center justify-center gap-1 text-sm">
              <span>View Repository</span>
              <ExternalLink size={12} />
            </div>
          </a>
          
          <a
            href="https://community.findawise.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-monks-light-gray rounded-2xl p-6 text-center hover:bg-monks-accent hover:text-white transition-all duration-300"
          >
            <Users size={24} className="mx-auto mb-3 text-monks-accent group-hover:text-white" />
            <h3 className="font-semibold mb-2">Forum</h3>
            <div className="flex items-center justify-center gap-1 text-sm">
              <span>Visit Forum</span>
              <ExternalLink size={12} />
            </div>
          </a>
          
          <a
            href="https://learn.findawise.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-monks-light-gray rounded-2xl p-6 text-center hover:bg-monks-accent hover:text-white transition-all duration-300"
          >
            <BookOpen size={24} className="mx-auto mb-3 text-monks-accent group-hover:text-white" />
            <h3 className="font-semibold mb-2">Learning Hub</h3>
            <div className="flex items-center justify-center gap-1 text-sm">
              <span>Start Learning</span>
              <ExternalLink size={12} />
            </div>
          </a>
        </div>
      </ContentSection>

      <ContentSection
        title="Community Guidelines"
        description="Help us maintain a welcoming and productive environment for everyone."
        variant="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold text-monks-black mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-red-500" />
                  Be Respectful
                </h3>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Treat all members with respect and kindness</li>
                  <li>• Use inclusive language and be welcoming to newcomers</li>
                  <li>• Avoid spam, self-promotion, and off-topic discussions</li>
                  <li>• Help others learn and grow in their automation journey</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-monks-black mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  Share Knowledge
                </h3>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Share your automation experiences and learnings</li>
                  <li>• Provide helpful and accurate information</li>
                  <li>• Credit others when sharing their work or ideas</li>
                  <li>• Contribute to open-source projects when possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}