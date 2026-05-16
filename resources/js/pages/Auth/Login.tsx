import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Login(): React.JSX.Element {
  // Inertia Form Hook manages values, errors, and processing states automatically
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    post('/login', {
      onFinish: () => reset('password'), // Wipe the password field if login fails
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="sm:mx-auto w-full max-w-md">
        <div className="text-center text-2xl font-bold tracking-tight text-slate-900">
          NEXUS<span className="text-blue-600">LABS</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition">
            create a new customer profile
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white px-4 py-8 shadow-sm rounded-2xl border border-slate-200 sm:px-10">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* EMAIL FIELD */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className={`block w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-300 focus:border-blue-500'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {/* SERVER-SIDE VALIDATION ERROR DISPLAY */}
              {errors.email && (
                <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`block w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-slate-300 focus:border-blue-500'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-xs font-medium text-red-600">{errors.password}</p>
              )}
            </div>

            {/* REMEMBER ME & FORGOT PASSWORD BOX */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 transition"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-slate-700 select-none">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* SUBMIT ACTION BUTTON */}
            <div>
              <button
                type="submit"
                disabled={processing}
                className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-600/50 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    {/* Clean Minimal CSS Loading Spinner */}
                    <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}