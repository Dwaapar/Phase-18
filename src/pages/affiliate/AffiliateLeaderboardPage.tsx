import { useState } from 'react';
import { Trophy, TrendingUp, Award, Medal, Crown, Star } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface LeaderboardEntry {
  rank: number;
  affiliate_code: string;
  company_name: string;
  total_revenue: number;
  total_conversions: number;
  conversion_rate: number;
  tier: 'standard' | 'silver' | 'gold' | 'platinum';
  is_you?: boolean;
}

export default function AffiliateLeaderboardPage() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year' | 'all'>('month');

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      affiliate_code: 'FW-TECH001',
      company_name: 'TechBridge Media',
      total_revenue: 125000,
      total_conversions: 247,
      conversion_rate: 4.2,
      tier: 'platinum'
    },
    {
      rank: 2,
      affiliate_code: 'FW-ENTERPRISE',
      company_name: 'Enterprise Solutions Blog',
      total_revenue: 98500,
      total_conversions: 186,
      conversion_rate: 3.8,
      tier: 'platinum'
    },
    {
      rank: 3,
      affiliate_code: 'FW-AUTOMATION',
      company_name: 'Automation Weekly',
      total_revenue: 87200,
      total_conversions: 164,
      conversion_rate: 3.5,
      tier: 'gold'
    },
    {
      rank: 4,
      affiliate_code: 'FW-SAAS123',
      company_name: 'SaaS Review Hub',
      total_revenue: 76300,
      total_conversions: 142,
      conversion_rate: 3.2,
      tier: 'gold'
    },
    {
      rank: 5,
      affiliate_code: 'FW-GROWTH',
      company_name: 'Growth Marketing Pro',
      total_revenue: 65400,
      total_conversions: 128,
      conversion_rate: 3.0,
      tier: 'gold'
    },
    {
      rank: 6,
      affiliate_code: 'FW-YOURCODE',
      company_name: 'Your Company',
      total_revenue: 42100,
      total_conversions: 89,
      conversion_rate: 2.8,
      tier: 'silver',
      is_you: true
    },
    {
      rank: 7,
      affiliate_code: 'FW-DIGITAL',
      company_name: 'Digital Insights',
      total_revenue: 38900,
      total_conversions: 76,
      conversion_rate: 2.5,
      tier: 'silver'
    },
    {
      rank: 8,
      affiliate_code: 'FW-BUSINESS',
      company_name: 'Business Tools Review',
      total_revenue: 34200,
      total_conversions: 68,
      conversion_rate: 2.4,
      tier: 'silver'
    },
    {
      rank: 9,
      affiliate_code: 'FW-STARTUP',
      company_name: 'Startup Resources',
      total_revenue: 29800,
      total_conversions: 61,
      conversion_rate: 2.2,
      tier: 'silver'
    },
    {
      rank: 10,
      affiliate_code: 'FW-TECH456',
      company_name: 'Tech Finder',
      total_revenue: 25600,
      total_conversions: 54,
      conversion_rate: 2.0,
      tier: 'standard'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 text-center font-bold text-slate-400">{rank}</span>;
    }
  };

  const getTierBadge = (tier: string) => {
    const colors = {
      platinum: 'bg-gradient-to-r from-slate-400 to-slate-600 text-white',
      gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      silver: 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900',
      standard: 'bg-slate-100 text-slate-700'
    };

    return (
      <Badge className={colors[tier as keyof typeof colors]}>
        {tier.toUpperCase()}
      </Badge>
    );
  };

  const bonusTiers = [
    {
      tier: 'Bronze',
      revenue: 10000,
      bonus: '+2%',
      color: 'from-amber-600 to-amber-700',
      icon: Trophy
    },
    {
      tier: 'Silver',
      revenue: 25000,
      bonus: '+5%',
      color: 'from-slate-400 to-slate-500',
      icon: Medal
    },
    {
      tier: 'Gold',
      revenue: 50000,
      bonus: '+10%',
      color: 'from-yellow-400 to-yellow-600',
      icon: Award
    },
    {
      tier: 'Platinum',
      revenue: 100000,
      bonus: '+15%',
      color: 'from-slate-500 to-slate-700',
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Affiliate Leaderboard</h1>
          <p className="text-xl text-slate-600">
            Top performing affiliates and bonus rewards
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <Button
            size="sm"
            variant={period === 'month' ? 'primary' : 'outline'}
            onClick={() => setPeriod('month')}
          >
            This Month
          </Button>
          <Button
            size="sm"
            variant={period === 'quarter' ? 'primary' : 'outline'}
            onClick={() => setPeriod('quarter')}
          >
            This Quarter
          </Button>
          <Button
            size="sm"
            variant={period === 'year' ? 'primary' : 'outline'}
            onClick={() => setPeriod('year')}
          >
            This Year
          </Button>
          <Button
            size="sm"
            variant={period === 'all' ? 'primary' : 'outline'}
            onClick={() => setPeriod('all')}
          >
            All Time
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {bonusTiers.map((tier, index) => (
            <Card key={tier.tier} className={`p-6 bg-gradient-to-br ${tier.color} text-white`}>
              <div className="flex items-center justify-between mb-3">
                <tier.icon className="w-8 h-8" />
                <span className="text-3xl font-bold">{tier.bonus}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{tier.tier} Tier</h3>
              <p className="text-sm opacity-90">
                ${tier.revenue.toLocaleString()}+ revenue
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Performance Bonus Program
              </h2>
              <p className="text-slate-700 mb-4">
                Reach revenue milestones to earn bonus commissions on top of your standard rates.
                Bonuses are calculated monthly and apply to all eligible conversions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Monthly bonuses based on total revenue generated</span>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Cumulative rewards for consistent high performance</span>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Exclusive perks and priority support at top tiers</span>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Early access to new products and features</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Affiliate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tier</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Revenue</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Conversions</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">CVR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.affiliate_code}
                    className={entry.is_you ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-slate-50'}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {entry.company_name}
                          {entry.is_you && (
                            <Badge className="ml-2 bg-blue-600 text-white">You</Badge>
                          )}
                        </p>
                        <p className="text-sm text-slate-500">{entry.affiliate_code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getTierBadge(entry.tier)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-semibold text-slate-900">
                        ${entry.total_revenue.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-slate-900">{entry.total_conversions}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <p className="text-slate-900">{entry.conversion_rate}%</p>
                        {entry.conversion_rate > 3 && (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 mt-8 bg-slate-900 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Want to Climb the Leaderboard?</h3>
              <p className="text-slate-300">
                Access our affiliate success guide and learn proven strategies from top performers
              </p>
            </div>
            <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
              Download Guide
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
