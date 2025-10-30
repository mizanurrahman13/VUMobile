import React, { useState } from 'react';
import { createUser, type User } from '../api/services/UserService';

interface UserFormProps {
  onBack: () => void;
  onCreate: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onBack, onCreate }) => {
  const [form, setForm] = useState({ name: '', age: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUser(form);
    onCreate(newUser); // Add to list and switch view
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">Age</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:underline"
          >
            Go to User List
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
