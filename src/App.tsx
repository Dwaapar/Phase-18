import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/ui/Toast";
import HomePage from "./pages/HomePage";
import MegaNav from "./components/MegaNav";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import Footer from "./components/Footer";
import { LoadingPage } from "./components/ui/LoadingSpinner";

// Platform pages
import PlatformPage from "./pages/PlatformPage";

// Marketplace pages
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import MarketplaceSellPage from "./pages/marketplace/MarketplaceSellPage";

// Automation pages
import AutomationPage from "./pages/AutomationPage";
import AutomationPilotPage from "./pages/AutomationPilotPage";
import LeadRoutingPage from "./pages/automation/LeadRoutingPage";
import FinanceOpsPage from "./pages/automation/FinanceOpsPage";
import TicketTriagePage from "./pages/automation/TicketTriagePage";
import KPIReportingPage from "./pages/automation/KPIReportingPage";

// Workflow pages
import WorkflowsPage from "./pages/WorkflowsPage";
import WorkflowDetailPage from "./pages/WorkflowDetailPage";
import HowItWorksPage from "./pages/workflows/HowItWorksPage";

// Assets pages
import AssetsPage from "./pages/AssetsPage";
import AssetDetailPage from "./pages/assets/AssetDetailPage";

// Agents pages
import AgentsPage from "./pages/AgentsPage";
import NewAgentPage from "./pages/agents/NewAgentPage";
import ManagedAgentsPage from "./pages/agents/ManagedAgentsPage";
import SelfHostAgentsPage from "./pages/agents/SelfHostAgentsPage";
import AgentMarketplacePage from "./pages/agents/AgentMarketplacePage";
import AgentDetailPage from "./pages/agents/AgentDetailPage";
import DashboardAgentConfigPage from "./pages/dashboard/DashboardAgentConfigPage";
import DashboardAgentPerformancePage from "./pages/dashboard/DashboardAgentPerformancePage";

// Affiliate pages
import AffiliatePage from "./pages/AffiliatePage";

// Decision pages
import DecisionPage from "./pages/DecisionPage";
import DecisionQuizPage from "./pages/decision/DecisionQuizPage";
import DecisionGuidesPage from "./pages/decision/DecisionGuidesPage";
import DecisionComparisonsPage from "./pages/decision/DecisionComparisonsPage";

// Tools pages
import ToolsPage from "./pages/ToolsPage";
import ProfessionalToolsHub from "./pages/tools/ProfessionalToolsHub";
import ResumeToolPage from "./pages/tools/ResumeToolPage";
import CoverLetterToolPage from "./pages/tools/CoverLetterToolPage";
import PortfolioToolPage from "./pages/tools/PortfolioToolPage";
import EmailOptimizerToolPage from "./pages/tools/EmailOptimizerToolPage";
import InterviewPrepPage from "./pages/tools/InterviewPrepPage";
import PitchDeckBuilderPage from "./pages/tools/PitchDeckBuilderPage";
import SalaryCalculatorPage from "./pages/tools/SalaryCalculatorPage";
import BrandAuditPage from "./pages/tools/BrandAuditPage";

// Enterprise pages
import IndustriesPage from "./pages/enterprise/IndustriesPage";
import SaaSIndustryPage from "./pages/enterprise/SaaSIndustryPage";
import EcommerceIndustryPage from "./pages/enterprise/EcommerceIndustryPage";
import FintechIndustryPage from "./pages/enterprise/FintechIndustryPage";
import SolutionsPage from "./pages/enterprise/SolutionsPage";
import SecurityPage from "./pages/trust/SecurityPage";
import CompliancePage from "./pages/trust/CompliancePage";
import PricingPage from "./pages/PricingPage";

// Resource pages
import BlogPage from "./pages/resources/BlogPage";
import CaseStudiesPage from "./pages/resources/CaseStudiesPage";
import GuidesPage from "./pages/resources/GuidesPage";
import DocsPage from "./pages/resources/DocsPage";
import ChangelogPage from "./pages/resources/ChangelogPage";
import StatusPage from "./pages/resources/StatusPage";

// Company pages
import AboutPage from "./pages/company/AboutPage";
import CareersPage from "./pages/company/CareersPage";
import ContactPage from "./pages/company/ContactPage";

// Legal pages
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import CookiesPage from "./pages/legal/CookiesPage";
import DPAPage from "./pages/legal/DPAPage";

// Auth pages
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// Dashboard pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardWorkflowsPage from "./pages/dashboard/DashboardWorkflowsPage";
import DashboardAgentsPage from "./pages/dashboard/DashboardAgentsPage";
import DashboardLibraryPage from "./pages/dashboard/DashboardLibraryPage";
import DashboardAffiliatePage from "./pages/dashboard/DashboardAffiliatePage";
import DashboardSettingsPage from "./pages/dashboard/DashboardSettingsPage";

// Missing imports
import BlogPostPage from "./pages/resources/BlogPostPage";
import CaseStudyDetailPage from "./pages/resources/CaseStudyDetailPage";
import GuideDetailPage from "./pages/resources/GuideDetailPage";
import DocsSectionPage from "./pages/resources/DocsSectionPage";
import JobDetailPage from "./pages/company/JobDetailPage";
import SupportPage from "./pages/SupportPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import HealthcareIndustryPage from "./pages/enterprise/HealthcareIndustryPage";
import EducationIndustryPage from "./pages/enterprise/EducationIndustryPage";
import ServicesIndustryPage from "./pages/enterprise/ServicesIndustryPage";

// Additional pages
import IntegrationsPage from "./pages/IntegrationsPage";
import SecurityCenterPage from "./pages/SecurityCenterPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import CommunityPage from "./pages/CommunityPage";
import UniversityPage from "./pages/UniversityPage";
import TemplatesPage from "./pages/TemplatesPage";
import APIPage from "./pages/APIPage";
import AffiliateCompliancePage from "./pages/AffiliateCompliancePage";

// Additional missing pages
import DashboardActivityPage from "./pages/dashboard/DashboardActivityPage";
import DashboardProfilePage from "./pages/dashboard/DashboardProfilePage";
import DashboardBillingPage from "./pages/dashboard/DashboardBillingPage";
import AffiliateAnalyticsPage from "./pages/affiliate/AffiliateAnalyticsPage";
import AffiliateCampaignsPage from "./pages/affiliate/AffiliateCampaignsPage";
import AffiliatePayoutsPage from "./pages/affiliate/AffiliatePayoutsPage";
import NewCampaignPage from "./pages/affiliate/NewCampaignPage";

// New affiliate pages
import AffiliateOnboardingPage from "./pages/affiliate/AffiliateOnboardingPage";
import AffiliateDashboardPage from "./pages/affiliate/AffiliateDashboardPage";
import AffiliateCreativesPage from "./pages/affiliate/AffiliateCreativesPage";
import AffiliateCampaignManagerPage from "./pages/affiliate/AffiliateCampaignManagerPage";
import AffiliateComplianceMonitorPage from "./pages/affiliate/AffiliateComplianceMonitorPage";
import AffiliateLeaderboardPage from "./pages/affiliate/AffiliateLeaderboardPage";

// New marketplace and pricing pages
import AllProductsPage from "./pages/marketplace/AllProductsPage";
import ProductDetailPage from "./pages/marketplace/ProductDetailPage";
import UnifiedMarketplaceHubPage from "./pages/marketplace/UnifiedMarketplaceHubPage";
import ServicesPage from "./pages/marketplace/ServicesPage";
import EnhancedPricingPage from "./pages/EnhancedPricingPage";
import WorkflowStorePage from "./pages/marketplace/WorkflowStorePage";
import WorkflowDetailEnhancedPage from "./pages/workflows/WorkflowDetailEnhancedPage";

// Digital Assets pages
import DigitalAssetsPage from "./pages/marketplace/DigitalAssetsPage";
import AssetDetailPageNew from "./pages/marketplace/AssetDetailPage";
import DashboardAssetsPage from "./pages/dashboard/DashboardAssetsPage";

// New Enhanced Marketplace pages
import { UnifiedMarketplaceHub } from "./pages/marketplace/UnifiedMarketplaceHub";
import { EnhancedProductDetailPage } from "./pages/marketplace/EnhancedProductDetailPage";
import { CollectionsPage } from "./pages/marketplace/CollectionsPage";
import { CollectionDetailPage } from "./pages/marketplace/CollectionDetailPage";
import { WishlistPage } from "./pages/marketplace/WishlistPage";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white text-monks-black antialiased">
        <MegaNav
          onSignIn={() => setShowSignIn(true)}
          onSignUp={() => setShowSignUp(true)}
        />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Platform */}
          <Route path="/platform" element={<PlatformPage />} />
          
          {/* Marketplace */}
          <Route path="/marketplace" element={<UnifiedMarketplaceHub />} />
          <Route path="/marketplace/hub" element={<UnifiedMarketplaceHubPage />} />
          <Route path="/marketplace/all" element={<AllProductsPage />} />
          <Route path="/marketplace/products/:slug" element={<EnhancedProductDetailPage />} />
          <Route path="/marketplace/collections" element={<CollectionsPage />} />
          <Route path="/marketplace/collections/:slug" element={<CollectionDetailPage />} />
          <Route path="/marketplace/wishlist" element={<WishlistPage />} />
          <Route path="/marketplace/:type/:slug" element={<ProductDetailPage />} />
          <Route path="/marketplace/workflows" element={<WorkflowsPage />} />
          <Route path="/marketplace/agents" element={<AgentsPage />} />
          <Route path="/marketplace/assets" element={<DigitalAssetsPage />} />
          <Route path="/marketplace/assets/:slug" element={<AssetDetailPageNew />} />
          <Route path="/marketplace/services" element={<ServicesPage />} />
          <Route path="/marketplace/sell" element={<MarketplaceSellPage />} />
          
          {/* Automation */}
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/automation/pilot" element={<AutomationPilotPage />} />
          <Route path="/automation/use-cases/lead-routing" element={<LeadRoutingPage />} />
          <Route path="/automation/use-cases/finance-ops" element={<FinanceOpsPage />} />
          <Route path="/automation/use-cases/ticket-triage" element={<TicketTriagePage />} />
          <Route path="/automation/use-cases/kpi-reporting" element={<KPIReportingPage />} />
          
          {/* Workflows */}
          <Route path="/workflows" element={<WorkflowStorePage />} />
          <Route path="/workflows/how-it-works" element={<HowItWorksPage />} />
          <Route path="/workflows/:id" element={<WorkflowDetailEnhancedPage />} />
          
          {/* Assets */}
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/assets/:slug" element={<AssetDetailPage />} />
          
          {/* Agents */}
          <Route path="/agents" element={<AgentMarketplacePage />} />
          <Route path="/agents/:slug" element={<AgentDetailPage />} />
          <Route path="/agents/new" element={<NewAgentPage />} />
          <Route path="/agents/managed" element={<ManagedAgentsPage />} />
          <Route path="/agents/self-host" element={<SelfHostAgentsPage />} />
          
          {/* Affiliate */}
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/affiliate/apply" element={<AffiliateOnboardingPage />} />
          <Route path="/affiliate/dashboard" element={<AffiliateDashboardPage />} />
          <Route path="/affiliate/creatives" element={<AffiliateCreativesPage />} />
          <Route path="/affiliate/campaigns-manager" element={<AffiliateCampaignManagerPage />} />
          <Route path="/affiliate/compliance" element={<AffiliateComplianceMonitorPage />} />
          <Route path="/affiliate/leaderboard" element={<AffiliateLeaderboardPage />} />
          <Route path="/affiliate/learn/compliance" element={<AffiliateCompliancePage />} />
          
          {/* Decision */}
          <Route path="/decision" element={<DecisionPage />} />
          <Route path="/decision/quiz" element={<DecisionQuizPage />} />
          <Route path="/decision/guides" element={<DecisionGuidesPage />} />
          <Route path="/decision/comparisons" element={<DecisionComparisonsPage />} />
          
          {/* Tools */}
          <Route path="/tools" element={<ProfessionalToolsHub />} />
          <Route path="/tools/hub" element={<ProfessionalToolsHub />} />
          <Route path="/tools/resume" element={<ResumeToolPage />} />
          <Route path="/tools/cover-letter" element={<CoverLetterToolPage />} />
          <Route path="/tools/portfolio" element={<PortfolioToolPage />} />
          <Route path="/tools/email-optimizer" element={<EmailOptimizerToolPage />} />
          <Route path="/tools/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/tools/pitch-deck" element={<PitchDeckBuilderPage />} />
          <Route path="/tools/salary-calculator" element={<SalaryCalculatorPage />} />
          <Route path="/tools/brand-audit" element={<BrandAuditPage />} />
          
          {/* Enterprise */}
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/saas" element={<SaaSIndustryPage />} />
          <Route path="/industries/ecommerce" element={<EcommerceIndustryPage />} />
          <Route path="/industries/fintech" element={<FintechIndustryPage />} />
          <Route path="/industries/healthcare" element={<HealthcareIndustryPage />} />
          <Route path="/industries/education" element={<EducationIndustryPage />} />
          <Route path="/industries/services" element={<ServicesIndustryPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/security-center" element={<SecurityCenterPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/api" element={<APIPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/trust/security" element={<SecurityPage />} />
          <Route path="/trust/compliance" element={<CompliancePage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/pricing" element={<EnhancedPricingPage />} />
          
          {/* Resources */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:slug" element={<GuideDetailPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:section" element={<DocsSectionPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/status" element={<StatusPage />} />
          
          {/* Company */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Legal */}
          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          <Route path="/legal/cookies" element={<CookiesPage />} />
          <Route path="/legal/dpa" element={<DPAPage />} />
          
          {/* Auth */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/workflows" element={<DashboardWorkflowsPage />} />
          <Route path="/dashboard/agents" element={<DashboardAgentsPage />} />
          <Route path="/dashboard/agents/:deploymentId/config" element={<DashboardAgentConfigPage />} />
          <Route path="/dashboard/agents/:deploymentId/performance" element={<DashboardAgentPerformancePage />} />
          <Route path="/dashboard/library" element={<DashboardLibraryPage />} />
          <Route path="/dashboard/assets" element={<DashboardAssetsPage />} />
          <Route path="/dashboard/affiliate" element={<DashboardAffiliatePage />} />
          <Route path="/dashboard/settings" element={<DashboardSettingsPage />} />
          <Route path="/dashboard/activity" element={<DashboardActivityPage />} />
          <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
          <Route path="/dashboard/billing" element={<DashboardBillingPage />} />
          
          {/* Affiliate sub-pages */}
          <Route path="/affiliate/analytics" element={<AffiliateAnalyticsPage />} />
          <Route path="/affiliate/campaigns" element={<AffiliateCampaignsPage />} />
          <Route path="/affiliate/campaigns/new" element={<NewCampaignPage />} />
          <Route path="/affiliate/payouts" element={<AffiliatePayoutsPage />} />
          
          {/* Support */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
        
        <Footer />
        
        {/* Modals */}
        {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} onSwitchToSignUp={() => { setShowSignIn(false); setShowSignUp(true); }} />}
        {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} onSwitchToSignIn={() => { setShowSignUp(false); setShowSignIn(true); }} />}
      </div>
    </ToastProvider>
  );
}

export default App;