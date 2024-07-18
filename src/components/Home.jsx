import React, { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'

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

`

const TopTitle = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  top: 50px;
  transform: translateY(-50px);
  transition: all 1s;
  img {
    width: 100%;
  }
`;

const MainImg = styled.img`
    width: 100%;
    object-fit: cover;
    transform: translateY(50px);
    transition: all 1s;
`;

const AddressImg = styled.img`
    width: 100%;
    position: relative;
    opacity: 0;
    top: -100px;
    transform: translateY(50px);
    transition: all 1s;
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      })
    }, { threshold: 0 });

    observer.observe(topTitleRef.current)
    observer.observe(mainImgRef.current)
    observer.observe(addressImgRef.current)

    return () => {
      observer.unobserve(topTitleRef.current);
      observer.unobserve(mainImgRef.current);
      observer.unobserve(addressImgRef.current);
    };
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
        className='up'
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