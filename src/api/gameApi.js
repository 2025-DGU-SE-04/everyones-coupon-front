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
  
  export const voteCoupon = async (couponId, isWorking) => {
    return await axios.post(
      `${BASE_URL}/coupons/${couponId}/vote`,
      null,
      {
        params: { isWorking }
      }
    );
  };
  
// ✅ 쿠키 기반 인증 자동 포함
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const adminLogin = async (token) => {
  const res = await axios.post(
    `${BASE_URL}/admin/login`,
    { token },
    { withCredentials: true } // ✅ 쿠키 자동 저장 핵심
  );
  return res.data;
};

export const adminLogout = async () => {
  const res = await axios.post(
    `${BASE_URL}/admin/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

// ✅ 게임 삭제
export const deleteGame = async (gameId) => {
  await api.delete(`/admin/games/${gameId}`);
};

export const deleteCoupon = async (couponId) => {
  const res = await axios.delete(
    `${BASE_URL}/admin/coupons/${couponId}`,
    { withCredentials: true }
  );
  return res.data;
};


// ✅ 게임 이미지 업로드
export const uploadGameImage = async (gameId, file) => {
  const formData = new FormData();
  formData.append("imageData", file); // ✅ 이건 그대로 유지

  const res = await axios.post(
    `${BASE_URL}/admin/games/${gameId}/image`,
    formData,
    {
      withCredentials: true, // ✅ 쿠키 인증 유지
      // ❌ headers 절대 넣지 마!!
    }
  );

  return res.data;
};
// ✅ 게임 OFFICIAL 정보 조회 (상세 API)
export const getGameOfficial = async (gameId) => {
  const res = await axios.get(`${BASE_URL}/games/${gameId}`);
  return res.data.official;   // ✅ API 명세랑 정확히 일치
};

// ✅ 게임 OFFICIAL 지정
export const setOfficialGame = async (gameId) => {
  const res = await axios.post(
    `${BASE_URL}/admin/games/${gameId}/official`,
    {},                     // body 없음
    { withCredentials: true } // 관리자 쿠키 필요
  );
  return res.data;
};


