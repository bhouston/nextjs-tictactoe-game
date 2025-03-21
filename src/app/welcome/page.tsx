import { redirect } from 'next/navigation';
import WelcomeForm from './welcome-form';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Tic-Tac-Toe!</h1>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
          Play the classic game against a smart AI opponent. Enter your name and email to get started.
        </p>
        <WelcomeForm />
      </div>
    </div>
  );
}