import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header-container">
      <Link href="/">
      <img
        className="logo-header"
        src="/ChapterWise_logo.svg"
        alt="ChapterWise logo"
        width={130}
        height={60}
      />
      </Link>
      <a href="/app" className="header-cta">
        TRY free
      </a>
      <FontAwesomeIcon className="hamburger" icon={faBars} />
    </header>
  );
}
