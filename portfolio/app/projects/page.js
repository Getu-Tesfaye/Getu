import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Addis Eats",
    type: "WEB APPLICATION",
    description:
      "A food ordering web application with menu browsing, dish details, favorites, shopping cart, checkout, orders, and an admin dashboard.",
    technologies: "React • JavaScript • HTML • CSS",
    live: "https://addis-eats-react-red.vercel.app/",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
  {
    number: "02",
    title: "Birr Watch",
    type: "WEB APPLICATION",
    description:
      "A currency conversion and watchlist application designed to practice working with exchange rates, user interactions, and responsive interfaces.",
    technologies: "JavaScript • React • CSS",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
  {
    number: "03",
    title: "Simple Calculator",
    type: "PYTHON PROJECT",
    description:
      "A simple console-based calculator created to practice Python programming, user input, calculations, and basic program logic.",
    technologies: "Python",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
  {
    number: "04",
    title: "Addis Bank Account System",
    type: "PYTHON PROJECT",
    description:
      "A banking application created to practice object-oriented programming, account management, deposits, withdrawals, and basic transaction logic.",
    technologies: "Python • OOP",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
  {
    number: "05",
    title: "Pharmacy Inventory Tracker",
    type: "PYTHON PROJECT",
    description:
      "An inventory management project using dictionaries and file handling to manage pharmacy products and inventory information.",
    technologies: "Python • Dictionaries • File Handling",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
  {
    number: "06",
    title: "Ethio Telecom Website",
    type: "WEBSITE",
    description:
      "A responsive website project created to practice HTML structure, CSS styling, navigation, layouts, and responsive web design.",
    technologies: "HTML • CSS",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
  {
    number: "07",
    title: "Optimizing Signal-to-Noise Ratio Using Adaptive Filters",
    type: "ENGINEERING PROJECT",
    description:
      "An Electrical and Computer Engineering graduation project focused on adaptive filtering techniques for improving signal quality and signal-to-noise ratio.",
    technologies: "MATLAB • Signal Processing • Adaptive Filtering",
    github: "https://github.com/Getu-Tesfaye/Getu",
  },
];

export default function Projects() {
  return (
    <main className="projects-page">

      <section className="projects-hero">
        <p className="section-label">MY WORK</p>

        <h1>
          Projects I have
          <br />
          built and worked on.
        </h1>

        <p className="projects-intro">
          A collection of software, web development, quality assurance,
          programming, and engineering projects.
        </p>
      </section>

      <section className="projects-list">

        {projects.map((project) => (
          <article className="project-card" key={project.number}>

            <div className="project-number">
              {project.number}
            </div>

            <div className="project-info">

              <p className="project-type">
                {project.type}
              </p>

              <h2>{project.title}</h2>

              <p className="project-description">
                {project.description}
              </p>

              <p className="project-technologies">
                {project.technologies}
              </p>

              <div className="project-links">

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo ↗
                  </a>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>

              </div>

            </div>

          </article>
        ))}

      </section>

      <section className="projects-cta">

        <p className="section-label">NEXT</p>

        <h2>Want to know more about me?</h2>

        <Link href="/experience" className="primary-button">
          View My Experience →
        </Link>

      </section>

    </main>
  );
}