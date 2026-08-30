import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo" style={{ textDecoration: "none" }}>
          <Image 
            src="/logo.png" 
            alt="Light Stream Loans Logo" 
            width={200} 
            height={50}
            className="header-logo-img"
          />
        </Link>
        <nav className="nav">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
