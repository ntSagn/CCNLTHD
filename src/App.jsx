import React from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import TodoList from './pages/TodoList'
import WeatherApp from './pages/WeatherApp'
import TicTacToe from './pages/TicTacToe'
import Game from './components/tic-tac-toe/Game'
import Profile from './pages/Profile'
import ProfileList from './pages/ProfileList'

import { ProfileProvider } from './context/ProfileContext'

// Create a NavBar component that uses useLocation
const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path) => {
    if (path === '/' && currentPath === '/') {
      return true;
    }
    return path !== '/' && currentPath.startsWith(path);
  };
  
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Tổng Hợp Bài Tập</h1>
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`text-lg transition-colors ${isActive('/') ? 'text-blue-500 font-medium' : 'hover:text-blue-500'}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/todo" 
              className={`text-lg transition-colors ${isActive('/todo') ? 'text-blue-500 font-medium' : 'hover:text-blue-500'}`}
            >
              Todo List
            </Link>
          </li>
          <li>
            <Link 
              to="/weather" 
              className={`text-lg transition-colors ${isActive('/weather') ? 'text-blue-500 font-medium' : 'hover:text-blue-500'}`}
            >
              Weather App
            </Link>
          </li>
          <li>
            <Link 
              to="/tictactoe" 
              className={`text-lg transition-colors ${isActive('/tictactoe') ? 'text-blue-500 font-medium' : 'hover:text-blue-500'}`}
            >
              Tic Tac Toe
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`text-lg transition-colors ${isActive('/profile') ? 'text-blue-500 font-medium' : 'hover:text-blue-500'}`}
            >
              User Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          {/* We need to move the NavBar inside Routes to use useLocation */}
          <Routes>
            <Route path="*" element={
              <>
                <NavBar />
                <Routes>
                  <Route path="/" element={
                    <div className="container mx-auto p-8 text-center">
                      <h2 className="text-3xl font-bold mb-4">Welcome to React Apps Collection</h2>
                      <p className="text-lg mb-6">Choose an application from the navigation menu</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <Link to="/todo" className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                          <h3 className="text-xl font-semibold mb-2">Todo List App</h3>
                          <p>Manage your tasks efficiently with our Todo List application</p>
                        </Link>
                        <Link to="/weather" className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                          <h3 className="text-xl font-semibold mb-2">Weather App</h3>
                          <p>Check weather conditions for any location around the world</p>
                        </Link>
                        <Link to="/tictactoe" className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                          <h3 className="text-xl font-semibold mb-2">Tic Tac Toe</h3>
                          <p>Play the classic Tic Tac Toe game with friends or against AI</p>
                        </Link>
                        <Link to="/profile" className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                          <h3 className="text-xl font-semibold mb-2">User Profile</h3>
                          <p>View and manage user profiles with React components</p>
                        </Link>
                      </div>
                    </div>
                  } />
                  <Route path="/todo" element={<TodoList />} />
                  <Route path="/weather" element={<WeatherApp />} />
                  <Route path="/tictactoe" element={<TicTacToe />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/profile" element={<ProfileList />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="*" element={
                    <div className="container mx-auto p-8 text-center">
                      <h2 className="text-3xl font-bold text-red-500">404 - Page Not Found</h2>
                      <p className="mt-4">Trang bạn đang tìm kiếm không tồn tại!</p>
                      <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg">
                        Go Home
                      </Link>
                    </div>
                  } />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App