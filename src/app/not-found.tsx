import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
          <div className="text-6xl mb-4">🏠</div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          property might have been sold or the page may have moved.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="/properties">
            <Button size="lg" variant="outline">
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
