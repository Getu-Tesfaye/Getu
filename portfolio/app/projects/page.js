import Link from "next/link";

const addisEatsImages = [
  "/images/home.png",
  "/images/menu1.png",
  "/images/menu.png",
  "/images/cart.png",
  "/images/home1.png",
  "/images/add.png",
  "/images/edit.png",
  "/images/cart.png",
  "/images/card.png",
];

const ethioTelecomImages = [
  "/images/nexus.jpg",
  "/images/inoo.jpg",
  "/images/sets.jpg",
  "/images/launch.jpeg",
];

const adaptiveFilterImages = [
  "/images/sig_avg.png",
  "/images/signoiseratio2.jpg",
];

export default function Projects() {
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
        <p className="small-title">MY WORK</p>

        <h1 className="page-title">Projects</h1>

        <p className="page-intro">
          Here are some of the projects I have worked on while developing my
          software development and engineering skills.
        </p>

        <section className="project-section">
          <p className="project-label">01 — WEB APPLICATION</p>

          <h2>Addis Eats</h2>

          <p className="project-description">
            A food ordering web application built for customers and
            administrators. The application includes menu browsing, dish
            details, favorites, shopping cart, checkout, orders, and an admin
            dashboard.
          </p>

          <div className="project-gallery">
            {addisEatsImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Addis Eats screenshot ${index + 1}`}
              />
            ))}
          </div>

          <p className="project-tech">
            Technologies: React, JavaScript, HTML, CSS
          </p>
        </section>

        <section className="project-section">
          <p className="project-label">02 — WEBSITE</p>

          <h2>Ethio Telecom Website</h2>

          <p className="project-description">
            A responsive website project created to practice HTML and CSS,
            focusing on page structure, navigation, layouts, and responsive
            design.
          </p>

          <div className="project-gallery">
            {ethioTelecomImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Ethio Telecom screenshot ${index + 1}`}
              />
            ))}
          </div>

          <p className="project-tech">
            Technologies: HTML, CSS
          </p>
        </section>

        <section className="project-section">
          <p className="project-label">03 — ENGINEERING THESIS</p>

          <h2>Optimizing Signal-to-Noise Ratio Using Adaptive Filters</h2>

          <p className="project-description">
            My Electrical Engineering graduation project focused on adaptive
            filtering techniques for improving signal quality and optimizing
            signal-to-noise ratio.
          </p>

          <div className="project-gallery">
            {adaptiveFilterImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Adaptive filter project image ${index + 1}`}
              />
            ))}
          </div>

          <p className="project-tech">
            Technologies: MATLAB, Signal Processing, Adaptive Filtering
          </p>

         
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