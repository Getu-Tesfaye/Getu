import Link from "next/link";

export default function Home() {
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

      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="small-title">WELCOME TO MY PORTFOLIO</p>

            <h1>
              Hi, I'm <span>Getu Tesfaye</span>
            </h1>

            <h2>Software & QA Engineer</h2>

            <p className="hero-description">
              Electrical Engineering graduate transitioning into software
              development and quality assurance. I enjoy building web
              applications, solving problems, and creating reliable software.
            </p>

            <div className="hero-buttons">
              <Link href="/projects" className="btn">
                View My Projects
              </Link>

              <Link href="/contact" className="btn btn-light">
                Contact Me
              </Link>
            </div>

            <div className="social-links">
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

          <div className="profile-card">
            <div className="profile-circle">GT</div>

            <h3>Engineering Mindset</h3>

            <p>
              Problem Solving
              <br />
              Software Development
              <br />
              Quality Assurance
            </p>

            <div className="profile-line"></div>

            <p className="learning">
              Always learning.
              <br />
              Always building.
            </p>
          </div>
        </section>

        <section className="skills-section">
          <p className="small-title">TECHNICAL SKILLS</p>

          <h2>What I Work With</h2>

          <div className="skills-grid">
            <div>HTML</div>
            <div>CSS</div>
            <div>JavaScript</div>
            <div>React</div>
            <div>Next.js</div>
            <div>Git</div>
            <div>GitHub</div>
            <div>Software Testing</div>
            <div>QA</div>
            <div>Debugging</div>
          </div>
        </section>

        <section className="background-section">
          <div>
            <p className="small-title">MY BACKGROUND</p>

            <h2>From Electrical Engineering to Software</h2>

            <p>
              My engineering background taught me analytical thinking,
              troubleshooting, technical problem solving, and attention to
              detail. I am now applying those skills to software development
              and quality assurance.
            </p>

            <Link href="/about" className="text-link">
              Learn More About Me →
            </Link>
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