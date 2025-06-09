import * as React from 'react';
import Svg, { Rect, G, Defs, ClipPath } from 'react-native-svg';

export default function AddTaskIcon({color = '#D9D9D9', ...props}) {
    return (
        <Svg width={24} height={24} viewBox="0 0 128 128" fill="none" {...props}>
            <G clipPath="url(#clip0)">
                <Rect x="58" width="11" height="128" fill={color} />
                <Rect x="128" y="58" width="11" height="128" transform="rotate(90 128 58)" fill={color} />
            </G>
            <Defs>
                <ClipPath id="clip0">
                    <Rect width="128" height="128" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}
