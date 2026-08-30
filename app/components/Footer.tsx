import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Image 
              src="/logo.png" 
              alt="Light Stream Loans Logo" 
              width={200} 
              height={50}
              className="footer-logo-img"
            />
            <h3 className="footer-brand-text">Light Stream Loans</h3>
            <p className="footer-tagline">Trusted loans, fast</p>
            <p className="footer-description">
              Lending simplified. Low fixed rates. No hidden fees. Loans for practically anything from a lender you can trust.
            </p>
            <div className="footer-contact-info">
              <p>Customer Service: Mon–Fri 9:30 a.m. – 7 p.m. ET</p>
              <p>Saturday: Noon – 4 p.m. ET</p>
              <p><a href="tel:9543990685">954-399-0685</a></p>
              <p><a href="mailto:lightstreamhelpdesk@gmail.com">lightstreamhelpdesk@gmail.com</a></p>
              <p>PO Box 117320, Atlanta, GA 30368-7320</p>
            </div>
          </div>
        </div>
        
        <div className="footer-grid">
          <div>
            <h4>Loans</h4>
            <ul>
              <li><Link href="/">Personal Loans</Link></li>
              <li><Link href="/">Debt Consolidation</Link></li>
              <li><Link href="/">Home Improvement</Link></li>
              <li><Link href="/">Auto Refinance</Link></li>
              <li><Link href="/">Medical</Link></li>
              <li><Link href="/">Wedding</Link></li>
              <li><Link href="/">Business</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/">Press</Link></li>
              <li><Link href="/">Careers</Link></li>
              <li><Link href="/">Blog</Link></li>
              <li><Link href="/">Investors</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/">Help Center</Link></li>
              <li><Link href="/">Loan Calculator</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/">FAQ</Link></li>
              <li><Link href="/">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/">Privacy Policy</Link></li>
              <li><Link href="/">Terms of Use</Link></li>
              <li><Link href="/">Licenses</Link></li>
              <li><Link href="/">Disclosures</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Light Stream Loans. All rights reserved. Equal Housing Lender.</p>
          <div className="footer-badges">
            <span>Norton Secured</span>
            <span>Equal Housing</span>
            <span>FDIC</span>
          </div>
          <p className="footer-disclaimer">
            This is a demonstration website created for educational purposes only and is not affiliated with any actual
            lending institution. Loans would be subject to credit approval. Rates and terms shown are illustrative only.
          </p>
        </div>
      </div>
    </footer>
  );
}
