import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHearth = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.fill}
    viewBox="0 0 22 21"
    {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.993 4.136c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.635 2.105 6.585 6.544 8.207 7.98.182.162.272.242.378.274a.504.504 0 0 0 .286 0c.106-.032.197-.112.378-.273 1.623-1.437 6.573-5.876 8.208-7.98 1.967-2.532 1.658-6.133-.89-8.251-2.549-2.118-5.84-1.512-7.839.826Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHearth;
