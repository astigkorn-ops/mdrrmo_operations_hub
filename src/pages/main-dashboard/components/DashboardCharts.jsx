import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const DashboardCharts = () => {
  const incidentTrendsData = [
    { month: 'Jan', incidents: 12, resolved: 10 },
    { month: 'Feb', incidents: 8, resolved: 8 },
    { month: 'Mar', incidents: 15, resolved: 13 },
    { month: 'Apr', incidents: 6, resolved: 6 },
    { month: 'May', incidents: 18, resolved: 16 },
    { month: 'Jun', incidents: 22, resolved: 20 },
    { month: 'Jul', incidents: 25, resolved: 22 },
    { month: 'Aug', incidents: 19, resolved: 18 },
    { month: 'Sep', incidents: 14, resolved: 12 }
  ];

  const responseTimeData = [
    { week: 'Week 1', avgTime: 45 },
    { week: 'Week 2', avgTime: 38 },
    { week: 'Week 3', avgTime: 42 },
    { week: 'Week 4', avgTime: 35 }
  ];

  const incidentTypeData = [
    { name: 'Flooding', value: 35, color: '#3B82F6' },
    { name: 'Landslide', value: 20, color: '#EF4444' },
    { name: 'Fire', value: 15, color: '#F59E0B' },
    { name: 'Earthquake', value: 12, color: '#10B981' },
    { name: 'Others', value: 18, color: '#6B7280' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Incident Trends Chart */}
      <div className="xl:col-span-2 bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Incident Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly incident reports and resolution rates</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs text-muted-foreground">Reported</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Resolved</span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-64" aria-label="Monthly Incident Trends Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incidentTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="incidents" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Response Time Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Response Time</h3>
            <p className="text-sm text-muted-foreground">Average response time (minutes)</p>
          </div>
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="w-full h-64" aria-label="Weekly Response Time Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="week" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="avgTime" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target: &lt; 30 min</span>
            <span className="text-sm font-medium text-warning">Current: 35 min</span>
          </div>
        </div>
      </div>
      {/* Incident Types Distribution */}
      <div className="lg:col-span-2 xl:col-span-1 bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Incident Types</h3>
            <p className="text-sm text-muted-foreground">Distribution by category</p>
          </div>
          <Icon name="PieChart" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="w-full h-64" aria-label="Incident Types Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incidentTypeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {incidentTypeData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {incidentTypeData?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-foreground">{item?.name}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {item?.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;