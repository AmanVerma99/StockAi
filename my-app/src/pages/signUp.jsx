// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async () => {
//     try {
//       const res = await fetch("/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) alert("Signup success 🎉");
//       else alert(data.error || "Signup failed");
//     } catch (err) {
//       alert("❌ Signup error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
//       <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
//         {/* Left Image */}
//         <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-700 p-8">
//           <img
//             src="https://cdni.iconscout.com/illustration/premium/thumb/register-2602194-2189340.png"
//             alt="signup art"
//             className="max-w-full"
//           />
//         </div>

//         {/* Right Form */}
//         <div className="md:w-1/2 w-full p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>

//           <input
//             name="name"
//             type="text"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />

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

//           <button
//             onClick={handleSignup}
//             className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
//           >
//             REGISTER
//           </button>

//           <p className="text-center mt-6 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-pink-500 font-semibold hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup success 🎉");
        navigate("/me"); // ✅ Redirect after success
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("❌ Signup error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-700 p-8">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/register-2602194-2189340.png"
            alt="signup art"
            className="max-w-full"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create your account
          </h2>

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

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

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
          >
            REGISTER
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
