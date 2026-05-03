import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';

const AnimationDemoScreen = () => {
  // Animation 1: Fade In/Out and Scale
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Animation 2: Slide Animation
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Animation 3: Progress/Loading Indicator
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  
  // Gesture: Drag and Drop
  const pan = useRef(new Animated.ValueXY()).current;
  const [dragCount] = useState(0);

  // Fade Animation - Just plays, no alert
  const startFadeAnimation = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Scale/Bounce Animation - Just plays, no alert
  const startScaleAnimation = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.3,
        useNativeDriver: true,
        tension: 40,
        friction: 3,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 40,
        friction: 3,
      }),
    ]).start();
  };

  // Slide Animation - Just plays, no alert
  const startSlideAnimation = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Progress Loading Animation - Just plays, no alert
  const startLoadingAnimation = () => {
    setIsLoading(true);
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setIsLoading(false);
    });
  };

  // Pan Responder for Drag Gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          tension: 40,
          friction: 5,
        }).start();
      },
    })
  ).current;

  const resetDragPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Animation & Gesture Demo</Text>
      <Text style={styles.subtitle}>Tap any box to see animation</Text>

      <View style={styles.content}>
        {/* Animation 1: Fade */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>1. Fade In/Out Animation</Text>
          <TouchableOpacity onPress={startFadeAnimation} activeOpacity={0.8}>
            <Animated.View style={[styles.demoBox, { opacity: fadeAnim, backgroundColor: Colors.primary }]}>
              <Ionicons name="eye" size={32} color={Colors.white} />
              <Text style={styles.demoText}>Tap to Fade</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Animation 2: Scale/Bounce */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>2. Scale/Bounce Animation</Text>
          <TouchableOpacity onPress={startScaleAnimation} activeOpacity={0.8}>
            <Animated.View style={[styles.demoBox, { transform: [{ scale: scaleAnim }], backgroundColor: Colors.accent }]}>
              <Ionicons name="logo-react" size={32} color={Colors.white} />
              <Text style={styles.demoText}>Tap to Bounce</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Animation 3: Slide */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>3. Slide Animation</Text>
          <TouchableOpacity onPress={startSlideAnimation} activeOpacity={0.8}>
            <Animated.View style={[styles.demoBox, { transform: [{ translateX: slideAnim }], backgroundColor: Colors.success }]}>
              <Ionicons name="arrow-forward" size={32} color={Colors.white} />
              <Text style={styles.demoText}>Tap to Slide</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Animation 4: Progress Indicator */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>4. Progress/Loading Indicator</Text>
          <TouchableOpacity onPress={startLoadingAnimation} style={styles.loadingButton} activeOpacity={0.8}>
            <Ionicons name="refresh-circle" size={20} color={Colors.white} />
            <Text style={styles.loadingButtonText}>Start Loading</Text>
          </TouchableOpacity>
          {isLoading && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
              <Animated.Text style={styles.progressText}>
                {progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                })}
              </Animated.Text>
            </View>
          )}
        </View>

        {/* Gesture: Drag and Drop */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>5. Drag Gesture (Drag & Drop)</Text>
          <View style={styles.dragContainer}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.draggableBox,
                {
                  transform: pan.getTranslateTransform(),
                },
              ]}
            >
              <Ionicons name="move" size={32} color={Colors.white} />
              <Text style={styles.dragText}>Drag Me!</Text>
            </Animated.View>
          </View>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetDragPosition}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={16} color={Colors.white} />
            <Text style={styles.resetButtonText}>Reset Position</Text>
          </TouchableOpacity>
        </View>

        {/* Bonus: All Animations Combined */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>6. Bonus: Combined Effect</Text>
          <TouchableOpacity 
            style={styles.combinedButton} 
            onPress={() => {
              startFadeAnimation();
              startScaleAnimation();
              startSlideAnimation();
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={24} color={Colors.white} />
            <Text style={styles.combinedButtonText}>Play All Animations</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: scaleHeight(40),
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: scaleHeight(20),
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: scaleHeight(20),
  },
  content: {
    paddingHorizontal: scaleWidth(16),
  },
  demoSection: {
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(12),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  demoTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(12),
  },
  demoBox: {
    width: scaleWidth(150),
    height: scaleHeight(100),
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleHeight(8),
  },
  demoText: {
    fontSize: scaleFont(14),
    color: Colors.white,
    fontWeight: '600',
  },
  loadingButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(12),
    borderRadius: scaleWidth(8),
    gap: scaleWidth(8),
    alignItems: 'center',
  },
  loadingButtonText: {
    color: Colors.white,
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    marginTop: scaleHeight(12),
  },
  progressBarBackground: {
    height: scaleHeight(8),
    backgroundColor: Colors.divider,
    borderRadius: scaleWidth(4),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: scaleHeight(8),
    backgroundColor: Colors.success,
    borderRadius: scaleWidth(4),
  },
  progressText: {
    textAlign: 'center',
    marginTop: scaleHeight(8),
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  dragContainer: {
    height: scaleHeight(220),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: scaleWidth(12),
    marginVertical: scaleHeight(12),
    borderWidth: 2,
    borderColor: Colors.divider,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  draggableBox: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: Colors.accent,
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dragText: {
    color: Colors.white,
    fontSize: scaleFont(12),
    fontWeight: '600',
    marginTop: scaleHeight(4),
  },
  resetButton: {
    flexDirection: 'row',
    marginTop: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    backgroundColor: Colors.primary,
    borderRadius: scaleWidth(6),
    gap: scaleWidth(6),
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.white,
    fontSize: scaleFont(12),
    fontWeight: '500',
  },
  combinedButton: {
    flexDirection: 'row',
    backgroundColor: Colors.warning,
    paddingHorizontal: scaleWidth(24),
    paddingVertical: scaleHeight(14),
    borderRadius: scaleWidth(12),
    gap: scaleWidth(10),
    alignItems: 'center',
    elevation: 2,
  },
  combinedButtonText: {
    color: Colors.white,
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  bottomPadding: {
    height: scaleHeight(20),
  },
});

export default AnimationDemoScreen;