import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Define your component
export default function ItemsTrendingChart({ data }) {
  // Extract the keys (line names) from the first data object
  const lineKeys =
    data && data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== 'date')
      : []

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']

  // Function to format epoch timestamps to human-readable dates
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() // Customize this as per your requirement
  }

  const containError = () => {
    return data && data.hasOwnProperty('error')
  }

  return (
    <>
      {containError() && (
        <h2 className="text-center text-sm font-semibold leading-6 text-red-500">
          Error Fetching from the API
        </h2>
      )}
      <ResponsiveContainer width="97%" height={400}>
        <h2 className="text-center text-sm font-semibold leading-6 text-cyan-800">
          Interest Trends Over 5 Years Based on Interest Points, with 100
          Indicating High Interest
        </h2>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'date'} tickFormatter={formatTimestamp} />
          <YAxis />
          <Tooltip labelFormatter={formatTimestamp} />
          <Legend />
          {lineKeys.map((key, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
