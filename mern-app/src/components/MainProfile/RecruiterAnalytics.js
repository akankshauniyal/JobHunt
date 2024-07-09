import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';
import './profile.css';

const RecruiterAnalytics = ({ views, clicks }) => {
  const data = [
    { name: 'Views', value: views },
    { name: 'Clicks', value: clicks },
  ];

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecruiterAnalytics;
