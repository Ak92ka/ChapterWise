import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="header-container">
      <img
        className="logo-header"
        src="/ChapterWise_logo.svg"
        alt="ChapterWise logo"
        width={130}
        height={60}
      />
      <a href="/app" className="app_button">
        TRY free
      </a>
      <FontAwesomeIcon className="hamburger" icon={faBars} />
    </header>
  );
}
