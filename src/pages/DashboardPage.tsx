import React from 'react';
import { BarChart3, Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { formatDateTime } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    name: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Sales',
    value: '+12,234',
    change: '+19%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Active Now',
    value: '573',
    change: '+201',
    changeType: 'positive',
    icon: Activity,
  },
];

const recentActivities = [
  {
    id: '1',
    title: 'New user registration',
    description: 'John Smith created an account',
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: '2',
    title: 'Payment received',
    description: 'Received $299.00 from Sarah Johnson',
    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: '3',
    title: 'Report generated',
    description: 'Monthly analytics report is ready',
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
];

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening with your business today.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <Icon icon="material-symbols:logout-rounded" className="text-xl" />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} glass hover className="group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2">
            <Card glass>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Analytics Overview
                  </h2>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Chart component would go here
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      Integrate with your favorite charting library
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card glass>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatDateTime(activity.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}