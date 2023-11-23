// eslint-disable-next-line
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { increment, incrementAsync, selectCount } from "./counterSlice";

export default function Counter() {
  // eslint-disable-next-line
  const count = useSelector(selectCount);
  // eslint-disable-next-line
  const dispatch = useDispatch();

  return (
    <div>
      <div></div>
    </div>
  );
}
