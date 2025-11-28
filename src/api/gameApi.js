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
  
  export const addCoupon = async (couponList) => {
    const res = await axios.post(
      `${BASE_URL}/coupons`,
      couponList   // 배열 그대로 전송
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
  



