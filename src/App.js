import React, { useState } from 'react';
import './App.css';
import ProblemForm from './components/ProblemForm';
import ProblemList from './components/ProblemList';
import { createProblem } from './services/problemService';

// Mock data for problem types
const PROBLEM_TYPES = [
  { id: 1, name: 'General Storage Pallet Full', icon: '📦' },
  { id: 2, name: 'IRS Pallet Full', icon: '🔄' },
  { id: 3, name: 'Live Problem Solve Errors', icon: '⚡' },
  { id: 4, name: 'Seller Blocked', icon: '🚫' },
  { id: 5, name: 'Missing Expiration', icon: '📅' },
  { id: 6, name: 'No Printable Label', icon: '🏷️' },
  { id: 7, name: 'Shelf Errors', icon: '🗄️' },
  { id: 8, name: 'Brand Feedback', icon: '💬' },
  { id: 9, name: 'Research Request', icon: '🔍' },
  { id: 10, name: 'General Ticket', icon: '📝' },
];

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [step, setStep] = useState('selection'); // selection, scan, details, list
  const [scannedData, setScannedData] = useState({});
  const [error, setError] = useState(null);

  // Simulate scanning
  const handleScan = () => {
    const mockScanData = {
      palletId: 'PLT' + Math.floor(Math.random() * 10000),
      timestamp: new Date().toISOString()
    };
    setScannedData(mockScanData);
    setStep('details');
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting problem data:', {
        ...scannedData,
        ...formData,
        resolvedAt: new Date().toISOString()
      });
      
      const problemData = {
        ...scannedData,
        ...formData,
        resolvedAt: new Date().toISOString()
      };
      
      const response = await createProblem(problemData);
      console.log('Server response:', response);
      
      setStep('list');
      setSelectedProblem(null);
      setScannedData({});
      setError(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while submitting the form');
    }
  };

  // Render problem selection grid
  const renderProblemGrid = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {PROBLEM_TYPES.map(problem => (
        <button
          key={problem.id}
          onClick={() => {
            setSelectedProblem(problem);
            setStep('scan');
          }}
          className="p-4 border rounded-lg text-center hover:bg-gray-100"
        >
          <div className="text-3xl mb-2">{problem.icon}</div>
          <div>{problem.name}</div>
        </button>
      ))}
    </div>
  );

  // Render scan simulation screen
  const renderScanScreen = () => (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-4">Scan {selectedProblem.name}</h2>
      <button
        onClick={handleScan}
        className="p-8 bg-blue-500 text-white rounded-lg w-full mb-4"
      >
        Click to Simulate Scan
      </button>
      <button
        onClick={() => setStep('selection')}
        className="p-2 text-gray-600"
      >
        Back to Problems
      </button>
    </div>
  );

  // Render problem details form
  const renderDetailsForm = () => (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Scanned Data:</h3>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(scannedData, null, 2)}
        </pre>
      </div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <ProblemForm
        onSubmit={handleSubmit}
        problemType={selectedProblem.name}
      />
    </div>
  );

  // Main render logic
  return (
    <div className="App max-w-md mx-auto">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-xl">Warehouse Problem Solver</h1>
        <p className="text-sm mt-1">Quick Problem Resolution</p>
      </header>

      {step === 'selection' && renderProblemGrid()}
      {step === 'scan' && renderScanScreen()}
      {step === 'details' && renderDetailsForm()}
      {step === 'list' && <ProblemList />}
      
      {/* Navigation Button */}
      <button
        onClick={() => setStep(step === 'list' ? 'selection' : 'list')}
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg"
      >
        {step === 'list' ? '➕' : '📋'}
      </button>
    </div>
  );
}

export default App;
