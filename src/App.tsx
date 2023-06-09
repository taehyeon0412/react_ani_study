import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(35, 75, 107), rgb(36, 108, 150));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ToggleBox = styled(motion.div)`
  background: rgba(255, 255, 255, 1);
  width: 250px;
  height: 150px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px black;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.div`
  border: none;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.3);
  font-weight: 600;
  font-size: 20px;
  padding: 5px 10px;
  margin-top: 13px;
  transition: ease-in-out 0.2s;

  :hover {
    background: black;
    color: whitesmoke;
    cursor: pointer;
  }
`;

const Circle = styled(motion.div)`
  background: #111;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const hoverVar = {
  hover: (n: any) => ({
    scale: 1.2,
  }),
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [circleToggle, setCircleToggle] = React.useState(3);

  const overlayHandler = () => {
    setId((prev) => null);
  };

  const circleToggleHandler = () => {
    if (circleToggle === 2) {
      return setCircleToggle((prev) => 3);
    }
    if (circleToggle === 3) {
      return setCircleToggle((prev) => 2);
    }
  };

  return (
    <Wrapper>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={overlayHandler}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <ToggleBox layoutId={id} style={{ width: 350, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>

      <Grid>
        <AnimatePresence>
          {[1, 2, 3, 4].map((n) => (
            <Box
              onClick={() => setId(n + "")}
              key={n}
              layoutId={n + ""}
              variants={hoverVar}
              whileHover="hover"
              transition={{ type: "linear", duration: 0.15 }}
              custom={n}
            >
              <AnimatePresence>
                {n === circleToggle && <Circle layoutId="circle" />}
              </AnimatePresence>
            </Box>
          ))}
        </AnimatePresence>
      </Grid>

      <Button onClick={circleToggleHandler}>Switch</Button>
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

/* AnimatePresence => 자식에게 나타나거나 사라지는게 있다면 그것을 애니메이트하게 해준다*/
/* layout => css의 변화를 애니메이션화 해준다 */

/*layoutId에 같은 id를 주는 이유 : 다른 컴포넌트지만 framer한테는
  같은 prop라고 알려주기위함 */
