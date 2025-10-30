import React, { useState } from 'react';
import { type User } from '../api/services/UserService';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 50;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="table-auto w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Age</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id ?? `${user.name}-${user.email}`} className="bg-white border-b">
              <td className="px-6 py-4">{user.id ?? '—'}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.age}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {user.timeStamp ? new Date(user.timeStamp).toLocaleString() : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {startIndex + 1}–{Math.min(startIndex + usersPerPage, users.length)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{users.length}</span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 h-8 flex items-center justify-center border rounded-s-lg ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </button>
          </li>
          <li>
            <span className="px-3 h-8 flex items-center justify-center border bg-blue-50 text-blue-600">
              {currentPage}
            </span>
          </li>
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 h-8 flex items-center justify-center border rounded-e-lg ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
