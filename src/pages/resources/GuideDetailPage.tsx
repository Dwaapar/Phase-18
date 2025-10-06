import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Star, Clock, FileText, Share2, Bookmark } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function GuideDetailPage() {
  const { slug } = useParams();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const { addToast } = useToast();

  // Mock guide data
  const guide = {
    title: "Complete Guide to Business Process Automation",
    description: "Everything you need to know about automating your business processes, from strategy to implementation and optimization.",
    category: "Automation",
    pages: 45,
    readTime: "30 min",
    rating: 4.9,
    downloads: "2.1k",
    lastUpdated: "December 2024",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    author: "Findawise Team",
    tableOfContents: [
      "Introduction to Business Process Automation",
      "Identifying Automation Opportunities", 
      "Choosing the Right Tools and Technologies",
      "Implementation Strategy and Best Practices",
      "Measuring Success and ROI",
      "Common Pitfalls and How to Avoid Them",
      "Future Trends and Emerging Technologies",
      "Case Studies and Real-World Examples",
      "Templates and Checklists",
      "Resources and Further Reading"
    ],
    content: `
      <h2>Introduction to Business Process Automation</h2>
      <p>Business Process Automation (BPA) is the use of technology to execute recurring tasks or processes in a business where manual effort can be replaced. It involves integrating applications, restructuring labor resources, and using software applications throughout the organization.</p>
      
      <p>In today's competitive landscape, automation isn't just a nice-to-have—it's essential for survival and growth. Organizations that embrace automation can operate more efficiently, reduce costs, improve accuracy, and scale their operations without proportional increases in headcount.</p>
      
      <h3>Why Automate?</h3>
      <p>The benefits of business process automation extend far beyond simple cost savings:</p>
      <ul>
        <li><strong>Reduce operational costs:</strong> Eliminate manual labor for repetitive tasks</li>
        <li><strong>Improve efficiency and productivity:</strong> Complete tasks faster and more accurately</li>
        <li><strong>Minimize human error:</strong> Reduce mistakes that can be costly and time-consuming</li>
        <li><strong>Enhance customer experience:</strong> Provide faster, more consistent service</li>
        <li><strong>Enable scalability:</strong> Handle increased workload without proportional staff increases</li>
        <li><strong>Improve compliance:</strong> Ensure consistent adherence to regulations and standards</li>
        <li><strong>Free up human resources:</strong> Allow employees to focus on higher-value activities</li>
      </ul>
      
      <h2>Implementation Strategy</h2>
      <p>A successful automation implementation requires careful planning and execution. Follow this proven methodology to ensure success.</p>
    `,
    tags: ["automation", "business process", "digital transformation", "efficiency", "strategy"]
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      addToast({
        type: 'success',
        title: 'Download started!',
        description: 'Your guide is being downloaded as a PDF.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Download failed',
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Guides
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="accent">{guide.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-monks-gray">
                  <Star className="text-yellow-500 fill-yellow-500" size={14} />
                  {guide.rating}
                </div>
              </div>
              
              <h1 className="text-display font-bold text-monks-black">
                {guide.title}
              </h1>
              
              <p className="text-xl text-monks-gray leading-relaxed">
                {guide.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-monks-gray">
                <div className="flex items-center gap-1">
                  <FileText size={14} />
                  {guide.pages} pages
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {guide.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Download size={14} />
                  {guide.downloads} downloads
                </div>
              </div>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-monks-black mb-2">Free</div>
                <p className="text-monks-gray">Download instantly</p>
              </div>
              
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
              >
                {isDownloading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Guide
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <button className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 size={14} />
                  Share
                </button>
                <button className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 flex items-center justify-center gap-2">
                  <Bookmark size={14} />
                  Save
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-monks-gray">Format:</span>
                  <span className="text-monks-black">PDF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">File Size:</span>
                  <span className="text-monks-black">8.5 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Last Updated:</span>
                  <span className="text-monks-black">{guide.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Author:</span>
                  <span className="text-monks-black">{guide.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-monks-black mb-8">Guide Preview</h2>
              
              <div className="bg-white rounded-3xl p-8 space-y-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-monks-black prose-p:text-monks-gray prose-li:text-monks-gray prose-strong:text-monks-black prose-code:text-monks-accent prose-code:bg-monks-light-gray prose-code:px-2 prose-code:py-1 prose-code:rounded"
                  dangerouslySetInnerHTML={{ __html: guide.content }}
                />
              </div>
            </div>

            {/* Table of Contents */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {guide.tableOfContents.map((item, i) => (
                    <li key={i} className="text-sm text-monks-gray hover:text-monks-black transition-colors duration-300 cursor-pointer flex items-start gap-3">
                      <span className="text-monks-accent font-medium">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Implement What You've Learned?</h2>
          <p className="text-xl text-white/80 mb-8">
            Put these automation strategies into practice with our platform and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/workflows"
              className="bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300"
            >
              Browse Workflows
            </Link>
            <Link
              to="/automation/pilot"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-monks-black transition-all duration-300"
            >
              Book 72h Pilot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}