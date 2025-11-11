export default function About() {
    return (
      <div className="about">
        <h1>About Me</h1>
        <img
        src="/me.jpeg"
        alt="My photo"
        className="profile-pic"
        />
        <p>
          Hi, my name is <strong>WAHEED ALNOOR</strong>
          I am passionate about web development and creating 
          clean, responsive design. I enjoy solving problems
          and building projects that help people.
        </p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        View My Resume
        </a>
      </div>
    
  );
}
