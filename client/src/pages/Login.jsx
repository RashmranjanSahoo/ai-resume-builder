import { LockIcon, Mail, User2Icon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../configs/api";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlstate = query.get("state");
  const [state, setState] = React.useState(urlstate || "login");

  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login only needs email/password; registration also sends the name field.
      const payload =
        state === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const { data } = await api.post(`/api/users/${state}`, payload);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to reach the server. Please make sure the backend is running.";
      toast.error(message);

      if (state === "login" && message.toLowerCase().includes("invalid")) {
        setTimeout(() => {
          setState("register");
        }, 1000);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="glass-panel sm:w-[380px] w-full text-center rounded-2xl px-8"
      >
        <h1 className="text-slate-900 text-3xl mt-10 font-semibold dark:text-white">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-slate-500 text-sm mt-2 dark:text-slate-400">Please {state} to continue</p>
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white/80 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 dark:border-white/10 dark:bg-slate-950/70">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 bg-transparent dark:text-slate-100"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white/80 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 dark:border-white/10 dark:bg-slate-950/70">
          <Mail size={15} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 bg-transparent dark:text-slate-100"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white/80 border border-gray-300/80 h-12 rounded-full px-4 gap-2 dark:border-white/10 dark:bg-slate-950/70">
          <div className="flex items-center justify-center w-6">
            <LockIcon size={16} className="text-gray-500 flex-shrink-0" />{" "}
          </div>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="flex-1 border-none outline-none bg-transparent min-w-0 dark:text-slate-100"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center justify-center w-8 h-8 flex-shrink-0 text-slate-600 dark:text-slate-300"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        <div className="mt-4 text-left text-green-500">
          <button className="text-sm" type="reset">
            Forget password?
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 shadow-lg shadow-green-500/25 hover:bg-green-600 hover:-translate-y-0.5 transition-all"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-slate-500 text-sm mt-3 mb-11 dark:text-slate-400"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a href="#" className="text-green-500 hover:underline">
            click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
