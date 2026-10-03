export default function Contact() {
  return (
    <main className="contact-page">

      {/* Contact Header */}
      <section className="contact-hero">

        <p className="section-label">
          CONTACT
        </p>

        <h1>
          Let's connect
          <br />
          and work together.
        </h1>

        <p className="contact-intro">
          I am open to opportunities in software development, quality
          assurance, internships, and junior technology roles. Feel free
          to contact me through email, phone, GitHub, or LinkedIn.
        </p>

      </section>


      {/* Contact Information */}
      <section className="contact-content">

        <div className="contact-info">

          {/* Email */}
          <div className="contact-item">

            <p>EMAIL</p>

            <a href="mailto:getutesfaye919@gmail.com">
              getutesfaye919@gmail.com
            </a>

          </div>


          {/* Phone */}
          <div className="contact-item">

            <p>PHONE</p>

            <a href="tel:0900770469">
              0900770469
            </a>

            <a href="tel:0959146526">
              0959146526
            </a>

          </div>


          {/* GitHub */}
          <div className="contact-item">

            <p>GITHUB</p>

            <a
              href="https://github.com/Getu-Tesfaye"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Getu-Tesfaye ↗
            </a>

          </div>


          {/* LinkedIn */}
          <div className="contact-item">

            <p>LINKEDIN</p>

            <a
              href="https://www.linkedin.com/in/getup-tesfaye/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/getup-tesfaye ↗
            </a>

          </div>


          {/* CV */}
          <div className="contact-item">

            <p>RESUME</p>

            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View My CV ↗
            </a>

          </div>

        </div>


        {/* Contact Message */}
        <div className="contact-message">

          <p className="section-label">
            GET IN TOUCH
          </p>

          <h2>
            Have an opportunity
            <br />
            or want to connect?
          </h2>

          <p>
            Whether you are interested in my projects, have a job or
            internship opportunity, or simply want to connect, I would
            be happy to hear from you.
          </p>

          <a
            href="mailto:getutesfaye919@gmail.com"
            className="primary-button"
          >
            Send Me an Email →
          </a>

        </div>

      </section>


      {/* Current Interests */}
      <section className="contact-bottom">

        <p className="section-label">
          CURRENT INTERESTS
        </p>

        <div className="interest-list">

          <span>Software Development</span>

          <span>Quality Assurance</span>

          <span>Web Development</span>

          <span>Software Testing</span>

          <span>Junior Software Roles</span>

          <span>Technology</span>

        </div>

      </section>


      {/* Footer */}
      <footer className="contact-footer">

        <h3>
          Getu<span>.</span>
        </h3>

        <p>
          Software Developer | QA Engineer
        </p>

        <p>
          Addis Ababa, Ethiopia
        </p>

        <div className="contact-footer-links">

          <a
            href="https://github.com/Getu-Tesfaye"
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

          <a href="mailto:getutesfaye919@gmail.com">
            Email
          </a>

        </div>

        <p className="copyright">
          © 2026 Getu Tesfaye. All rights reserved.
        </p>

      </footer>

    </main>
  );
}