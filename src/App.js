import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { router } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
