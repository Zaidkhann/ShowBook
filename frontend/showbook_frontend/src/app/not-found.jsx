import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] flex flex-col items-center justify-center text-white">
      <Image
        src="/notfoundpage.png"
        alt="Page not found"
        fill
        sizes="100vw"
        priority
      />

      <h1 className="text-4xl font-bold mt-6">Oops! Page Not Found</h1>

      <p className="text-gray-400 mt-2">
        Looks like this page left the theatre.
      </p>
    </div>
  );
}