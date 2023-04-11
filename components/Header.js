import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link href="/" passHref>
          <h1>查爾斯文章坊</h1>
        </Link>
      </div>
    </header>
  );
}
