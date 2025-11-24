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

export const searchGame = async (keyword) => {              //게임검색
    const res = await axios.get(`${BASE_URL}/games/search?keyword=${keyword}`);
    return res.data;
  };
  
  export const addCoupon = async (gameId) => {            //쿠폰 추가
    const res = await axios.post(`${BASE_URL}/games/${gameId}`);
    return res.data;
  };

export const getGameDetail = async (gameId) => {            //쿠폰 조회
  const res = await axios.get(`${BASE_URL}/games/${gameId}`);
  return res.data;
};





