import Link from "next/link";

export default function Contact() {
  return (
    <>
      <header className="header">
        <div className="logo">Getu.</div>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="page">
        <p className="small-title">GET IN TOUCH</p>

        <h1 className="page-title">Contact Me</h1>

        <p className="page-intro">
          I am open to software development, QA, testing, and learning
          opportunities.
        </p>

        <section className="contact-card">
          <div className="contact-item">
            <strong>Name</strong>
            <p>Getu Tesfaye</p>
          </div>

          <div className="contact-item">
            <strong>Email</strong>
            <a href="mailto:getutesfaye919@gmail.com">
              getutesfaye919@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <strong>Phone</strong>
            <p>+251 900 770 469</p>
          </div>

          <div className="contact-item">
            <strong>GitHub</strong>

            <a
              href="https://github.com/Getu-Tesfaye/Getu"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Getu-Tesfaye/Getu
            </a>
          </div>

          <div className="contact-item">
            <strong>LinkedIn</strong>

            <a
              href="https://www.linkedin.com/in/getup-tesfaye/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/getup-tesfaye
            </a>
          </div>

          <div className="contact-item">
            <strong>Location</strong>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <h3>Getu Tesfaye</h3>
        <p>Software & QA Engineer</p>
        <p>© 2026 Getu Tesfaye. All rights reserved.</p>
      </footer>
    </>
  );
}