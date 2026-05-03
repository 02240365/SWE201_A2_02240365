import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dummyCategories, dummyTasks } from '../data/dummyData';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';

const CategoryScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  const handleCategoryPress = (categoryName: string, taskCount: number) => {
    // Find tasks for this category
    const categoryKey = categoryName.slice(0, -1).toLowerCase();
    const categoryTasks = dummyTasks.filter(task => 
      task.category.toLowerCase().includes(categoryKey) || 
      (categoryName === 'Projects' && task.category === 'Project') ||
      (categoryName === 'Assignments' && task.category === 'Assignment')
    );
    
    const taskList = categoryTasks.length > 0 
      ? categoryTasks.map(t => `• ${t.title} (Due: ${t.dueDate} - ${t.priority})`).join('\n')
      : 'No tasks in this category yet';
    
    Alert.alert(
      `📁 ${categoryName}`,
      `Total Tasks: ${taskCount}\n\nYour Tasks:\n${taskList}`,
      [
        { text: 'Close', style: 'cancel' },
        { 
          text: 'View Details', 
          onPress: () => Alert.alert(
            'Quick Stats',
            `Most urgent: ${categoryTasks.filter(t => t.priority === 'High').length} high priority tasks\nUpcoming deadlines: ${categoryTasks.filter(t => !t.completed).length} pending`,
            [{ text: 'OK' }]
          )
        }
      ]
    );
  };

  const getCategoryIcon = (iconName: string) => {
    switch(iconName) {
      case 'document-text': return 'document-text';
      case 'school': return 'school';
      case 'book': return 'book';
      case 'briefcase': return 'briefcase';
      default: return 'folder';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <Text style={styles.headerSubtitle}>Organize your tasks by category</Text>
      </View>

      <View style={styles.categoriesGrid}>
        {dummyCategories.map((category, index) => (
          <Animated.View
            key={category.id}
            style={[
              styles.categoryCard,
              {
                transform: [
                  {
                    scale: scaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
                opacity: scaleAnim,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.categoryTouchable}
              onPress={() => handleCategoryPress(category.name, category.taskCount)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={getCategoryIcon(category.icon)} size={32} color={category.color} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.taskCount}>{category.taskCount} tasks</Text>
              <View style={[styles.progressDot, { backgroundColor: category.color }]} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Quick Tip Section */}
      <View style={styles.tipSection}>
        <Ionicons name="bulb" size={24} color={Colors.warning} />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Pro Tip</Text>
          <Text style={styles.tipText}>Tap any category to see all tasks in that category!</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentSection}>
        <Text style={styles.recentTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.activityText}>Completed "Study for Physics"</Text>
          <Text style={styles.activityTime}>2h ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="add-circle" size={20} color={Colors.primary} />
          <Text style={styles.activityText}>Added "SWE201 Final Project"</Text>
          <Text style={styles.activityTime}>Yesterday</Text>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="notifications" size={20} color={Colors.warning} />
          <Text style={styles.activityText}>Reminder set for "Math Assignment"</Text>
          <Text style={styles.activityTime}>2 days ago</Text>
        </View>
      </View>

      {/* Gesture hint */}
      <View style={styles.gestureHint}>
        <Ionicons name="hand-left" size={20} color={Colors.textSecondary} />
        <Text style={styles.hintText}>Tap any category to filter and view tasks</Text>
      </View>
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: scaleWidth(20),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTitle: {
    fontSize: scaleFont(28),
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: scaleFont(14),
    color: Colors.textSecondary,
    marginTop: scaleHeight(4),
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: scaleWidth(12),
  },
  categoryCard: {
    width: '50%',
    padding: scaleWidth(8),
  },
  categoryTouchable: {
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(16),
    padding: scaleWidth(20),
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  iconContainer: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(12),
  },
  categoryName: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(4),
  },
  taskCount: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
  },
  progressDot: {
    position: 'absolute',
    top: scaleHeight(12),
    right: scaleWidth(12),
    width: scaleWidth(8),
    height: scaleWidth(8),
    borderRadius: scaleWidth(4),
  },
  tipSection: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: scaleWidth(16),
    marginTop: scaleHeight(16),
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
    gap: scaleWidth(12),
    alignItems: 'center',
    elevation: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  tipText: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
    marginTop: scaleHeight(2),
  },
  recentSection: {
    backgroundColor: Colors.white,
    marginHorizontal: scaleWidth(16),
    marginTop: scaleHeight(16),
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
    elevation: 2,
  },
  recentTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(12),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(8),
    gap: scaleWidth(10),
  },
  activityText: {
    flex: 1,
    fontSize: scaleFont(13),
    color: Colors.textPrimary,
  },
  activityTime: {
    fontSize: scaleFont(11),
    color: Colors.textSecondary,
  },
  gestureHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaleHeight(20),
    gap: scaleWidth(8),
  },
  hintText: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
  },
  bottomSpacing: {
    height: scaleHeight(30),
  },
});

export default CategoryScreen;