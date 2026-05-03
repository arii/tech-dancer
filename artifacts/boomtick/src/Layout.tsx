import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <h2>BoomTick</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/research">Research</Link></li>
          <li><Link to="/gear">Gear</Link></li>
          <li><Link to="/export">Export</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
}
