import React, { useState } from 'react';
import { roomsData } from '../data/roomsData';
import type { Room } from '../data/roomsData';

interface ReservationProps {
  // お部屋一覧での選択状態（具体的な部屋名など）を相互通信するためのProps定義
  selectedRoomType: string;
  setSelectedRoomType: (type: string) => void;
}

export const Reservation: React.FC<ReservationProps> = ({ selectedRoomType, setSelectedRoomType }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('1');
  const [nights, setNights] = useState<number>(1);
  
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showPayment, setShowPayment] = useState<boolean>(false);

  // 🌟【部屋名ダイレクト価格計算ロジック】
  // 選択されている文字列（selectedRoomType）と、完全に一致する固有の部屋データをデータファイルから検索します。
  // ★ src/components/Reservation.tsx 内の getCalculatedPrice 関数だけを以下に上書きします

const getCalculatedPrice = () => {
    // ユーザーが選んだ部屋名と一致するデータを検索
    const matchedRoom = roomsData.find((room: Room) => room.name === selectedRoomType);
    
    // 初期状態などで見つからない場合は、データ内の1つ目の部屋（静寂）を自動でセットしてバグを防止
    const activeRoom = matchedRoom || roomsData[0];
    
    // 🌟【超クリーン化】大元が最初からきれいな数値（45000等）になったので、そのままダイレクトに掛け算ができます！
    const priceNum = activeRoom.price; 
    
    return {
      roomName: activeRoom.name,
      basePrice: priceNum,
      totalPrice: priceNum * nights // 1泊料金 × 宿泊数
    };
  };
  
  const { roomName, basePrice, totalPrice } = getCalculatedPrice();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate) {
      setAlertMessage("【！】チェックイン日のご選択をお願いいたします。");
      setShowPayment(false);
      return;
    }

    setAlertMessage(""); 
    setShowPayment(true); 
  };

  return (
    <div style={styles.reservationSection}>
      <form onSubmit={handleSearch} style={styles.formWrapper}>
        <div style={styles.titleContainer}>
          <p style={styles.contentSubtitle}>Check-in</p>
          <h2 style={styles.contentTitle}>RESERVATION</h2>
        </div>

        <div style={styles.formContainer}>
          {/* 1. チェックイン日 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Check-in / チェックイン</label>
            <input 
              type="date" 
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              style={styles.inputField} 
            />
          </div>

          {/* 2. お部屋の個別選択フォーム（データファイルから自動生成） */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Room / ご宿泊のお部屋</label>
            {/* 
               🌟 ロックを解除し、データにある具体的な部屋名をすべて選択肢に出現させます。
               これにより、上で選んだ具体的な部屋名が最初からここにピタッと連動して選択されます。
            */}
            <select 
              value={selectedRoomType === 'ALL' ? roomsData[0].name : selectedRoomType} 
              onChange={(e) => setSelectedRoomType(e.target.value)} // 予約欄で部屋を変えた時も大元へ相互通知
              style={styles.selectField}
            >
              {roomsData.map((room: Room) => (
                <option key={room.id} value={room.name} style={styles.optionDark}>
                  {room.name}
                </option>
              ))}
            </select>
            <span style={styles.infoNote}>※お部屋一覧で閲覧中の部屋とリアルタイムに相互連動します</span>
          </div>

          {/* 3. ご宿泊数 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Nights / ご宿泊数</label>
            <select 
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              style={styles.selectField}
            >
              <option value="1" style={styles.optionDark}>1泊</option>
              <option value="2" style={styles.optionDark}>2泊</option>
              <option value="3" style={styles.optionDark}>3泊</option>
              <option value="4" style={styles.optionDark}>4泊</option>
              <option value="5" style={styles.optionDark}>5泊</option>
            </select>
          </div>

          {/* 4. ご利用人数 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Guests / ご利用人数</label>
            <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                style={styles.selectField}
            >
                {/* 🌟 3名様・4名様の選択肢を綺麗に引き算し、最大2名様までに制限します */}
                <option value="1" style={styles.optionDark}>1名様</option>
                <option value="2" style={styles.optionDark}>2名様</option>
            </select>
        </div>

        </div>

        {alertMessage && <div style={styles.siteAlert}>{alertMessage}</div>}

        <button type="submit" style={styles.searchBtn}>
          SEARCH ROOMS / 空室を検索する
        </button>
      </form>

      {/* お支払い手続き画面 */}
      {showPayment && (
        <div style={styles.paymentContainer}>
          <h3 style={styles.paymentTitle}>SECURE PAYMENT / お支払い手続き</h3>
          <p style={styles.paymentSubtitle}>ご宿泊プランの最終確認とクレジットカードのご登録をお願いいたします。</p>
          
          <div style={styles.summaryBox}>
            <p><strong>ご宿泊予定：</strong> {checkInDate} から 【 {nights}泊 】</p>
            {/* 🌟 選択された部屋の固有の名称を明細に表示 */}
            <p><strong>ご予約のお部屋：</strong> {roomName}</p> 
            <p><strong>ご利用人数：</strong> {guests} 名様</p>
            
            <div style={styles.priceDivider}></div>
            {/* 🌟 選択された部屋固有の1泊料金に基づいた、正確な掛け算合計金額を表示 */}
            <p style={styles.totalPriceText}>
              合計金額：¥{totalPrice.toLocaleString()} <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#666666' }}>(¥{basePrice.toLocaleString()} × {nights}泊)</span>
            </p>
          </div>

          <div style={styles.cardForm}>
            <div style={styles.formGroup}>
              <label style={styles.labelDark}>Card Number / クレジットカード番号</label>
              <input type="text" placeholder="0000 0000 0000 0000" style={styles.inputFieldDark} />
            </div>
            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.labelDark}>Expiry / 有効期限</label>
                <input type="text" placeholder="MM / YY" style={styles.inputFieldDark} />
              </div>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.labelDark}>CVC / セキュリティコード</label>
                <input type="text" placeholder="000" style={styles.inputFieldDark} />
              </div>
            </div>
          </div>

          <button onClick={() => alert(`【uni】¥${totalPrice.toLocaleString()} の決済が完了し、ご予約が確定いたしました。`)} style={styles.payBtn}>
            CONFIRM & PAY / 予約を確定して支払う
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  reservationSection: { width: '100%', minHeight: '500px', backgroundColor: '#1A3644', padding: '100px 4%', boxSizing: 'border-box' as const, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '60px' },
  formWrapper: { width: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '40px' },
  titleContainer: { textAlign: 'center' as const },
  contentSubtitle: { fontSize: '16px', color: '#FFFCF3', letterSpacing: '0.05em', margin: '0 0 4px 0' },
  contentTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '36px', fontWeight: '300', letterSpacing: '0.15em', color: '#FFFCF3', margin: 0 },
  formContainer: { width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'row' as const, justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const },
  formGroup: { flex: '1 1 200px', display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  label: { fontSize: '12px', color: '#FFFCF3', letterSpacing: '0.05em' },
  inputField: { width: '100%', height: '44px', background: 'none', border: 'none', borderBottom: '1px solid #FFFCF3', color: '#FFFCF3', fontSize: '14px', padding: '0 4px', outline: 'none', boxSizing: 'border-box' as const, cursor: 'pointer', colorScheme: 'dark' },
  selectField: { width: '100%', height: '44px', background: 'none', border: 'none', borderBottom: '1px solid #FFFCF3', color: '#FFFCF3', fontSize: '14px', padding: '0 4px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' as const },
  optionDark: { backgroundColor: '#1A3644', color: '#FFFCF3' },
  infoNote: { fontSize: '10px', color: '#FFFCF3', opacity: 0.7, marginTop: '4px' },
  siteAlert: { backgroundColor: 'rgba(255, 252, 243, 0.1)', border: '1px solid #FFFCF3', color: '#FFFCF3', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', letterSpacing: '0.05em' },
  searchBtn: { width: '100%', maxWidth: '320px', height: '55px', display: 'flex', justifyContent: 'center' as const, alignItems: 'center' as const, backgroundColor: '#FFFCF3', color: '#1A3644', border: 'none', borderRadius: '30px', fontFamily: '"Cormorant Garamond", serif', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease' },
  paymentContainer: { width: '100%', maxWidth: '600px', backgroundColor: '#FFFCF3', padding: '40px', boxSizing: 'border-box' as const, borderRadius: '24px', display: 'flex', flexDirection: 'column' as const, gap: '30px' },
  paymentTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: '20px', letterSpacing: '0.1em', color: '#111111', margin: 0, textAlign: 'center' as const },
  paymentSubtitle: { fontSize: '12px', color: '#666666', lineHeight: '1.6', margin: 0, textAlign: 'center' as const },
  summaryBox: { backgroundColor: '#FAF9F6', border: '1px solid #eeeeee', padding: '20px', borderRadius: '12px', fontSize: '14px', display: 'flex', flexDirection: 'column' as const, gap: '10px' },
  priceDivider: { width: '100%', height: '1px', backgroundColor: '#eeeeee', margin: '10px 0' },
  totalPriceText: { fontSize: '18px', fontWeight: 'bold' as const, color: '#1A3644', margin: 0 },
  cardForm: { display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  labelDark: { fontSize: '11px', color: '#666666', letterSpacing: '0.05em' },
  inputFieldDark: { width: '100%', height: '44px', backgroundColor: '#ffffff', border: '1px solid #dddddd', borderRadius: '8px', color: '#111111', fontSize: '14px', padding: '0 12px', outline: 'none', boxSizing: 'border-box' as const },
  payBtn: { width: '100%', height: '50px', backgroundColor: '#1A3644', color: '#ffffff', border: 'none', borderRadius: '24px', fontFamily: '"Cormorant Garamond", serif', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease' }
};