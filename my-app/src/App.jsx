// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import HomeLayout from "./pages/HomeLayout";
// import HomeContent from "./components/HomeContent"; // ✅ Add this
// import Signup from "./pages/signUp";
// import Login from "./pages/login";
// import PortfolioManager from "./components/PortfolioManager";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout />,
//     children: [
//       {
//         index: true, // This means default child route
//         element: <HomeContent />, // ✅ HomeContent renders QuickPicks & AlbumForYou
//       },
//     ],
//   },
//   {
//     path: "/profile",
//     element: <PortfolioManager />,
//   },
//   {
//     path: "/register",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },

// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import HomeContent from "./components/HomeContent";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import PortfolioManager from "./components/PortfolioManager";
import Profile from "./pages/Profile";   // ✅ Create this page

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true, 
        element: <HomeContent />, 
      },
    ],
  },
  {
    path: "/profile",
    element: <PortfolioManager />,
  },
  {
    path: "/me",                      // ✅ NEW
    element: <Profile />,             // This should show user info
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",                        // ✅ Fallback for unknown routes
    element: <h1>404 - Page Not Found</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
