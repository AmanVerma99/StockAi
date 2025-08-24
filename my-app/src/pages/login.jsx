// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) alert("Login success ✅");
//       else alert(data.error || "Login failed");
//     } catch (err) {
//       alert("❌ Login error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
//       <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
//         {/* Left Image */}
//         <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-700 p-8">
//           <img
//             src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757118.png"
//             alt="login art"
//             className="max-w-full"
//           />
//         </div>

//         {/* Right Form */}
//         <div className="md:w-1/2 w-full p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Sign in with</h2>
//           <div className="flex justify-center space-x-4 mb-4">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10">f</button>
//             <button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full w-10 h-10">t</button>
//             <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full w-10 h-10">in</button>
//           </div>

//           <div className="flex items-center my-4">
//             <hr className="flex-grow border-gray-600" />
//             <span className="px-2 text-sm text-gray-400">Or</span>
//             <hr className="flex-grow border-gray-600" />
//           </div>

//           <input
//             name="email"
//             type="email"
//             placeholder="Email address"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />

//           <div className="flex justify-between items-center text-sm mb-4">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="form-checkbox" />
//               Remember me
//             </label>
//             <a href="#" className="text-blue-400 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
//           >
//             LOGIN
//           </button>

//           <p className="text-center mt-6 text-sm">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-pink-500 font-semibold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store tokens and user info
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login success ✅");
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("❌ Login error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-700 p-8">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757118.png"
            alt="login art"
            className="max-w-full"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in with</h2>
          <div className="flex justify-center space-x-4 mb-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10">f</button>
            <button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full w-10 h-10">t</button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full w-10 h-10">in</button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-sm text-gray-400">Or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
          >
            LOGIN
          </button>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
