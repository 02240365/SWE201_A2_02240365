import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on standard iPhone 11 (375x812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleWidth = (size: number): number => {
  return (SCREEN_WIDTH / guidelineBaseWidth) * size;
};

export const scaleHeight = (size: number): number => {
  return (SCREEN_HEIGHT / guidelineBaseHeight) * size;
};

export const scaleFont = (size: number): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isTablet = SCREEN_WIDTH >= 768;