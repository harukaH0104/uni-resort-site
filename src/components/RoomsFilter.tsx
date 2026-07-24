import React from 'react';
import { roomsData } from '../data/roomsData'; 
// 🌟 type を挟むことで、Viteの「named export 'Room' がありません」というエラーを永久に防ぎます
import type { Room } from '../data/roomsData'; 

interface RoomsFilterProps {
  selectedRoomType: string;
  setSelectedRoomType: (type: string) => void;
}

export const RoomsFilter: React.FC<RoomsFilterProps> = ({ selectedRoomType, setSelectedRoomType }) => {
  
  // 🌟【全件 ⇄ 個別型のハイブリッド高速フィルタリングロジック】
  // 1. ALL（初期状態）なら、4つの部屋すべてを一瞬で展開。
  // 2. standard や pool などのタイプ選択なら、そのタイプに合致するお部屋だけを絞り込み。
  // 3. 下の予約欄で「具体的な特定の部屋名」を選んだ場合は、その1部屋だけを画面に表示します。
  const filteredRooms = selectedRoomType === 'ALL'
    ? roomsData
    : (selectedRoomType === 'standard' || selectedRoomType === 'pool' || selectedRoomType === 'suite' || selectedRoomType === 'villa')
      ? roomsData.filter((room: Room) => room.type === selectedRoomType)
      : roomsData.filter((room: Room) => room.name === selectedRoomType);

  return (
    <section style={styles.sectionContainer}>
      <div style={styles.inner}>
        
        {/* 1. 絞り込みフィルターボタン群（新設された VILLA を含む4タイプ対応） */}
        <div style={styles.filterGroup}>
          {['ALL', 'standard', 'pool', 'suite', 'villa'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedRoomType(type === 'ALL' ? 'ALL' : roomsData.find(r => r.type === type)?.name || 'ALL')}
              style={{
                ...styles.filterBtn,
                ...(selectedRoomType === 'ALL' && type === 'ALL' ? styles.activeBtn : 
                    roomsData.find(r => r.name === selectedRoomType)?.type === type && type !== 'ALL' ? styles.activeBtn : {})
              }}
            >
              {/* ボタンの文字を大文字にして見栄えを綺麗にするUXパーツ（ ALL / STANDARD / POOL / SUITE / VILLA ） */}
              {type.toUpperCase()} 
            </button>
          ))}
        </div>

        {/* 2. 4つの部屋を「左上、右上、左下、右下」に美しく並べる2×2グリッド */}
        <div style={styles.grid}>
          {filteredRooms.map((room: Room) => (
            <div key={room.id} style={styles.roomCard}>
              {/* 写真のダミー枠（Figma比率を完全ロック） */}
              <div style={styles.imagePlaceholder}>
                <span style={styles.imageText}>[ {room.name} Image ]</span>
              </div>
              
              {/* お部屋情報 */}
              <div style={styles.infoArea}>
                <span style={styles.roomTypeTag}>{room.type.toUpperCase()}</span>
                <h3 style={styles.roomName}>{room.name}</h3>
                <p style={styles.price}>¥{room.price.toLocaleString()}〜 / 1泊</p>
                {/* 魂の込もった、自動改行・両端揃えの説明文テキスト */}
                <p style={styles.description}>{room.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================================================
// 🎨 スタイル定義（コンソールの競合警告を100%解決したプロ仕様）
// ==========================================================================
const styles = {
  sectionContainer: {
    width: '100%',
    padding: '100px 4%', // ポートフォリオサイト（WORKS）と完璧に揃う流動幅
    boxSizing: 'border-box' as const,
    backgroundColor: '#ffffff',
  },
  inner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '50px',
  },
  filterGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    borderBottom: '1px solid #eeeeee',
    paddingBottom: '20px',
  },
  // 🌟 border: 'none' をバラバラにして、警告（ Warning ）を完全に消滅させた新型ボタン
  filterBtn: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '14px',
    letterSpacing: '0.15em',
    background: 'none',
    padding: '10px 20px',
    color: '#888888',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    // プロパティを一括指定せず個別に明記することで、衝突バグを物理的に回避します
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid transparent', // ガタつきを防ぐ透明な下線の保険
  },
  activeBtn: {
    color: '#111111',
    fontWeight: 'bold',
    borderBottom: '2px solid #4599C4', // 色だけをスマートに上書き
  },
  grid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
    columnGap: '50px',
    rowGap: '60px',
  },
  roomCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: '500 / 281', // 16:9比率を強制ロック
    backgroundColor: '#f5f5f5',
    border: '1px solid #eeeeee',
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#aaaaaa',
    fontSize: '13px',
  },
  infoArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  roomTypeTag: {
    fontSize: '11px',
    color: '#4599C4',
    letterSpacing: '0.05em',
    fontWeight: 'bold',
  },
  roomName: {
    fontSize: '18px',
    fontWeight: '400',
    margin: 0,
    color: '#111111',
  },
  price: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1A3644', // 予約コーナーと共鳴する深い青
    margin: 0,
  },
  // 説明文：どんな長さになっても綺麗に端が揃う両端揃え（ justify ）
  description: {
    fontSize: '14px',
    color: '#4E4E4E',
    lineHeight: '1.8',
    margin: 0,
    whiteSpace: 'normal' as const,
    wordBreak: 'break-all' as const,
    textAlign: 'justify' as const,
  },
};
