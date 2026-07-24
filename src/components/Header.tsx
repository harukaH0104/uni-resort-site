import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>uni</div>
      <nav style={styles.nav}>
        <span style={styles.navLink}>Concept</span>
        <span style={styles.navLink}>Rooms</span>
        <span style={styles.navLink}>Reservation</span>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    height: '80px',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // ⭕ 左右の固定幅を廃止し、大画面でも心地よい空気感を保つ「4%」の流動マージンに変更
    padding: '0 4%', 
    boxSizing: 'border-box' as const,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '24px',
    fontWeight: '300',
    letterSpacing: '0.1em',
    color: '#111111',
  },
  nav: {
    display: 'flex',
    gap: '40px',
  },
  navLink: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '14px',
    fontWeight: '400',
    letterSpacing: '0.15em',
    color: '#666666',
    cursor: 'pointer',
  },
};
