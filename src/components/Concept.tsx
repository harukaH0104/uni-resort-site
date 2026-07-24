import React from 'react';

export const Concept: React.FC = () => {
  return (
    <section style={styles.conceptSection}>
      <div style={styles.textContainer}>
        {/* サブタイトル：英語の洗練されたセリフ体 */}
        <p style={styles.subtitle}>Where purity returns.</p>
        
        {/* メインの思想文章：美しく自動改行し、両端をピシッと揃える */}
        <h2 style={styles.title}>
          情報過多な現代社会から離れ、<br />
          自分本来の純度に戻るための静寂な場所。
        </h2>
        
        <p style={styles.bodyText}>
          遮るもののない圧倒的な水平線と、引き算のミニマリズム。<br />
          uni（ユニ）は、あなたがまだ自覚していない「頭を空っぽにする時間」を届けるために、<br />
          沖縄県宮古島の静かな海岸沿いに佇む、1日限定数組だけのプライベートリゾートです。<br />
          波の音と地平線だけに没入する、ノイズレスな心地よさに深く寄り添います。
        </p>
      </div>
    </section>
  );
};

// ==========================================================================
// 🎨 コンセプト専用・スタイル定義（引き算の美学を具現化する余白設計）
// ==========================================================================
const styles = {
  conceptSection: {
    width: '100%',
    backgroundColor: '#ffffff', // ノイズレスな純白
    /* 
       ★【最重要：1.5倍の贅沢な余白】
       上下に200pxというプロ仕様の広大な隙間をあけることで、
       サイト全体に圧倒的な高級感と時間のゆとり（UX）を生み出します。
    */
    padding: '200px 4%', 
    boxSizing: 'border-box' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    maxWidth: '800px', // 文章が横に広がりすぎて読みづらくならないための最適な幅
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const, // すべて中央揃えに配置
    textAlign: 'center' as const,
    gap: '40px', // 各要素（サブタイトル・メイン・本文）の間の美しい縦の間隔
  },
  subtitle: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '16px',
    fontWeight: '300',
    letterSpacing: '0.2em', // 文字間隔を広くあけて情緒的な空気感を演出
    color: '#4599C4', // uniのシグネチャーカラー（澄んだ青）
    margin: 0,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontFamily: '"Noto Serif JP", serif',
    fontSize: 'clamp(22px, 3vw, 32px)', // 画面幅に合わせて滑らかに縮む流動的タイポグラフィ
    fontWeight: '300', // あえて細いウエイト（軽さ）を指定して洗練さを表現
    lineHeight: '2.0',
    letterSpacing: '0.1em',
    color: '#111111', // 視覚的負担の少ない墨黒
    margin: 0,
  },
  bodyText: {
    fontFamily: '"Noto Serif JP", serif',
    fontSize: 'clamp(14px, 1.5vw, 15px)',
    fontWeight: '300',
    lineHeight: '2.2', // 行間を2.2倍にゆったり広げて、読み進める心地よさに寄り添う
    letterSpacing: '0.08em',
    color: '#4E4E4E',
    margin: 0,
    whiteSpace: 'normal' as const,
    wordBreak: 'break-all' as const,
  },
};
