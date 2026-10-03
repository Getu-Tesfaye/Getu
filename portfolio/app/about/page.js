import Link from "next/link";

export default function About() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <p className="section-label">ABOUT ME</p>

        <h1>
          Building software with an
          <br />
          engineering mindset.
        </h1>

        <p className="about-intro">
          I’m Getu Tesfaye, a Software Developer and QA Engineer with a
          background in Electrical and Computer Engineering. I am passionate
          about building web applications, solving technical problems, and
          creating reliable software.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>Who I Am</h2>

          <p>
            My engineering background has given me strong analytical thinking,
            troubleshooting, problem-solving, and attention-to-detail skills.
          </p>

          <p>
            I am currently developing my skills in software development and
            quality assurance through practical projects and hands-on
            training.
          </p>

          <p>
            I enjoy learning new technologies and turning ideas into useful,
            responsive, and reliable applications.
          </p>
        </div>

        <div className="about-card">
          <h2>What I Do</h2>

          <ul>
            <li>Web Application Development</li>
            <li>Frontend Development</li>
            <li>Manual & Functional Testing</li>
            <li>Bug Identification & Debugging</li>
            <li>Quality Assurance</li>
            <li>Problem Solving</li>
          </ul>
        </div>

      </section>

      <section className="about-cta">

        <p className="section-label">EXPLORE MY WORK</p>

        <h2>See what I have built.</h2>

        <Link href="/projects" className="primary-button">
          View My Projects →
        </Link>

      </section>

    </main>
  );
}