import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function DownArrowIcon({color = '#D9D9D9', ...props}) {
    return (
        <Svg width={24} height={24} viewBox="0 0 128 128" fill="none" {...props}>
            <Path d="M58 5L69 5L69 114.5C69 117.538 66.5376 120 63.5 120V120C60.4624 120 58 117.538 58 114.5L58 5Z" fill={color}/>
            <Path d="M33.0001 90.1577L41.0248 82.6341L67.3571 110.721C69.4347 112.937 69.3225 116.417 67.1065 118.495V118.495C64.8905 120.572 61.4099 120.46 59.3324 118.244L33.0001 90.1577Z" fill={color}/>
            <Path d="M86.0132 82.5894L94.0686 90.0801L67.8509 118.274C65.7824 120.498 62.3023 120.625 60.0779 118.556V118.556C57.8535 116.488 57.7271 113.007 59.7956 110.783L86.0132 82.5894Z" fill={color}/>
        </Svg>
    );
}