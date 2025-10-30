import axios from 'axios';

const BASE_URL = 'https://localhost:7221/api/Users';

export interface User {
  id?: number;
  name: string;
  age: string;
  email: string;
  timeStamp?: string;
}

export const fetchUsers = async (page: number = 1): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_URL}/fetch-users?page=${page}`);
  return response.data;
};

// export const createUser = async (userData: Omit<User, 'id' | 'timeStamp'>): Promise<User> => {
//   const response = await axios.post<User>(`${BASE_URL}/create-users`, userData);
//   return response.data;
// };

// export const createUser = async (
//   userData: Omit<User, 'id' | 'timeStamp'>
// ): Promise<User> => {
//   const newUser: User = {
//     id: Math.floor(Math.random() * 10000), // Simulated ID
//     ...userData,
//     timeStamp: new Date().toISOString(),
//   };

//   // Simulate a delay like a real API
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(newUser), 500);
//   });
// };

// export const createUser = async (
//   userData: Omit<User, 'id' | 'timeStamp'>
// ): Promise<User> => {
//   // Create a new user object with simulated ID and timestamp
//   const newUser: User = {
//     id: Math.floor(Math.random() * 10000),
//     ...userData,
//     timeStamp: new Date().toISOString(),
//   };

//   // Save to your .NET Web API
//   try {
//     const response = await axios.post<User>(`${BASE_URL}/create-users`, newUser);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to save user to API:', error);
//     throw error;
//   }
// };

export const createUser = async (
  userData: Omit<User, 'id' | 'timeStamp'>
): Promise<User> => {
  try {
    // Send only the user input — backend will generate ID and timestamp
    const response = await axios.post<User>(`${BASE_URL}/create-users-with-form-input`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to save user to API:', error);
    throw error;
  }
};