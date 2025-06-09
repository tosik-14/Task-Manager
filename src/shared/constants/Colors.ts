/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#11181C';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    upBackground: '#f8f8f8',
    borderColor: '#cccccc',
    tint: tintColorLight,
    icon: '#2d2d31',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    pending: ['rgba(255,244,229,0.8)', '#f8f8f8'],//оранжевый
    in_progress: ['rgba(230,244,255,0.8)', '#f8f8f8'],// голубой
    done: ['rgba(230,249,237,0.8)', '#f8f8f8'],// зелёный
    canceled: ['rgba(255,233,233,0.8)', '#f8f8f8'],//красный
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    upBackground: '#262b2c',
    borderColor: '#424242',
    tint: tintColorDark,
    icon: '#e7e8e8',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    pending: ['rgba(112,96,75,0.8)', '#262b2c'],//оранжевый
    in_progress: ['rgba(69,89,105,0.8)', '#262b2c'],// голубой
    done: ['rgba(64,98,65,0.8)', '#262b2c'],// зелёный
    canceled: ['rgba(107,74,74,0.8)', '#262b2c'],//красный
  },
};
