
export default function Skills() {
  return (
    <main className="skills-page">

      <section className="skills-hero">
        <p className="section-label">MY SKILLS</p>

        <h1>
          Technologies and tools
          <br />
          I work with.
        </h1>

        <p className="skills-intro">
          I am continuously developing my skills in software development,
          quality assurance, testing, and engineering tools.
        </p>
      </section>

      <section className="skills-grid-new">

        <div className="skill-card">
          <h2>Frontend Development</h2>
          <p>HTML5</p>
          <p>CSS3</p>
          <p>JavaScript</p>
          <p>React</p>
          <p>Next.js</p>
          <p>Responsive Web Development</p>
        </div>

        <div className="skill-card">
          <h2>Quality Assurance</h2>
          <p>Manual Testing</p>
          <p>Functional Testing</p>
          <p>Test Case Thinking</p>
          <p>Bug Identification</p>
          <p>Debugging</p>
          <p>Defect Reporting</p>
        </div>

        <div className="skill-card">
          <h2>Programming</h2>
          <p>JavaScript</p>
          <p>Python</p>
          <p>CSPro</p>
        </div>

        <div className="skill-card">
          <h2>Tools</h2>
          <p>Git</p>
          <p>GitHub</p>
          <p>VS Code</p>
          <p>MATLAB</p>
        </div>

      </section>

    </main>
  );
}