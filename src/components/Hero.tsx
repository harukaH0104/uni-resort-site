import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section style={styles.heroContainer}>
      {/* 
         🌟 本物の背景写真を表示 
         publicフォルダ内の写真を、アスペクト比を完璧に維持したまま縮小させます。
      */}
      <img 
        src="/hero.PNG" 
        alt="宮古島の静寂な水平線" 
        style={styles.heroImage} 
      />

      {/* 写真の上に重なる、スクロール矢印のオーバーレイ領域 */}
      <div style={styles.visualOverlay}>
        <div style={styles.scrollArrow}>
          <span style={styles.arrowText}>SCROLL</span>
          <div style={styles.arrowLine}></div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// 🎨 ヒーロー専用・スタイル定義（画面幅に応じて滑らかに縮む16:9設計）
// ==========================================================================
const styles = {
  // ★親コンテナ：高さを固定（ 100vh ）にせず、横幅の縮みに合わせて「高さが自動で連動」するようにします
  heroContainer: {
    width: '100%',
    height: 'auto', // ⭕ 高さを自動可変にし、画面幅に合わせて縦も滑らかに縮むようにします
    aspectRatio: '16 / 9', // ⭕【最重要】映画や高解像度写真の黄金比である「16:9」の比率で完全にロック！
    position: 'relative' as const,
    backgroundColor: '#FAF9F6',
    overflow: 'hidden' as const,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    objectFit: 'cover' as const, // 写真の比率を絶対崩さずに、枠いっぱいにフィット
    zIndex: 1,
  },
  visualOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.05) 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // ★スマホで縮んだ時に、矢印が画面の下に埋もれすぎないよう流動的な下パディング（ 4% ）に修正
    paddingBottom: '4%', 
    zIndex: 2,
  },
  scrollArrow: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px',
  },
  arrowText: {
    fontFamily: '"Cormorant Garamond", serif',
    // ★縮小対応：大画面では11px、画面がスマホサイズに縮んだ時でも文字が潰れず滑らかに縮小します
    fontSize: 'clamp(9px, 1.2vw, 11px)', 
    letterSpacing: '0.2em',
    color: '#ffffff',
    textShadow: '0 1px 4px rgba(0,0,0,0.2)',
  },
  arrowLine: {
    width: '1px',
    // ★縮小対応：大画面では60px、画面幅に応じて線の長さも滑らかに連動して短くなります（Fluid UI）
    height: 'clamp(30px, 5vw, 60px)', 
    backgroundColor: '#ffffff',
  },
};
