export default function Footer() {
  return (
    <footer className="contact-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>
            Getu <span>Tesfaye</span>
          </h3>

          <p>
            Software Developer <span>•</span> QA Engineer
          </p>

          <p className="footer-description">
            Building reliable, user-friendly, and modern web applications.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <a href="/about">About</a>
          <a href="/skills">Skills</a>
          <a href="/projects">Projects</a>
          <a href="/experience">Experience</a>
          <a href="/education">Education</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>

          <a
            href="https://github.com/Getu-Tesfaye/Getu"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/getup-tesfaye/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Getu Tesfaye. All rights reserved.</p>
        <p>Designed & Built with Next.js</p>
      </div>
    </footer>
  );
}