import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-white rounded-lg text-primary-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Nyumba</span>
          </div>
          <p className="text-gray-400 mb-6">
            Simplifying real estate in Zambia
          </p>
          <p className="text-sm text-gray-500">
            &copy; 2024 Nyumba. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Contact:{" "}
            <a
              href="mailto:contact@nyumba.co.zm"
              className="text-secondary-500 hover:underline"
            >
              contact@nyumba.co.zm
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
