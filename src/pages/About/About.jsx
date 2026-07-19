import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';

/**
 * About Page
 * Professional page with:
 * - Project name and description
 * - Team members section (placeholder cards)
 * - Technology stack section
 */

// Team members data
const teamMembers = [
  { id: 1, name: 'Member 1', role: 'Leader - Project Setup' },
  { id: 2, name: 'Member 2', role: 'Book List Page' },
  { id: 3, name: 'Member 3', role: 'Book Detail Page' },
  { id: 4, name: 'Member 4', role: 'Add Book Page' },
  { id: 5, name: 'Member 5', role: 'Edit Book Page' },
];

// Technologies used in the project
const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Redux Toolkit', icon: '🔄' },
  { name: 'React Router', icon: '🧭' },
  { name: 'Axios', icon: '🌐' },
  { name: 'Bootstrap', icon: '🎨' },
];

function About() {
  return (
    <Layout>
      {/* About Header */}
      <section className="about-header">
        <Container>
          <h1>Library Management System</h1>
          <p>
            This project is developed for the FER202 React course.
          </p>
        </Container>
      </section>

      {/* Team Members Section */}
      <Container className="mb-5">
        <h2 className="section-title">👥 Team Members</h2>
        <Row className="g-4 mt-2">
          {teamMembers.map((member) => (
            <Col key={member.id} xs={12} sm={6} md={4} lg>
              <div className="member-card">
                <div className="member-avatar">
                  {member.name.charAt(member.name.length - 1)}
                </div>
                <h5>{member.name}</h5>
                <p className="text-muted">{member.role}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Technology Section */}
      <Container className="mb-5 pb-4">
        <h2 className="section-title">🛠️ Technologies</h2>
        <div className="d-flex flex-wrap gap-3 mt-4">
          {technologies.map((tech) => (
            <span key={tech.name} className="tech-badge">
              <span>{tech.icon}</span>
              {tech.name}
            </span>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export default About;
