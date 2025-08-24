import React, { useEffect, useState } from "react";

const PortfolioManager = () => {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    symbol: "",
    quantity: "",
    buyPrice: "",
    currentPrice: "",
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  // Fetch current user info
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUser(data.user);
      else console.error("User fetch failed:", data.error);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  };

  // Fetch user-owned stocks
 const fetchStocks = async () => {
  const token = localStorage.getItem("accessToken"); // ✅ Get token from localStorage

  if (!token) {
    console.error("❌ No token found. User might not be logged in.");
    return;
  }

  try {
    const res = await fetch("/api/stocks/my-stocks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
      },
    });

    const data = await res.json();

    if (res.ok) {
      setStocks(data); // ✅ Update state
    } else {
      console.error("❌ Stock fetch failed:", data.error || data.message);
    }
  } catch (err) {
    console.error("❌ Error fetching stocks:", err);
  }
};


  // Run on component mount if logged in
  useEffect(() => {
    if (token) {
      Promise.all([fetchUser(), fetchStocks()]).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("⚠ Please login first to add stocks");
      return;
    }

    const newStock = {
      symbol: form.symbol.toUpperCase(),
      quantity: Number(form.quantity),
      buyPrice: Number(form.buyPrice),
      currentPrice: Number(form.currentPrice),
    };

    try {
      const res = await fetch("/api/stocks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newStock),
      });

      const data = await res.json();
      if (res.ok) {
        setStocks([...stocks, data.stock]);
        setForm({ symbol: "", quantity: "", buyPrice: "", currentPrice: "" });
      } else {
        alert(data.error || "Failed to add stock");
      }
    } catch (err) {
      alert("❌ Add stock failed");
    }
  };

  const calculateProfit = (stock) =>
    ((stock.currentPrice - stock.buyPrice) * stock.quantity).toFixed(2);

  const totalProfit = stocks
    .reduce((acc, s) => acc + (s.currentPrice - s.buyPrice) * s.quantity, 0)
    .toFixed(2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        ⏳ Loading your portfolio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        {!token ? (
          <div className="text-center">
            <p className="text-red-400 font-semibold text-lg">
              ⚠ Please login or create an account to view and manage your stocks.
            </p>
          </div>
        ) : (
          <>
            {user && (
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold">👋 Welcome, {user.name}</h2>
                <p className="text-gray-400">Email: {user.email}</p>
                <p className="mt-2 font-medium text-blue-400">
                  You own <strong>{stocks.length}</strong> stocks | Total Profit/Loss:{" "}
                  <span
                    className={
                      totalProfit >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    ₹{totalProfit}
                  </span>
                </p>
              </div>
            )}

            {/* Add Stock Form */}
            <form
              onSubmit={handleAddStock}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              {["symbol", "quantity", "buyPrice", "currentPrice"].map((field) => (
                <input
                  key={field}
                  type={field === "symbol" ? "text" : "number"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 rounded bg-gray-900 border border-gray-600 focus:ring focus:ring-blue-600"
                />
              ))}
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
              >
                ➕ Add Stock
              </button>
            </form>

            {/* Stocks Table */}
            {stocks.length === 0 ? (
              <p className="text-center text-gray-400">No stocks added yet.</p>
            ) : (
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                  <tr>
                    <th className="px-4 py-2">Symbol</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Buy Price</th>
                    <th className="px-4 py-2">Current Price</th>
                    <th className="px-4 py-2">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="px-4 py-2 font-medium">{stock.symbol}</td>
                      <td className="px-4 py-2">{stock.quantity}</td>
                      <td className="px-4 py-2">₹{stock.buyPrice}</td>
                      <td className="px-4 py-2">₹{stock.currentPrice}</td>
                      <td
                        className={`px-4 py-2 font-semibold ${
                          calculateProfit(stock) >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        ₹{calculateProfit(stock)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;
