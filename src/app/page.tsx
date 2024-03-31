import Image from "next/image";
import TodoForm from "../components/TodoForm";
import { ChromeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Link href={'/auth/sign-in'}>
      <Button className="w-full max-w-sm" variant="outline">
        <ChromeIcon className="h-5 w-5 mr-2" />
        Sign-In
      </Button>
      </Link>
    </main>
  );
}
