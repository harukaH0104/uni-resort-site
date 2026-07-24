export interface Room {
    id: number;
    name: string;
    type: 'standard' | 'pool' | 'suite' | 'villa'; // 🌟 4つ目のタイプとして「villa」を追加
    price: number;
    capacity: number;
    image: string;
    description: string;
}

// --------------------------------------------------------------------------
// 🌟【4室・完全版】ホテル「uni」の洗練されたすべての部屋データ
// --------------------------------------------------------------------------
export const roomsData: Room[] = [
    {
        id: 1,
        name: "Minimalist Studio / 静寂",
        type: "standard",
        price: 45000,
        capacity: 1,
        image: "studio.jpg",
        description: "白一色の無垢な空間で、思考を削ぎ落とす1人旅のためのスタンダードルーム。窓からは引き算された庭園が広がります。"
    },
    {
        id: 2,
        name: "Infinity Pool Villa / 境界",
        type: "pool",
        price: 85000,
        capacity: 2,
        image: "villa.jpg",
        description: "プライベートインフィニティプールとテラスを備えたお部屋。水面と空が溶け合う空間で、心ゆくまで自分自身と対話できます。"
    },
    {
        id: 3,
        name: "uni Sanctuary Suite / 没入",
        type: "suite",
        price: 150000,
        capacity: 2,
        image: "suite.jpg",
        description: "当ホテルで最も広い最上階のスイート。遮るもののない圧倒的な景色と白の静寂に包まれ、深い瞑想のような時間をお過ごしいただけます。"
    },
    {
        // 🌟【新設・4つ目のお部屋】
        id: 4,
        name: "Midnight Wave Villa / 暗闇",
        type: "villa",
        price: 110000,
        capacity: 2,
        image: "midnight.jpg",
        description: "人工的な照明を極限まで引き算し、宮古島の満天の星空と夜の波音を五感で味わう離れのヴィラ。五感を研ぎ澄ます深い眠りをお約束します。"
    }
];
