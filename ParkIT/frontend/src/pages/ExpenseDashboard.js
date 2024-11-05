import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const baseurl = process.env.REACT_APP_API_URL;

const ExpenseDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [averageExpense, setAverageExpense] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/expenses/${user._id}`);
        setExpenses(response.data.expenses);
        setTotalExpense(response.data.totalExpense);
        setAverageExpense(response.data.averageExpense);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Expense Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Expense</h2>
          <p className="text-3xl font-bold">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            Average Monthly Expense
          </h2>
          <p className="text-3xl font-bold">${averageExpense.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseDashboard;
