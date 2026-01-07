export default function Footer() {
  return (
    <div className="footer-container">
      <img
        className="logo-footer"
        src="/ChapterWise_logo.svg"
        alt="ChapterWise logo"
        width={130}
        height={60}
      />
      <p className="tagline-footer">Built for university students</p>
      {/* social media icons */}
      {/* language selector */}
      <a className="p-footer-14">Cookie settings</a>
      <p className="p-footer-14 copyright">@ 2026 ChapterWise</p>
      <ul>
        <li className="list-headline">Company</li>
         <li>About us</li>
        <li>Pricing</li>
        <li>Blog</li>
        <li>Contact</li>
        <li>Terms & privacy</li>       
      </ul>
    </div>
  );
}
