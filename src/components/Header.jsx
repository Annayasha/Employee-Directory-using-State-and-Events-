
function Header() {
  return (
    <header className="top-header">
      <a className="brand" href="#top" aria-label="GreenField Farm home">
        <div className="brand-icon" aria-hidden="true">🌾</div>
        <div>
          <h1>GreenField Farm</h1>
          <p>Workforce Management Platform</p>
        </div>
      </a>

      <div className="header-badge">
        <span className="status-dot" />
        Operations Portal
      </div>
    </header>
  );
}

export default Header;
