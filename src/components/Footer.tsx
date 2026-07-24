import React from 'react';

export const Footer: React.FC = () => {
  // 現在の西暦（2026年など）を自動で取得してコピーライトに反映します
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.inner}>
        
        {/* 左側：ホテルのロゴとロケーション（架空の宮古島住所） */}
        <div style={styles.leftArea}>
          <span style={styles.logo}>uni</span>
          <p style={styles.address}>
            〒906-0000 沖縄県宮古島市平良字海岸沿い 001-1<br />
            0980-00-0000 / info@uni-resort-dummy.com
          </p>
        </div>

        {/* 右側：著作権表示（コピーライト） */}
        <div style={styles.rightArea}>
          <p style={styles.copyright}>
            &copy; {currentYear} RESORT HOTEL uni. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

// ==========================================================================
// 🎨 フッター専用・スタイル定義（静寂の旅の終わりを締めくくるミニマリズム）
// ==========================================================================
const styles = {
  footerContainer: {
    width: '100%',
    backgroundColor: '#ffffff', // 純白のノイズレス空間
    borderTop: '1px solid #eeeeee',
    padding: '60px 4%', // 他のセクション（Rooms等）の流動幅と完璧に同期
    boxSizing: 'border-box' as const,
    marginTop: 'auto', // メインコンテンツが少なくても最下部に固定されるお守り
  },
  inner: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between', // 左右の端に綺麗に引き離します
    alignItems: 'flex-end' as const, // 下側のラインでビシッと揃える
    flexWrap: 'wrap' as const, // スマホ等の縦並び対応
    gap: '30px',
  },
  leftArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  logo: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '24px',
    fontWeight: '300',
    letterSpacing: '0.1em',
    color: '#111111',
  },
  address: {
    fontSize: '12px',
    lineHeight: '1.8',
    color: '#666666',
    margin: 0,
    letterSpacing: '0.05em',
  },
  rightArea: {
    textAlign: 'right' as const,
  },
  copyright: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '12px',
    color: '#888888',
    margin: 0,
    letterSpacing: '0.05em',
  },
};
