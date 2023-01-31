import React, { useRef } from 'react';
import { useEffect } from 'react';

// 첫 렌더링시 실행되게 막아주는 함수
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
