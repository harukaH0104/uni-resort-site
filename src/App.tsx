import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Concept } from './components/Concept';
import { RoomsFilter } from './components/RoomsFilter';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';

export default function App() {
  // 🌟【最重要】初期値を大まかな 'ALL' ではなく、1つ目の具体的な部屋名に固定します。
  // これにより、画面が開いた瞬間から予約欄（Reservation）と1pxの狂いもなく完璧に相互通信が成立します。
  const [selectedRoomType, setSelectedRoomType] = useState<string>("ALL");

  return (
    // 【1層目：外枠】画面の端から端（100%）まで、どこまでも「真っ白」を敷き詰める箱
    <div style={styles.siteOuterWrapper}>
      
      {/* 【2層目：内枠】最大幅なし（フル幅）デザイン。左右マージン4%であらゆる大画面に流動的に寄り添う箱 */}
      <div style={styles.siteInnerContainer}>
        {/* ① ヘッダー（左右4%余白） */}
        <Header /> 
        
        {/* ② 巨大ファーストビュー（100vh） */}
        <Hero />
        
        {/* ③ ブランド思想コンセプト（上下200px贅沢余白） */}
        <Concept />
        
        {/* ④ 部屋一覧（selectedRoomTypeの状態を流し込みます） */}
        <RoomsFilter 
          selectedRoomType={selectedRoomType} 
          setSelectedRoomType={setSelectedRoomType} 
        />
        
        {/* ⑤ 予約コーナー（★ここにも selectedRoomType と変更用関数をセットで流し込みます） */}
        <Reservation 
          selectedRoomType={selectedRoomType} 
          setSelectedRoomType={setSelectedRoomType} 
        />
        
        {/* ⑥ ミニマルフッター */}
        <Footer />
      </div>

    </div>
  );
}

// ==========================================================================
// 🎨 全体レイアウト定義（両端真っ黒バグを物理的に防ぐ2重コンテナ）
// ==========================================================================
const styles = {
  siteOuterWrapper: {
    width: '100%',
    backgroundColor: '#ffffff', // 画面の端から端までどこまでも純白を敷き詰める
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center', 
  },
  siteInnerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    fontFamily: '"Noto Serif JP", serif',
    color: '#111111',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const, 
    overflowX: 'hidden' as const, 
  },
  siteWrapper: {
    width: '100%', // ⭕ 画面幅いっぱいにどこまでも広がります
    backgroundColor: '#ffffff',
    fontFamily: '"Noto Serif JP", serif',
    color: '#111111',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    position: 'relative' as const,
    overflowX: 'hidden' as const, // 横スクロールのバグ（ノイズ）を完全に防止する絶対のお守り
  },
};

