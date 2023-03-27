import {useEffect} from 'react';

function UseOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      // console.log(ref.current);
      // 내가 모달창을 클릭하고 있으면 listener는 아무것도 하지 않음
      if(!ref.current || ref.current.contains(e.target)) {
        return;
      }
      // 모달창 이외의 곳을 클릭했다? 바로 handler 실행
      // handler는 MovieModal.js에서 지정했음
      // setModalOpen을 false로 만든다!
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // clenup 함수
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }

  }, [ref, handler])
}

export default UseOnClickOutside;