import "./index.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__label">Credits</p>
      <ul className="footer__list">
        <li>Maaya for the formula (@./maaya_ou on discord)</li>
        <li>
          <a
            href="https://docs.google.com/spreadsheets/d/19KDNlfzjaOvS96kKe87xAfp2Rn5BHHpjVuVC9JqWbug"
            target="_blank"
            rel="noopener noreferrer"
          >
            Parking Spreadsheet
          </a>{" "}
          from Ai0
        </li>
        <li>
          <a
            href="https://docs.google.com/spreadsheets/d/1om--O7_NqvvQ6TDg1jrsjKMVBR_s1j1o"
            target="_blank"
            rel="noopener noreferrer"
          >
            えび japanese sheet
          </a>
        </li>
      </ul>
    </footer>
  );
}
