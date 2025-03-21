import { redirect } from 'next/navigation';
import WelcomeForm from './welcome-form';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Welcome to Tic-Tac-Toe!</h1>
        <p className="mb-6 sm:mb-8 text-center text-gray-600">
          Play the classic game against a smart AI opponent. Enter your name and email to get started.
        </p>
        <WelcomeForm />
      </div>
    </div>
  );
}