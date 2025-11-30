'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ViewsChartProps {
  data: { date: string; views: number }[];
}

export function ViewsChart({ data }: ViewsChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-[#9CA3AF]">
        No view data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A1F35" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF" 
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#9CA3AF" 
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1A1F35', 
            border: '1px solid #00D9FF',
            borderRadius: '8px',
            color: '#E8E9ED'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#00D9FF" 
          strokeWidth={2}
          dot={{ fill: '#00D9FF', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

