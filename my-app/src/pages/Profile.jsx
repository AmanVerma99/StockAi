import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // ✅ JWT from login
        if (!token) {
          setError("You must log in first!");
          setLoading(false);
          return;
        }

        // ✅ Correct backend URL (not Vite port!)
        const response = await fetch("http://localhost:5173/api/users/me", {
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
});


        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // redirect
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center space-x-4">
        <img
          src={user?.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.name || "No Name"}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-gray-700">
          {user?.bio || "No bio yet. Add one soon!"}
        </p>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => alert("Edit feature coming soon!")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
