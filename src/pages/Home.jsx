import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  


  return (
    <>
    
      <MainLayout>
  {!isLoggedIn ? (
    <div className=" flex flex-col items-center justify-center h-[888px] bg-gradient-to-r from-blue-400 to-purple-400 text-white py-8">
      <h1 className="text-6xl font-bold mb-6">Welcome to Task Manager App</h1>
      <Link
        to="/signup"
        className="bg-white text-blue-500 hover:text-blue-600 py-3 px-8 rounded-full font-semibold transition duration-300"
      >
        Join now to manage your tasks
      </Link>
    </div>
  ) : (
    <>
      <h1 className="mx-6 text-3xl font-bold text-white mt-8 mb-4 mx-6 bg-gradient-to-r from-blue-400 to-purple-400 py-2 px-4 rounded-lg">
  Welcome To Your Tasks {authState.user.name}
</h1>


      <div className="flex-grow">
        <Tasks />
      </div>
    </>
  )}
</MainLayout>


    </>
  )
}

export default Home