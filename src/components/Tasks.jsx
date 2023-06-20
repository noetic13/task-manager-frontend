import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }


  return (
    <>
    
      <div className="my-2 mx-auto max-w-[700px] py-4 bg-blue-200 rounded-md shadow-md">
  {tasks.length !== 0 && <h2 className="my-2 ml-2 md:ml-0 text-xl text-white bg-blue-500 py-2 px-4 rounded-md">Your tasks ({tasks.length})</h2>}
  {loading ? (
    <Loader />
  ) : (
    <div>
      {tasks.length === 0 ? (
        <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
          <span className="text-black">No tasks found</span>
          <Link
            to="/tasks/add"
            className="bg-purple-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2"
          >
            + Add new task
          </Link>
        </div>
      ) : (
        tasks.map((task, index) => (
          <div key={task._id} className="bg-white my-4 p-4 text-gray-600 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-purple-600 font-medium">Task #{index + 1}</span>
              <div className="flex gap-2">
                <Tooltip text={"Edit this task"} position={"top"}>
                  <Link to={`/tasks/${task._id}`} className="text-green-600 cursor-pointer">
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                </Tooltip>
                <Tooltip text={"Delete this task"} position={"top"}>
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(task._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="whitespace-pre">{task.description}</div>
          </div>
        ))
      )}
    </div>
  )}
</div>



    </>
  )

}

export default Tasks