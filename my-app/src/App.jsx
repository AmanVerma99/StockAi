import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import HomeContent from "./components/HomeContent"; // ✅ Add this

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true, // This means default child route
        element: <HomeContent />, // ✅ HomeContent renders QuickPicks & AlbumForYou
      },
    ],
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
