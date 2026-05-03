import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';

interface ProgressBarProps {
  progress: number; // 0 to 1
  title?: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  title,
  height = 8,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const percentage = Math.min(Math.max(progress, 0), 1) * 100;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: percentage,
      useNativeDriver: false,
      tension: 40,
      friction: 7,
    }).start();
  }, [percentage]);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.barBackground, { height }]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              height,
            },
          ]}
        />
      </View>
      <Text style={styles.percentage}>{`${Math.round(percentage)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: scaleHeight(8),
  },
  title: {
    fontSize: scaleFont(14),
    color: Colors.textSecondary,
    marginBottom: scaleHeight(4),
  },
  barBackground: {
    backgroundColor: Colors.divider,
    borderRadius: scaleWidth(4),
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: Colors.primary,
    borderRadius: scaleWidth(4),
  },
  percentage: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
    marginTop: scaleHeight(4),
    textAlign: 'right',
  },
});

export default ProgressBar;