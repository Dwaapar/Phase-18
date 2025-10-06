import { useState } from 'react';
import { AlertTriangle, CheckCircle, Shield, ExternalLink, Info } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface ComplianceCheck {
  id: string;
  check_type: 'disclosure' | 'trademark' | 'claims' | 'content' | 'spam';
  url_checked: string;
  status: 'pass' | 'warning' | 'violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  checked_at: string;
  resolved: boolean;
}

export default function AffiliateComplianceMonitorPage() {
  const [checks] = useState<ComplianceCheck[]>([
    {
      id: '1',
      check_type: 'disclosure',
      url_checked: 'https://example.com/blog/best-automation-tools',
      status: 'warning',
      severity: 'medium',
      details: 'Affiliate disclosure present but should be more prominent at the top of the content',
      checked_at: '2025-01-15T10:30:00Z',
      resolved: false
    },
    {
      id: '2',
      check_type: 'claims',
      url_checked: 'https://example.com/review/findawise',
      status: 'pass',
      severity: 'low',
      details: 'All product claims are accurate and properly sourced',
      checked_at: '2025-01-14T14:20:00Z',
      resolved: true
    },
    {
      id: '3',
      check_type: 'trademark',
      url_checked: 'https://example.com/landing/automation',
      status: 'pass',
      severity: 'low',
      details: 'Findawise trademark and branding used correctly',
      checked_at: '2025-01-13T09:15:00Z',
      resolved: true
    },
    {
      id: '4',
      check_type: 'content',
      url_checked: 'https://example.com/comparison/tools',
      status: 'violation',
      severity: 'high',
      details: 'Content contains misleading comparison and unsubstantiated claims about competitor products',
      checked_at: '2025-01-12T16:45:00Z',
      resolved: false
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass': return <Badge variant="success">Pass</Badge>;
      case 'warning': return <Badge variant="warning">Warning</Badge>;
      case 'violation': return <Badge variant="error">Violation</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getCheckTypeIcon = (type: string) => {
    switch (type) {
      case 'disclosure': return <Info className="w-5 h-5" />;
      case 'trademark': return <Shield className="w-5 h-5" />;
      case 'claims': return <AlertTriangle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const passCount = checks.filter(c => c.status === 'pass').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;
  const violationCount = checks.filter(c => c.status === 'violation').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Compliance Monitor</h1>
          <p className="text-slate-600">
            Ensure your promotional content meets affiliate program requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Passed Checks</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{passCount}</p>
          </Card>

          <Card className="p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Warnings</p>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{warningCount}</p>
            <p className="text-sm text-slate-600 mt-1">Need attention</p>
          </Card>

          <Card className="p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Violations</p>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{violationCount}</p>
            <p className="text-sm text-red-600 mt-1">Immediate action required</p>
          </Card>
        </div>

        <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
          <h2 className="font-semibold text-slate-900 mb-3">Compliance Guidelines</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Disclosure:</strong> Clearly state your affiliate relationship at the beginning of content</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Trademark:</strong> Use Findawise name and logos correctly without modification</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Claims:</strong> Only make factual statements that can be verified</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Content:</strong> Provide honest reviews and avoid misleading comparisons</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {checks.map(check => (
            <Card key={check.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${getSeverityColor(check.severity)}`}>
                    {getCheckTypeIcon(check.check_type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 capitalize">
                        {check.check_type.replace('_', ' ')} Check
                      </h3>
                      {getStatusBadge(check.status)}
                      <Badge className={getSeverityColor(check.severity)}>
                        {check.severity.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <a
                        href={check.url_checked}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        {check.url_checked}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span>•</span>
                      <span>{new Date(check.checked_at).toLocaleDateString()}</span>
                    </div>

                    <p className="text-slate-700">{check.details}</p>

                    {check.status === 'warning' && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Recommended Action:</strong> Update your content to address this warning
                          and prevent potential violations.
                        </p>
                      </div>
                    )}

                    {check.status === 'violation' && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Required Action:</strong> You must address this violation immediately.
                          Failure to comply may result in commission reversal or account suspension.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!check.resolved && check.status !== 'pass' && (
                    <Button size="sm">
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-8 bg-slate-50">
          <h2 className="font-semibold text-slate-900 mb-3">Need Help?</h2>
          <p className="text-slate-700 mb-4">
            If you have questions about compliance requirements or need assistance resolving an issue,
            our affiliate support team is here to help.
          </p>
          <Button variant="outline">
            Contact Affiliate Support
          </Button>
        </Card>
      </Container>
    </div>
  );
}
