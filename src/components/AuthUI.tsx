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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
      <div className="abyss-bg" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block mb-6 relative">
            <div className="echo-orb w-16 h-16 mx-auto animate-glow" />
            <div className="absolute inset-0 bg-accent/10 blur-2xl rounded-full" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold tracking-[0.3em] gold-glow uppercase">
            DEPTHS<br />LEDGER
          </h1>
          <p className="text-muted mt-4 tracking-[0.4em] text-xs uppercase font-medium">Wind Tracker</p>
        </div>

        <div className="panel p-8">
          <h2 className="font-display text-center text-foreground tracking-rune uppercase mb-6 text-sm">
            {isRegister ? "Inscribe your seal" : "Enter the Abyss"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-muted text-[10px] tracking-rune uppercase mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grimoire-input w-full px-4 py-3 rounded"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-muted text-[10px] tracking-rune uppercase mb-2 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="grimoire-input w-full px-4 py-3 rounded"
                placeholder="••••••••"
                autoComplete={isRegister ? "new-password" : "current-password"}
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-muted text-[10px] tracking-rune uppercase mb-2 font-semibold">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="grimoire-input w-full px-4 py-3 rounded"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && (
              <div className="text-[oklch(0.42_0.18_25)] text-sm text-center py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="grimoire-btn w-full py-4 rounded text-xs font-semibold disabled:opacity-50"
            >
              {loading ? "Loading..." : isRegister ? "Inscribe" : "Descend"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="text-muted text-sm hover:text-gold transition-colors"
            >
              {isRegister ? "Already inscribed? Enter the Abyss" : "New soul? Inscribe your seal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
