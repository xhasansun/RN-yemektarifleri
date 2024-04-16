import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHome = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.fill}
    viewBox="0 0 20 21"
    {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.982 1.764c-.351-.273-.527-.41-.72-.462a1 1 0 0 0-.523 0c-.194.052-.37.189-.721.462L2.235 7.039c-.453.353-.68.53-.843.75a2 2 0 0 0-.318.65C1 8.704 1 8.991 1 9.565V16.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C2.52 20 3.08 20 4.2 20h2c.28 0 .42 0 .527-.055a.5.5 0 0 0 .218-.218C7 19.62 7 19.48 7 19.2v-6.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C7.76 11 8.04 11 8.6 11h2.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C13 11.76 13 12.04 13 12.6v6.6c0 .28 0 .42.055.527a.5.5 0 0 0 .218.218c.107.055.247.055.527.055h2c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 18.48 19 17.92 19 16.8V9.565c0-.574 0-.861-.074-1.126a2.002 2.002 0 0 0-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275Z"
    />
  </Svg>
);
export default SvgHome;
