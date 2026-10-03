import Link from "next/link";

export default function Education() {
  return (
    <main className="education-page">

      <section className="education-hero">
        <p className="section-label">EDUCATION & CERTIFICATIONS</p>

        <h1>
          My education,
          <br />
          training and certificates.
        </h1>

        <p className="education-intro">
          My background combines Electrical and Computer Engineering with
          practical training in software development, technology, AI,
          databases, networking, and entrepreneurship.
        </p>
      </section>

      {/* Degree */}
      <section className="education-list">

        <article className="education-card">

          <div className="education-number">
            01
          </div>

          <div className="education-info">

            <p className="education-type">
              BACHELOR'S DEGREE
            </p>

            <h2>
              Electrical and Computer Engineering
            </h2>

            <h3>
              Communication Stream
            </h3>

            <p>
              Completed a five-year university program in Electrical and
              Computer Engineering with a focus on the Communication Stream.
              The program developed my foundation in engineering, technical
              problem solving, communication systems, and analytical thinking.
            </p>

            <p className="education-result">
              GPA: <strong>3.36 / 4.00</strong>
            </p>

          </div>

        </article>

        {/* IBT College */}
        <article className="education-card">

          <div className="education-number">
            02
          </div>

          <div className="education-info">

            <p className="education-type">
              ADVANCED DIGITAL SKILLS TRAINING
            </p>

            <h2>
              Software Development & Quality Assurance
            </h2>

            <h3>
              IBT College of Canada
            </h3>

            <p>
              Practical training focused on software development, web
              technologies, quality assurance, software testing, debugging,
              and building real-world applications.
            </p>

          </div>

        </article>

      </section>

      {/* Certificates */}
      <section className="certificates-section">

        <p className="section-label">
          CERTIFICATES & TRAINING
        </p>

        <h2>
          Additional technical learning.
        </h2>

        <div className="certificate-grid">

          <div className="certificate-card">
            <span>01</span>
            <h3>Programming Fundamentals</h3>
            <p>Udacity</p>
            <small>2024 – 2025</small>
          </div>

          <div className="certificate-card">
            <span>02</span>
            <h3>AI Fundamentals</h3>
            <p>Udacity</p>
            <small>2024 – 2025</small>
          </div>

          <div className="certificate-card">
            <span>03</span>
            <h3>Android Development Fundamentals</h3>
            <p>Udacity</p>
            <small>2024 – 2025</small>
          </div>

          <div className="certificate-card">
            <span>04</span>
            <h3>Database Administration Fundamentals</h3>
            <p>Udacity</p>
            <small>2024 – 2025</small>
          </div>

          <div className="certificate-card">
            <span>05</span>
            <h3>Cisco Training & Certificates</h3>
            <p>Cisco</p>
            <small>2024 – 2025</small>
          </div>

          <div className="certificate-card">
            <span>06</span>
            <h3>Certificate of Training</h3>
            <p>Ministry of Peace</p>
            <small>2024</small>
          </div>

          <div className="certificate-card">
            <span>07</span>
            <h3>Entrepreneurship Training</h3>
            <p>Mesmer</p>
            <small>2024</small>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="education-cta">

        <p className="section-label">
          NEXT
        </p>

        <h2>
          Let's connect and
          <br />
          work together.
        </h2>

        <Link href="/contact" className="primary-button">
          Contact Me →
        </Link>

      </section>

    </main>
  );
}