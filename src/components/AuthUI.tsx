import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function AuthUI() {
  const { signIn, signUp } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    if (isRegister) {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setError("Check your email to confirm your account!");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-abyss_dark relative overflow-hidden">
      <div className="abyss-bg" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 relative">
              <svg className="w-20 h-20 mx-auto text-cyan_wind cyan-depth-glow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
              </svg>
              <div className="absolute inset-0 bg-cyan_wind/10 blur-xl rounded-full" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-cyan_wind tracking-[0.4em] cyan-depth-glow">DEEPWOKEN</h1>
            <p className="text-text_dim mt-4 tracking-[0.5em] text-sm uppercase font-light">Wind Tracker</p>
          </div>

          <div className="abyss-card rounded-lg p-8">
            <h2 className="text-xl font-serif text-center text-text_main mb-6">
              {isRegister ? "Create Account" : "Enter the Abyss"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-text_dim text-xs tracking-widest uppercase mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="abyss-input w-full px-4 py-3 rounded font-light"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-text_dim text-xs tracking-widest uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="abyss-input w-full px-4 py-3 rounded font-light"
                  placeholder="••••••••"
                  autoComplete={isRegister ? "new-password" : "current-password"}
                />
              </div>

              {isRegister && (
                <div>
                  <label className="block text-text_dim text-xs tracking-widest uppercase mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="abyss-input w-full px-4 py-3 rounded font-light"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {error && (
                <div className="text-blood text-sm text-center py-2">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="abyss-btn w-full py-4 rounded text-sm disabled:opacity-50"
              >
                {loading ? "Loading..." : isRegister ? "Register" : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="text-text_dim text-sm hover:text-cyan_wind transition-colors"
              >
                {isRegister ? "Already have an account? Login" : "No account? Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}