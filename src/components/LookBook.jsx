import React, { useRef, useEffect, useState } from 'react'
import { styled } from "styled-components";

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width: 100vw;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  & > img {
    width: 100%;
  }
  .show {
    opacity: 1;
    transform: translateY(0);
  }
`;


const RowImg = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 50%;
    height: auto;
  }
`
const RowImg2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  img {
    width: 48%;
    height: auto;
  }
`

const ColImg = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  img { 
    width: 80%;
  }
  img + img {
    margin-top: 20px;
  }
`

const ColImg2 = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  img { 
    width: 80%;
  }
`
const ColImg3 = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  img { 
    width: 90%;
  }
`

const Bottom = styled.div`
  position:relative;
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
`


const ImgPopUp = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color:#fff;
  .close_img {
    position:absolute;
    top: 10px;
    right: 10px;
    width: 40px;    
  }
  .wedding_img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
`


const LookBook = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤을 상단으로 이동

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      })
    }, { threshold: 0.4});

    observer.observe(bottomRef.current)

    return () => {
      if(bottomRef.current) {observer.unobserve(bottomRef.current);}
    };
  }, [])

  // 맨위로 가기 버튼 클릭
  const onClickTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤을 상단으로 이동
  }
  
  // 이미지 클릭시 모달창 띄우기
  const handleImageClick = (e) => {
    const imgEle = e.target;
    if(imgEle.tagName === 'IMG' &&  !Array.from(imgEle.classList).includes('not_click')) {
      const imgSrc = imgEle.src;
      setSelectedImg(imgSrc)
      setIsClicked(true)
    }
  }

  // 모든 이미지 테그에 클릭 이멘트 적용
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('click', handleImageClick)
    })

    return () => {
      images.forEach(img => {
        img.removeEventListener('click', handleImageClick)
      })
    }
  }, [])


  useEffect(() => {
    if(isClicked) {
      disableScroll();
    } else {
      enableScroll()
    }
  }, [isClicked])

  return (
    <Container>
      <img src='/img/lookbook/1.jpeg'  alt='lookbook 이미지'/>
      <RowImg style={{ margin: '8vh 0', }}>
        <img src='/img/lookbook/2.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/3.jpg'  alt='lookbook 이미지'/>
      </RowImg>
      <img src='/img/lookbook/4.jpg'  alt='lookbook 이미지'/>

      <ColImg style={{ marginTop: '8vh' }}>
        <img src='/img/lookbook/5.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/6.jpg'  alt='lookbook 이미지'/>
      </ColImg>

      <RowImg style={{ margin: '8vh 0 4vh 0', }}>
        <img src='/img/lookbook/7.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/8.jpg'  alt='lookbook 이미지'/>
      </RowImg>

      <RowImg>
        <img src='/img/lookbook/9.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/10.jpg'  alt='lookbook 이미지'/>
      </RowImg>

      <img style={{ margin: '8vh auto', width: '90%' }} src='/img/lookbook/11.jpg'  alt='lookbook 이미지'/>
      <img style={{ }} src='/img/lookbook/12.jpg'  alt='lookbook 이미지'/>
      <img style={{ marginTop: '8vh' }} src='/img/lookbook/13.jpg'  alt='lookbook 이미지'/>
      <img style={{ margin: '8vh auto', width: '90%' }} src='/img/lookbook/14.jpg'  alt='lookbook 이미지'/>

      <RowImg2>
        <img style={{ }} src='/img/lookbook/16.jpg'  alt='lookbook 이미지'/>
        <img style={{ position:'relative', top:75 }} src='/img/lookbook/17.jpg'  alt='lookbook 이미지'/>
      </RowImg2>

      <ColImg2 style={{ marginTop: '20vh' }}>
        <img src='/img/lookbook/18.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/19.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/20.jpg'  alt='lookbook 이미지'/>
      </ColImg2>

      <img style={{ marginTop: '15vh' }} src='/img/lookbook/21.jpg'  alt='lookbook 이미지'/>
      <img style={{ marginTop: '5vh' }} src='/img/lookbook/22.jpg'  alt='lookbook 이미지'/>
      <img style={{ margin: '5vh auto 5vh auto', width:'85%' }} src='/img/lookbook/23.jpg'  alt='lookbook 이미지'/>

      <img style={{ }} src='/img/lookbook/24.jpg'  alt='lookbook 이미지'/>
      <img style={{ margin: '4vh auto', width:'90%' }} src='/img/lookbook/25.jpg'  alt='lookbook 이미지'/>

      <img style={{ marginLeft: '5%' , width:'60%' }} src='/img/lookbook/26.jpg'  alt='lookbook 이미지'/>

      <ColImg3 style={{ marginTop: '4vh' }}>
        <img src='/img/lookbook/27.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/28.jpg'  alt='lookbook 이미지'/>
      </ColImg3>

      <RowImg style={{marginTop:'3vh'}} >
        <img src='/img/lookbook/29.jpg'  alt='lookbook 이미지'/>
        <img src='/img/lookbook/30.jpg'  alt='lookbook 이미지'/>
      </RowImg>

      <Bottom ref={bottomRef}>
        <img className='not_click' style={{width: '100%'}} src='/img/lookbook/bottom.png'  alt='bottom 이미지'/>
        <img className='not_click top' src='/img/lookbook/top.png'  alt='top 이미지' onClick={onClickTop}  />
      </Bottom>


      {isClicked && 
        <ImgPopUp>
          <img className='close_img' onClick={() => setIsClicked(false)} src='/img/lookbook/close.png' alt='닫기' />
          <img className='wedding_img' src={selectedImg} alt='lookbook 이미지' />
        </ImgPopUp>
      }
    </Container>
    
  )
}



// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
 
function preventDefault(e) {
  e.preventDefault();
}
 
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}
 
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}
 
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
 
// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
 
// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


export default LookBook