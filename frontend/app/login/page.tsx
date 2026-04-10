"use client";
// Softer brutalist login page with improved color balance and animation


import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 font-sans">
      <div className="w-full max-w-md px-4">
        <Card className="w-full max-w-md shadow-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              {/* Company logo placeholder */}
              <div className="mb-2 flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 dark:bg-zinc-800">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="#2563eb"/>
                  <path d="M10 22L16 10L22 22H10Z" fill="white"/>
                </svg>
              </div>
              <CardTitle className="text-center text-2xl font-semibold text-gray-900 dark:text-white font-heading">Corporate Login</CardTitle>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-normal font-sans">Sign in to access your dashboard</p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-5 font-sans">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-sans">Email address</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 font-sans" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-200 font-sans">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" className="bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 font-sans" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors font-sans">Sign In</Button>
            </form>
            <div className="flex justify-between items-center mt-6 text-sm font-sans">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Forgot password?</a>
              <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}