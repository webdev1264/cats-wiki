import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Root from "./router/root";
import Admin from "./components/Admin/Admin";
import Main from "./router/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
