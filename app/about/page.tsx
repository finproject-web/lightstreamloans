import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>About Light Stream Loans</h1>
          <p>Simple, secure, and accessible lending for everyone.</p>
        </div>
      </section>
      <main className="page-content">
        <div className="container">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              At Light Stream Loans, we believe that lending should be simple, secure, and accessible to everyone. Our mission is to provide the most reliable lending platform that protects your privacy while ensuring compliance with the highest security standards.
            </p>
            <p>
              Founded with the vision of simplifying lending processes, we've built a platform that combines cutting-edge technology with user-friendly design to deliver exceptional results.
            </p>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Security Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3 min</div>
              <div className="stat-label">Avg. Process Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </section>

          <section className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Security First</h3>
                <p>We prioritize the security of your data above all else, using bank-level encryption and following strict compliance standards.</p>
              </div>
              <div className="value-card">
                <h3>Customer-Centric</h3>
                <p>Every feature we build is designed with the customer experience in mind, making lending simple and accessible for everyone.</p>
              </div>
              <div className="value-card">
                <h3>Excellence</h3>
                <p>We strive for excellence in everything we do, continuously improving our platform to exceed customer expectations.</p>
              </div>
            </div>
          </section>

          <section className="trust-section">
            <div className="trust-content">
              <h2>Light Stream Loans</h2>
              <p className="trust-tagline">Trusted loans, fast</p>
              <p className="trust-description">
                Lending simplified. Low fixed rates. No hidden fees. Loans for practically anything from a lender you can trust.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
