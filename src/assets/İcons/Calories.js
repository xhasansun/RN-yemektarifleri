import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCalories = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 12 24"
    {...props}>
    <Path
      stroke="#C3C3C3"
      strokeWidth={1}
      d="M14.5 10c0-.791 1.053-1.001 1.332-.26C16.508 11.53 17 13.134 17 14a5 5 0 0 1-10 0c0-.93.568-2.711 1.322-4.663.975-2.528 1.463-3.792 2.066-3.86.192-.022.403.017.575.107.537.28.537 1.659.537 4.416a1.5 1.5 0 0 0 3 0Z"
    />
    <Path
      stroke="#C3C3C3"
      strokeWidth={1}
      d="m11 19-.263-.657a3.406 3.406 0 0 1 .503-3.393.973.973 0 0 1 1.52 0c.766.958.958 2.254.503 3.393L13 19"
    />
  </Svg>
);
export default SvgCalories;
