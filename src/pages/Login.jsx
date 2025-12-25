// // // import { useState } from "react";
// // // import { logIn } from "../firebase/auth";

// // // export default function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [error, setError] = useState("");

// // //   const handleLogin = async () => {
// // //     try {
// // //       await logIn(email, password);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-card">
// // //       <h2>🔐 Login</h2>

// // //       <input
// // //         placeholder="Email"
// // //         value={email}
// // //         onChange={(e) => setEmail(e.target.value)}
// // //       />

// // //       <input
// // //         type="password"
// // //         placeholder="Password"
// // //         value={password}
// // //         onChange={(e) => setPassword(e.target.value)}
// // //       />

// // //       {error && <p className="error">{error}</p>}

// // //       <button onClick={handleLogin}>Login</button>
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";
// // import { login } from "../firebase/auth";
// // import { useNavigate, Link } from "react-router-dom";
// // import "./Auth.css";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       setLoading(true);
// //       await login(email, password);
// //       navigate("/inventory");
// //     } catch (err) {
// //       alert("Invalid credentials");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="auth-container">
// //       <form className="auth-card" onSubmit={handleLogin}>
// //         <h2>Login</h2>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           required
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           required
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />

// //         <button disabled={loading}>
// //           {loading ? "Logging in..." : "Login"}
// //         </button>

// //         <p className="auth-link">
// //           Don’t have an account? <Link to="/signup">Sign up</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { logIn } from "../firebase/auth";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await logIn(email, password);
//       navigate("/");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>

//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
