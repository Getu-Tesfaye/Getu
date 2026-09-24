import Link from "next/link";

export default function About() {
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
        <p className="small-title">ABOUT ME</p>

        <h1 className="page-title">Engineering background. Software future.</h1>

        <section className="about-card">
          <h2>Who I Am</h2>

          <p>
            I am Getu Tesfaye, an Electrical Engineering graduate currently
            developing my career in software development and quality
            assurance.
          </p>

          <p>
            My engineering background gave me a strong foundation in
            analytical thinking, problem solving, troubleshooting, and
            technical systems. I am applying these skills to software
            development and software testing.
          </p>

          <p>
            I enjoy learning new technologies, building practical projects,
            debugging applications, and continuously improving my technical
            skills.
          </p>
        </section>

        <section className="education">
          <p className="small-title">EDUCATION</p>

          <div className="education-card">
            <h2>Bachelor's Degree in Electrical and computer Engineering</h2>

            <p>
               Science and Technology University
            </p>

            <h3>Graduation Project</h3>

            <p>
              Optimizing Signal-to-Noise Ratio Using Adaptive Filters
            </p>
          </div>
        </section>

        <Link href="/projects" className="btn">
          View My Projects
        </Link>
      </main>

      <footer className="footer">
        <h3>Getu Tesfaye</h3>
        <p>Software & QA Engineer</p>
        <p>© 2026 Getu Tesfaye. All rights reserved.</p>
      </footer>
    </>
  );
}