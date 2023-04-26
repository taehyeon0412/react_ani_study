import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(35, 75, 107), rgb(36, 108, 150));
`;

const Box = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-500, 500], [-360, 360]);
  const gradient = useTransform(
    x,
    [-500, 0, 500],
    [
      `linear-gradient(135deg, rgb(136, 186, 226), rgb(5, 163, 255))`,
      `linear-gradient(135deg, rgb(27, 28, 29), rgb(36, 108, 150))`,
      `linear-gradient(135deg, rgb(45, 175, 67), rgb(178, 250, 95))`,
    ]
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  useMotionValueEvent(rotateZ, "change", (latest) => {
    console.log("x변함", latest);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress : ", latest);
  });

  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{ x, rotateZ, scale }}
        drag="x"
        dragSnapToOrigin //드래그 끝에는 중앙으로 가게함
      />
    </Wrapper>
  );
}

export default App;

//모션 애니메이션을 쓰려면 <motion.태그>를 쓴다.
/* 모션 애니메이션을 적용한 스타일 컴포넌트 쓰는법 
   => 기존 styled.div ==> 변경 styled(motion.div)*/

/* variants,initial,animate*/
/*
delayChildren: 0.8, 자식들의 모든 딜레이
staggerChildren: 0.2, 자식들 순서대로 딜레이 ex)첫번째 0.3 두번째 0.3*2 세번째 0.3*3... */

/* 색깔은 string이 아닌 숫자 rgba로 넣어줘야 애니메이션이 작동한다 */

/* ref = 코드로 특정 Element를 잡을 수있는 방법 
기본적으로 ref 개체는 null 값으로 초기화됩니다.
즉, 처음에는 아무것도 가리키지 않지만 요소의 ref 특성을 사용하여 
div 요소를 가리키도록 업데이트할 수 있습니다.
*/
