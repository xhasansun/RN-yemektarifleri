import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const SvgSearch = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Circle cx={11} cy={11} r={7} stroke="#0A9A61" strokeWidth={2} />
    <Path
      stroke="#0A9A61"
      strokeLinecap="round"
      strokeWidth={2}
      d="M11 8a3 3 0 0 0-3 3M20 20l-3-3"
    />
  </Svg>
);
export default SvgSearch;
