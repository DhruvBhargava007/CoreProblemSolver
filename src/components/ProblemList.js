import React, { useState, useEffect } from 'react';
import { getProblems } from '../services/problemService';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const data = await getProblems();
      setProblems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recent Problems</h2>
      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{problem.problemType}</h3>
              <span className="text-sm text-gray-500">
                {new Date(problem.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Pallet ID: {problem.palletId}</p>
              <p className="mt-1">{problem.description}</p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>Action Taken:</strong> {problem.actionTaken}
              </p>
              {problem.escalatedTo && (
                <p className="mt-1 text-sm text-gray-700">
                  <strong>Escalated To:</strong> {problem.escalatedTo}
                </p>
              )}
              {problem.notes && (
                <p className="mt-1 text-sm text-gray-700">
                  <strong>Notes:</strong> {problem.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList; 