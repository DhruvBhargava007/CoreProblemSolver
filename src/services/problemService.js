import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Map problem types to ticket types
const mapProblemTypeToTicketType = (problemType) => {
  switch (problemType) {
    case 'General Storage Pallet Full':
      return 'general';
    case 'IRS Pallet Full':
      return 'general';
    case 'Live Problem Solve Errors':
      return 'general';
    case 'Seller Blocked':
      return 'general';
    case 'Missing Expiration':
      return 'general';
    case 'No Printable Label':
      return 'general';
    case 'Shelf Errors':
      return 'general';
    case 'Brand Feedback':
      return 'brand';
    case 'Research Request':
      return 'research';
    case 'General Ticket':
      return 'general';
    default:
      return 'general';
  }
};

export const createProblem = async (problemData) => {
  try {
    const ticketType = mapProblemTypeToTicketType(problemData.problemType);
    const response = await axios.post(`${API_URL}/tickets/${ticketType}`, {
      ...problemData,
      ticketType: ticketType,
      status: 'open',
      priority: 'medium',
      description: problemData.actionTaken || 'No description provided'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProblemById = async (id, type) => {
  try {
    const ticketType = mapProblemTypeToTicketType(type);
    const response = await axios.get(`${API_URL}/tickets/${ticketType}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 