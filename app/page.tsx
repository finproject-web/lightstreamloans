import Header from "./components/Header";
import Footer from "./components/Footer";
import LoanForm from "./components/LoanForm";

export default function Home() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container">
          <h1>Loan Application</h1>
          <p>
            Complete the secure steps below so we can finalize your loan request. All information is encrypted in
            transit.
          </p>
          <div className="hero-badges">
            <div className="badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 12 15 16 10" />
              </svg>
              Bank-level Security
            </div>
            <div className="badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Takes ~3 minutes
            </div>
          </div>
        </div>
      </section>
      <main>
        <LoanForm />
        <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p>
            Lending simplified. Low fixed rates. No hidden fees. Loans for practically anything from a lender you can
            trust.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
