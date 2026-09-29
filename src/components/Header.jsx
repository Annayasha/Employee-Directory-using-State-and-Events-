function Header() {
  return (
    <header className="top-header">
      <div className="brand">
        <div className="brand-icon">🌾</div>

        <div>
          <h1>GreenField Farm</h1>
          <p>Employee Management System</p>
        </div>
      </div>

      <div className="header-badge">
        <span className="status-dot"></span>
        Farm Operations
      </div>
    </header>
  );
}

export default Header;