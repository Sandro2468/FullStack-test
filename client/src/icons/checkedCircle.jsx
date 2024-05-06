import * as React from "react"
const CheckedCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#05B205"
      d="M8 16.667A6.667 6.667 0 1 1 8 3.333a6.667 6.667 0 0 1 0 13.334Zm-.665-4 4.714-4.714-.943-.943-3.771 3.771-1.886-1.886-.942.943 2.828 2.829Z"
    />
  </svg>
)
export default CheckedCircle
