import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import Footer from './components/Footer';
import { fetchUsers, type User } from './api/services/UserService';

const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
  fetchUsers()
    .then(setUsers) // ✅ Directly set the array
    .catch(console.error);
  }, []);

  const addUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
    setView('list');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-50">
        <Navbar onNavigate={setView} />
      </div>
      <main className="flex-grow p-4 overflow-y-auto">
        {view === 'list' ? (
          <UserTable users={users} />
        ) : (
          <UserForm
            onBack={() => setView('list')}
            onCreate={(user) => {
              setUsers((prev) => [...prev, user]);
              setView('list');
            }}
          />
        )}
      </main>
      <div className="sticky bottom-0 z-40">
        <Footer />
      </div>
    </div>
  );
};

export default App;
