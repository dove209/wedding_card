import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  /* background-color:red; */
  width: 100vw;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  .show {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TopTitle = styled.div`
  position: relative;
  width: 100%;
  height: 90px;
  z-index: 9;
  opacity: 0;
  top: 50px;
  background: no-repeat center center url('/img/top_title.png');
  background-size: cover;
  transform: translateY(-50px);
  transition: transform 1s, opacity 3s;
  img {
    width: 100%;
  }
`;

const MainImg = styled.div`
  opacity: 0;
  width: 100%;
  height: 80vh;
  max-height: 668px;
  background: no-repeat center center url('/img/main_img.jpg');
  background-size: cover;
  transform: translateY(50px);
  transition: transform 1s, opacity 3s;
`;

const AddressImg = styled.div`
  width: 100%;
  height: 23vh;
  position: relative;
  opacity: 0;
  top: -80px;
  background: no-repeat center center url('/img/address.png');
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

const Home = () => {
  const navigate = useNavigate();
  const topTitleRef = useRef(null);
  const mainImgRef = useRef(null);
  const addressImgRef = useRef(null);
  const gallayImgRef = useRef(null);

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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      })
    }, { threshold: 0.2 });

    observer.observe(topTitleRef.current)
    observer.observe(mainImgRef.current)
    observer.observe(addressImgRef.current)
    observer.observe(gallayImgRef.current)

    return () => {
      if(topTitleRef.current) {observer.unobserve(topTitleRef.current)};
      if(mainImgRef.current) {observer.unobserve(mainImgRef.current)};
      if(addressImgRef.current) {observer.unobserve(addressImgRef.current)};
      if(gallayImgRef.current) {observer.unobserve(gallayImgRef.current)};
    };
  }, [])

  const goToLookBook = () => {
    navigate('/lookbook')
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

      <div>test sad asd asd</div>
      <div>test sad asd asd</div>
      <div>test sad asd asd</div>
      <var>v</var>
    </Container>
  );
};

export default Home;
