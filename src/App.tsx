import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./views/TaskList";
import TaskForm from "./views/CreateTaskForm";
import UpdateFormTask from "./views/UpdateTaskForm";  // Asegúrate de importar el componente

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthLayout from "./layouts/AuthLayout";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import PrivateRoute from "./components/PrivateRoute";
import HomeView from "./views/HomeView";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<AuthLayout/>}>
            
            <Route path="/task/list" element=
            <PrivateRoute>
              {<TaskList />}
            </PrivateRoute> 
            />
            
            <Route path="/task/form" element=
            <PrivateRoute>
              {<TaskForm />} 
            </PrivateRoute>
            />
           
            <Route path="/task/update/:taskId" element=
            <PrivateRoute>
              {<UpdateFormTask />} 
            </PrivateRoute>
            /> 
          </Route>

         
          <Route path="/auth/register" element={<RegisterView/>}/>
          <Route path="/auth/login" element={<LoginView/>}/>

          <Route path="/" element={<HomeView/>}/>
        
          

        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
