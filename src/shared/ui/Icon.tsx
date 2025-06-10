import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

type IconProps = {
    name: string; //имя иконки
    size?: number;
    color?: string;
    style?: StyleProp<ImageStyle>;
};

const Icon: React.FC<IconProps> = ({ name, size = 24, color, style }) => {

    const source = iconMap[name];
    if (!source) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return (
        <Image
            source={source}
            style={[
                { width: size, height: size, tintColor: color },
                style,
            ]}
            resizeMode="contain"
        />
    );


};

const iconMap: Record<string, any> = {
    'add': require('../assets/images/icons/add.png'),
    'sort': require('../assets/images/icons/sort.png'),
    'arrowUp': require('../assets/images/icons/arrowUp.png'),
    'arrowDown': require('../assets/images/icons/arrowDown.png'),
};

export default Icon;