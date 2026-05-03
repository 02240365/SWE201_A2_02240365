import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { dummyTasks } from '../data/dummyData';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';
import { RootStackParamList } from '../navigation/StackNavigator';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { taskId } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const task = dummyTasks.find(t => t.id === taskId);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
    ]).start();
  }, []);

  const getPriorityIcon = () => {
    switch (task?.priority) {
      case 'High':
        return 'alert-circle';
      case 'Medium':
        return 'time';
      case 'Low':
        return 'checkmark-circle';
      default:
        return 'information-circle';
    }
  };

  const getPriorityColor = () => {
    switch (task?.priority) {
      case 'High':
        return Colors.error;
      case 'Medium':
        return Colors.warning;
      case 'Low':
        return Colors.success;
      default:
        return Colors.textSecondary;
    }
  };

  if (!task) {
    return (
      <View style={styles.centerContainer}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Priority Badge */}
        <View style={styles.priorityContainer}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
            <Ionicons name={getPriorityIcon()} size={20} color={Colors.white} />
            <Text style={styles.priorityText}>{task.priority} Priority</Text>
          </View>
        </View>

        {/* Task Title */}
        <Text style={styles.title}>{task.title}</Text>

        {/* Category */}
        <View style={styles.infoRow}>
          <Ionicons name="folder" size={20} color={Colors.textSecondary} />
          <Text style={styles.infoText}>Category: {task.category}</Text>
        </View>

        {/* Due Date */}
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color={Colors.textSecondary} />
          <Text style={styles.infoText}>Due Date: {task.dueDate}</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        {/* Action Buttons with Animations */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={() => setIsCompleted(!isCompleted)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCompleted ? 'checkmark-circle' : 'checkbox-outline'}
              size={24}
              color={Colors.white}
            />
            <Text style={styles.buttonText}>
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.reminderButton]}>
            <Ionicons name="notifications" size={24} color={Colors.white} />
            <Text style={styles.buttonText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    borderRadius: scaleWidth(20),
    gap: scaleWidth(8),
  },
  priorityText: {
    fontSize: scaleFont(14),
    color: Colors.white,
    fontWeight: '600',
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(20),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(12),
    gap: scaleWidth(12),
  },
  infoText: {
    fontSize: scaleFont(16),
    color: Colors.textSecondary,
  },
  descriptionSection: {
    backgroundColor: Colors.white,
    margin: scaleWidth(20),
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(12),
  },
  description: {
    fontSize: scaleFont(16),
    color: Colors.textSecondary,
    lineHeight: scaleHeight(24),
  },
  actionButtons: {
    padding: scaleWidth(20),
    gap: scaleHeight(12),
    marginBottom: scaleHeight(20),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaleHeight(14),
    borderRadius: scaleWidth(12),
    gap: scaleWidth(8),
  },
  completeButton: {
    backgroundColor: Colors.success,
  },
  reminderButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: scaleFont(16),
    color: Colors.white,
    fontWeight: '600',
  },
});

export default DetailScreen;