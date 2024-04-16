import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgClock = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 1 24 20"
    {...props}>
    <Path
      stroke="#C3C3C3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m14.5 19 2 2 4.5-4.5m.985-3.95c.01-.182.015-.366.015-.55 0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.435 4.337 9.858 9.739 9.997M12 6v6l3.738 1.87"
    />
  </Svg>
);
export default SvgClock;
