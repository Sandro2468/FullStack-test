import * as React from "react"
const UncheckCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#79889D"
      d="M8 16.667A6.667 6.667 0 1 1 8 3.333a6.667 6.667 0 0 1 0 13.334Zm0-1.334A5.333 5.333 0 1 0 8 4.667a5.333 5.333 0 0 0 0 10.666Z"
    />
  </svg>
)
export default UncheckCircle
