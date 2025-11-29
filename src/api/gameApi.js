import axios from "axios";

const BASE_URL = "https://everyones-coupon-webapp.azurewebsites.net/api"; // 백엔드 주소

export const createGame = async (payload) => {             //게임 추가
    const res = await axios.post(`${BASE_URL}/games`, payload);
    return res.data;
  };

export const getGameList = async () => {                    //요즘뜨는게임목록조회
  const res = await axios.get(`${BASE_URL}/games/trending`);
  return res.data;
};

export const searchGame = async (keyword,page=0) => {              //게임검색
    const res = await axios.get(`${BASE_URL}/games/search`, {
        params: { keyword, page }
      });
    return res.data;
  };
  
  export const addCoupon = async (gameId, couponData) => {
    console.log("✅ 최종 전송 데이터 (진짜):", couponData);
    console.log("✅ gameId:", gameId);
  
    const res = await axios.post(
      `${BASE_URL}/coupons`,
      couponData,
      {
        params: { gameId },   // ✅ 쿼리스트링을 params로 강제 지정
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    return res.data;
  };
  
  
  
  
  

export const getGameDetail = async (gameId) => {            //쿠폰 조회
  const res = await axios.get(`${BASE_URL}/games/${gameId}`);
  return res.data;
};

export const getGameCoupons = async (gameId, page = 0, size = 50) => {
    const res = await axios.get(`${BASE_URL}/coupons`, {
      params: { gameId, page, size }
    });
  
    return res.data;   // content를 제거하면 안됨!
  };
  



