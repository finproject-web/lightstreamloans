import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Our support team is here to help. Reach out any time.</p>
        </div>
      </section>
      <main className="page-content">
        <div className="container">
          <section className="contact-cards">
            <a href="tel:9543990685" className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3>Call us</h3>
              <p className="contact-value">954-399-0685</p>
              <p className="contact-description">Customer Service: Mon–Fri 9:30 a.m. – 7 p.m. ET</p>
              <p className="contact-description">Saturday: Noon – 4 p.m. ET</p>
            </a>
            <a href="mailto:lightstreamhelpdesk@gmail.com" className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3>Email us</h3>
              <p className="contact-value">lightstreamhelpdesk@gmail.com</p>
              <p className="contact-description">We reply within one business day</p>
            </a>
          </section>

          <section className="helpdesk-section">
            <h2>Light Stream Loans Helpdesk</h2>
            <p>
              For loan questions, application status, or account issues, contact us using the options above.
            </p>
            <p>
              PO Box 117320, Atlanta, GA 30368-7320
            </p>
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
