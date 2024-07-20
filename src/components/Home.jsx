import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Helmet } from "react-helmet";

const Container = styled.div`
  width: 100vw;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  .show {
    opacity: 1;
    transform: translateY(0);
  }

  .chakra-collapse {
    .ul1 {
      margin-top: 15px;
      font-size: 13px;
      li {
        display: flex;
        align-items: center;
        P:first-child {
          width: 80px;
        }
        p:nth-child(2) {
          width: 110px;
        }
        P + P {
          margin-left: 20px;
        }
      }
      li + li {
        margin-top: 10px;
      }
    }

    .ul2 {
      margin-top: 15px;
      font-size: 12px;
      li {
        display: flex;
        div {
          &:first-child {
            width: 70px;
          }
          p + p {
            margin-top: 3px;
          }
        }
        div + div {
          margin-left: 20px;
        }
      }
      li + li {
        margin-top: 10px;
      }
      .copy_btn {
        width: 50px;
        font-size: 10px;
        padding: 2px 5px;
        color: #fff;
        background-color: #888;
      }
    }
  }
`;

const TopTitle = styled.div`
  position: relative;
  width: 100%;
  height: 90px;
  z-index: 9;
  opacity: 0;
  top: 50px;
  background: no-repeat center center url("/img/top_title.png");
  background-size: cover;
  transform: translateY(-50px);
  animation: fadeInDown 2s ease forwards;
  img {
    width: 100%;
  }
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MainImg = styled.div`
  opacity: 0;
  width: 100%;
  height: 80vh;
  max-height: 668px;
  background: no-repeat center center url("/img/main_img.jpg");
  background-size: cover;
  transform: translateY(50px);
  animation: fadeInUp 2s ease forwards;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AddressImg = styled.div`
  width: 100%;
  height: 23vh;
  position: relative;
  opacity: 0;
  top: -80px;
  background: no-repeat center center url("/img/address.png");
  background-size: cover;
  transform: translateY(100px);
  transition: transform 1s, opacity 2s;
`;

const Gallery = styled.div`
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 1s, opacity 2s;
  .gallery_main {
    width: 100%;
  }
`;

const Bottom = styled.div`
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s;

  .top {
    position: absolute;
    bottom: 10%;
    right: 5%;
    width: 50px;
    height: 50px;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const topTitleRef = useRef(null);
  const mainImgRef = useRef(null);
  const addressImgRef = useRef(null);
  const gallayImgRef = useRef(null);
  const bottomRef = useRef(null);
  const [map, setMap ] = useState(null);
  const mapRef = useRef(null)

  const [gallayImgIdx, setGallayImgIdx] = useState(0);

  const gallayImages = ["/img/gallery_no.jpg", "/img/gallery.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setGallayImgIdx((prev) => (prev + 1) % gallayImages.length);
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, [gallayImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(addressImgRef.current);
    observer.observe(gallayImgRef.current);
    observer.observe(bottomRef.current);
    return () => {
      if (addressImgRef.current) {
        observer.unobserve(addressImgRef.current);
      }
      if (gallayImgRef.current) {
        observer.unobserve(gallayImgRef.current);
      }
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);

  const goToLookBook = () => {
    navigate("/lookbook");
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.log("복사에 실패하였습니다");
    }
  };

  // 맨위로 가기 버튼 클릭
  const onClickTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 스크롤을 상단으로 이동
  };

  useEffect(() => {
    // 카카오 맵 API 스크립트를 동적으로 로드합니다.
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ba0865e0610539648784bdb39e0ab9c5&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); // 'map'이라는 id를 가진 div에 맵을 그립니다.
        const options = {
          center: new window.kakao.maps.LatLng(37.51171, 126.9949), // 초기 맵의 중심 좌표 (서울)
          level: 4, // 초기 맵의 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options); // 맵을 생성합니다.

        // 마커를 추가합니다.
        const markerPosition = new window.kakao.maps.LatLng(37.51171, 126.9949);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        setMap(map)
      });
    };
    
    return () => script.remove(); // 컴포넌트가 언마운트될 때 스크립트를 제거합니다.
  }, []);

  const loadMap = () => {
    setTimeout(() => {
      const newCenter = new kakao.maps.LatLng(37.5117, 126.9949);
      map.relayout()
      map.setCenter(newCenter);
    }, 100)
  }

  return (
    <Container>
      <TopTitle ref={topTitleRef} />

      <MainImg ref={mainImgRef} />

      <AddressImg
        ref={addressImgRef}
        src="/img/address.png"
        alt="식장 주소 이미지"
      />

      <Gallery ref={gallayImgRef} onClick={goToLookBook}>
        <img
          className="gallery_main"
          src={gallayImages[gallayImgIdx]}
          alt="갤러리 이미지"
        />
      </Gallery>

      <Accordion allowMultiple>
        <AccordionItem
          style={{
            borderTop: "1px solid #000",
            borderBottom: "1px solid #000",
          }}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                    >
                      <span>Jae hyuk Contact</span>
                      <span style={{ fontSize: 12 }}>
                        방극만, 양종숙이 장남 재혁
                      </span>
                    </div>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                style={{ borderTop: "1px solid #000", fontWeight: "bold" }}
              >
                <h1 style={{ fontSize: 14 }}>Contact</h1>
                <ul className="ul1">
                  <li>
                    <p>재혁</p>
                    <p>010-2398-1711</p>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}>﹒﹒</p>
                    <p><a href="tel:+821023981711"><img src="/img/phone.png" /></a></p>
                  </li>
                  <li>
                    <p>아버지 방극만</p>
                    <p>010-4136-5747</p>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}>﹒﹒</p>
                    <p><a href="tel:+821041365747"><img src="/img/phone.png" /></a></p>
                  </li>
                  <li>
                    <p>어머니 양종숙</p>
                    <p>010-6601-1711</p>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}>﹒﹒</p>
                    <p><a href="tel:+821066011711"><img src="/img/phone.png" /></a></p>
                  </li>
                </ul>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <AccordionItem
          style={{
            borderBottom: "1px solid #000",
          }}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                    >
                      <span>Hanee Contact</span>
                      <span style={{ fontSize: 12 }}>
                        오세연, 김점숙의 장녀 하늬
                      </span>
                    </div>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                style={{ borderTop: "1px solid #000", fontWeight: "bold" }}
              >
                <h1 style={{ fontSize: 14 }}>Contact</h1>
                <ul className="ul1">
                  <li>
                    <p>하늬</p>
                    <p>010-2381-2851</p>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}>﹒﹒</p>
                    <p><a href="tel:+821023812851"><img src="/img/phone.png" /></a></p>
                  </li>
                  <li>
                    <p>아버지 오세연</p>
                    <p>010-2399-2851</p>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}>﹒﹒</p>
                    <p><a href="tel:+821023992851"><img src="/img/phone.png" /></a></p>
                  </li>
                  <li>
                    <p>어머니 김점숙</p>
                    <p>010-2382-2851</p>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}>﹒﹒</p>
                    <p><a href="tel:+821023822851"><img src="/img/phone.png" /></a></p>
                  </li>
                </ul>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        {/* 지도 */}
        <AccordionItem style={{ borderBottom: "1px solid #000" }} onClick={loadMap}>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                    >
                      <span>Guide</span>
                      <span style={{ fontSize: 12 }}>오시는 길</span>
                    </div>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                style={{ borderTop: "1px solid #000", fontWeight: "bold" }}
                
              >
                <h1 style={{ fontSize: 14 }}>Guide</h1>
                <p style={{ fontSize: 13, marginTop: 15 }}>
                  2024년 8월 31일 토요일 오후 3시
                  <br />
                  세빛섬 플로팅아일랜드 2F 컨벤션홀
                  <br />
                  서울 서초구 올림픽대로 2085-14
                  <br />
                  TEL 02-537-2440
                  <br />
                  <br />
                  - 지하철&nbsp;&nbsp;고속터미널 6번출구 하차 후 셔틀 이용
                  <br />
                  - 버스&nbsp;&nbsp;반포한강공원.세빛섬 하차
                  <br />- 주차&nbsp;&nbsp;세빛섬 주차장
                </p>

                <div
                  id="map"
                  style={{
                    width: "80%",
                    height: "200px",
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                  ref={mapRef}
                ></div>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        {/* 계좌  */}
        <AccordionItem
          style={{
            borderBottom: "1px solid #000",
          }}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                    >
                      <span>Info</span>
                      <span style={{ fontSize: 12 }}>마음 전하실 곳</span>
                    </div>
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                style={{ borderTop: "1px solid #000", fontWeight: "bold" }}
              >
                <h1 style={{ fontSize: 14 }}>info</h1>
                <ul className="ul2">
                  <li>
                    <div>
                      <p>신랑 계좌</p>
                      <p
                        className="copy_btn"
                        onClick={() => {
                          handleCopyClipBoard("9003-2517-3390-6");
                        }}
                      >
                        복사하기
                      </p>
                    </div>
                    <div>
                      <p>새마을 (예금주: 방재혁)</p>
                      <p>9003-2517-3390-6</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>신랑혼주 계좌</p>
                      <p
                        className="copy_btn"
                        onClick={() => {
                          handleCopyClipBoard("1183-12-007811");
                        }}
                      >
                        복사하기
                      </p>
                    </div>
                    <div>
                      <p>농협 (예금주: 방극만)</p>
                      <p>1183-12-007811</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>신부 계좌</p>
                      <p
                        className="copy_btn"
                        onClick={() => {
                          handleCopyClipBoard("110-402-192440");
                        }}
                      >
                        복사하기
                      </p>
                    </div>
                    <div>
                      <p>신한 (예금주: 오하늬)</p>
                      <p>110-402-192440</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>신부혼주 계좌</p>
                      <p
                        className="copy_btn"
                        onClick={() => {
                          handleCopyClipBoard("064602-04-075569");
                        }}
                      >
                        복사하기
                      </p>
                    </div>
                    <div>
                      <p>국민 (예금주: 오세연)</p>
                      <p>064602-04-075569</p>
                    </div>
                    <div>
                      <p>농협 (예금주: 김점숙)</p>
                      <p>168-12-422442</p>
                    </div>
                  </li>
                </ul>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Bottom ref={bottomRef}>
        <img
          className="not_click"
          style={{ width: "100%" }}
          src="/img/lookbook/bottom.png"
          alt="bottom 이미지"
        />
        <img
          className="not_click top"
          src="/img/lookbook/top.png"
          alt="top 이미지"
          onClick={onClickTop}
        />
      </Bottom>
    </Container>
  );
};

export default Home;
