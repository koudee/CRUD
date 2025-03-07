import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300 py-6 text-center shadow-xl border-t border-gray-800 relative z-10">
      <div className="container mx-auto space-y-2">
        <p className="text-lg italic">
          Koushik did this. (You're welcome.)
        </p>
        <p className="text-sm">
          GitHub: (More code, yay.)
          <Link
            href="https://github.com/koudee"
            className="text-blue-400 hover:text-blue-300 underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profile
          </Link>
        </p>
        <p className="text-sm">
          LinkedIn: (If you insist.)
          <Link
            href="https://www.linkedin.com/in/kdas15/"
            className="text-blue-400 hover:text-blue-300 underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;