import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./router/root";
import Details from "./router/details";
import Main from "./router/main";
import Admin from "./components/Admin/Admin";
import loader from "./utils/routerLoader";
import "./App.scss";
import AllBreeds from "./components/AllBreeds/AllBreeds";

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
        path: "/details/:name",
        element: <Details />,
        loader,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/all-breeds",
        element: <AllBreeds />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
