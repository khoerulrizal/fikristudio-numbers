import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ArrowLeftIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5 12l6-6m-6 6l6 6m-6-6h14"
        stroke="#071C27"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowLeftIcon;
