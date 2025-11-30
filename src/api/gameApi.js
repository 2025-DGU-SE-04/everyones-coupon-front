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

export const getGameCoupons = async (gameId, page = 0, size = 50, sort = ["createdAt,desc"]) => {
    // Spring Boot는 배열 파라미터를 sort=value1&sort=value2 형태로 받음
    // axios는 기본적으로 sort[]=value 형태로 보내므로 paramsSerializer 사용
    // 정렬 방향: createdAt,desc (최신순), score,desc (유효성순)
    const res = await axios.get(`${BASE_URL}/coupons`, {
      params: { 
        gameId, 
        page, 
        size,
        sort: sort
      },
      paramsSerializer: {
        indexes: null // sort=value 형태로 전달 (배열 인덱스 없이)
      }
    });
  
    return res.data;   // content를 제거하면 안됨!
  };

// 쿠폰 피드백 투표
export const voteCoupon = async (couponId, isWorking) => {
  const res = await axios.post(
    `${BASE_URL}/coupons/${couponId}/vote`,
    {},
    {
      params: { isWorking }
    }
  );
  return res.data;
};

// ==================== 관리자 API ====================
// 모든 관리자 API는 쿠키 기반 인증을 사용 (withCredentials: true)

// 관리자 로그인 - 백엔드가 쿠키를 자동으로 설정
export const adminLogin = async (token) => {
  const res = await axios.post(
    `${BASE_URL}/admin/login`,
    { token },
    { withCredentials: true }
  );
  return res.data;
};

// 관리자 로그아웃 - 백엔드가 쿠키를 자동으로 삭제
export const adminLogout = async () => {
  const res = await axios.post(
    `${BASE_URL}/admin/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

// 게임에 오피셜 마크 부여
export const setGameOfficial = async (gameId, official) => {
  const res = await axios.post(
    `${BASE_URL}/admin/games/${gameId}/official`,
    { official },
    { withCredentials: true }
  );
  return res.data;
};

// 게임 대표 이미지 지정
export const setGameImage = async (gameId, imageData) => {
  const res = await axios.post(
    `${BASE_URL}/admin/games/${gameId}/image`,
    { imageData },
    { withCredentials: true }
  );
  return res.data;
};

// 게임 삭제
export const deleteGame = async (gameId) => {
  const res = await axios.delete(
    `${BASE_URL}/admin/games/${gameId}`,
    { withCredentials: true }
  );
  return res.data;
};

// 쿠폰 삭제
export const deleteCoupon = async (couponId) => {
  const res = await axios.delete(
    `${BASE_URL}/admin/coupons/${couponId}`,
    { withCredentials: true }
  );
  return res.data;
};

