import React from "react";
import {themedComponent, fill} from "theme";
import styled from "styled-components";

const Circle = themedComponent(
  styled.circle`
    ${fill}
  `
);

export default props => (
  <svg height="100%" viewBox="0 0 204 155" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Artboard" transform="translate(-215.000000, -50.000000)">
        <Circle
          fill={props.fill1 || "currentColor"}
          id="Oval"
          cx="249"
          cy="171"
          r="34"
        ></Circle>
        <Circle
          fill={props.fill2 || "currentColor"}
          id="Oval"
          cx="385"
          cy="171"
          r="34"
        ></Circle>
        <Circle
          fill={props.fill3 || "currentColor"}
          id="Oval"
          cx="317"
          cy="84"
          r="34"
        ></Circle>
      </g>
    </g>
  </svg>
);
