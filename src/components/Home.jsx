import React, { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger 플러그인을 GSAP에 등록
gsap.registerPlugin(ScrollTrigger);


const Container = styled.div`
  /* background-color:red; */
  width: 100vw;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
`

const TopTitle = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  img {
    width: 100%;
  }
`;

const MainImg = styled.img`
    width: 100%;
    object-fit: cover;
`;

const AddressImg = styled.img`
    width: 100%;
    position: relative;
    top:0px; // 0 -> -100px  
`;

const Gallery = styled.div`
  position:relative;
  background-color: skyblue;
  .gallery_main {
    width: 100%;
  }
`;

const Home = () => {
  const topTitleRef = useRef(null);
  const mainImgRef = useRef(null);
  const addressImgRef = useRef(null);
  const gallayImgRef = useRef(null);

  const [gallayImgIdx, setGallayImgIdx] = useState(0);
  const gallayImages = ['/img/gallery_no.jpg', '/img/gallery.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGallayImgIdx(prev => (prev + 1) % gallayImages.length);
    }, 800);

    return () => {
      clearInterval(interval)
    }
  }, [gallayImages.length])



  useEffect(() => {
    const topTitleEle = topTitleRef.current;
    const mainImgEle = mainImgRef.current;
    const addressImgEle = addressImgRef.current;
    const gallayImgEle = gallayImgRef.current;

    // GSAP 애니메이션 설정
    gsap.fromTo(topTitleEle, { opacity: 0, y: 0 }, { opacity: 1, y: 50, duration: 1});
    gsap.fromTo(mainImgEle, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1});
    gsap.fromTo(addressImgEle, { opacity: 0, y: 0 }, { opacity: 1, y: -100, duration: 1,
      scrollTrigger: {
        trigger: addressImgEle,
        start: 'top 60%', // 트리거 위치: 요소의 상단이 뷰포트의 %에 도달했을 때
        markers: false, // 디버깅을 위한 마커 표시
      }
    });
    
    gsap.fromTo(gallayImgEle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1,
      scrollTrigger: {
        trigger: gallayImgEle,
        start: 'top 80%', // 트리거 위치: 요소의 상단이 뷰포트의 %에 도달했을 때
        markers: true, // 디버깅을 위한 마커 표시
      }
    });
  }, [])


  return (


    <Container>
      <TopTitle ref={topTitleRef}>
        <img src='/img/top_title.png' alt='상단 이미지'/>
      </TopTitle>

      <MainImg 
        ref={mainImgRef}
        src='/img/main_img.jpg'
        alt='메인 이미지'
      /> 

      <AddressImg 
        ref={addressImgRef}
        src='/img/address.png'
        alt='식장 주소 이미지'
      /> 

      <Gallery ref={gallayImgRef}>
        <img className='gallery_main' src={gallayImages[gallayImgIdx]} alt='갤러리 이미지' />
      </Gallery>

      <div>
        test
        sad
        asd
        asd
      </div>
    </Container>
  )
}

export default Home