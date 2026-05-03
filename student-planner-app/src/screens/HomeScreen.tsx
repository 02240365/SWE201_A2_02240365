import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  Modal,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import TaskCard from '../components/TaskCard';
import ProgressBar from '../components/ProgressBar';
import { dummyTasks } from '../data/dummyData';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';
import { RootStackParamList } from '../navigation/StackNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tasks, setTasks] = useState(dummyTasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [refreshing, setRefreshing] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completionRate = (tasks.filter(t => t.completed).length / tasks.length) * 100;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('Detail', { taskId });
  };

  const handleLongPress = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    Alert.alert(
      'Task Options',
      `What would you like to do with "${task?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit feature coming soon') },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setTasks(tasks.filter(t => t.id !== taskId));
          Alert.alert('Deleted', 'Task has been deleted');
        }}
      ]
    );
  };

  const handleAddTask = () => {
    setModalVisible(true);
  };

  const handleSchedule = () => {
    Alert.alert(
      'Weekly Schedule',
      '📅 Your Week at a Glance:\n\nMonday: Math Study (2hrs)\nTuesday: SWE201 Project (3hrs)\nWednesday: Physics Lab (2hrs)\nThursday: Database Assignment (2hrs)\nFriday: Review Week (1hr)\n\nStay consistent!',
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  const handleAnalytics = () => {
    const highPriority = tasks.filter(t => t.priority === 'High' && !t.completed).length;
    Alert.alert(
      '📊 Study Analytics',
      `Your Performance Summary:\n\n• Total Tasks: ${tasks.length}\n• Completed: ${tasks.filter(t => t.completed).length}\n• Completion Rate: ${Math.round(completionRate)}%\n• High Priority Remaining: ${highPriority}\n• On Track: ${completionRate > 50 ? '✅ Yes!' : '⚠️ Need improvement'}`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const handleSeeAll = () => {
    if (incompleteTasks.length === 0) {
      Alert.alert('All Done!', 'No pending tasks! Great job! 🎉');
    } else {
      const taskList = incompleteTasks.map(t => `• ${t.title} (Due: ${t.dueDate} - ${t.priority} priority)`).join('\n');
      Alert.alert(
        `Pending Tasks (${incompleteTasks.length})`,
        taskList,
        [{ text: 'OK' }]
      );
    }
  };

  const submitNewTask = () => {
    if (newTaskTitle.trim()) {
      Alert.alert(
        '✅ Task Added',
        `"${newTaskTitle}" has been added to your tasks with ${selectedPriority} priority!`,
        [{ text: 'OK', style: 'default' }]
      );
      setModalVisible(false);
      setNewTaskTitle('');
      setNewTaskDesc('');
      setSelectedPriority('Medium');
    } else {
      Alert.alert('Error', 'Please enter a task title');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('🔄 Refreshed', 'Your tasks have been updated!');
    }, 1000);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
        }
      >
        {/* Welcome Header */}
        <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.greeting}>Hello, Sonam!</Text>
            <Text style={styles.subtitle}>Welcome to your Student Planner</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationIcon}
            onPress={() => Alert.alert('Notifications', 'You have 3 upcoming deadlines!')}
          >
            <Ionicons name="notifications-outline" size={24} color={Colors.white} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <ProgressBar progress={completionRate / 100} title="Task Completion" />
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.statNumber}>{tasks.filter(t => t.completed).length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color={Colors.warning} />
              <Text style={styles.statNumber}>{incompleteTasks.length}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>{tasks.length}</Text>
              <Text style={styles.statLabel}>Total Tasks</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Tasks Section */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {incompleteTasks.slice(0, 3).map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              priority={task.priority}
              onPress={() => handleTaskPress(task.id)}
              onLongPress={() => handleLongPress(task.id)}
            />
          ))}
          {incompleteTasks.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="checkmark-done-circle" size={48} color={Colors.success} />
              <Text style={styles.emptyText}>All tasks completed!</Text>
              <Text style={styles.emptySubtext}>Great job! Add new tasks to continue</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddTask}>
              <Ionicons name="add-circle" size={32} color={Colors.primary} />
              <Text style={styles.actionText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSchedule}>
              <Ionicons name="calendar" size={32} color={Colors.primary} />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleAnalytics}>
              <Ionicons name="analytics" size={32} color={Colors.primary} />
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Extra spacing at bottom for better scrolling */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              placeholderTextColor={Colors.textHint}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              placeholderTextColor={Colors.textHint}
              value={newTaskDesc}
              onChangeText={setNewTaskDesc}
              multiline
              numberOfLines={3}
            />
            
            <Text style={styles.priorityLabel}>Priority:</Text>
            <View style={styles.priorityButtons}>
              {(['High', 'Medium', 'Low'] as const).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityOption,
                    selectedPriority === priority && styles.prioritySelected,
                    { backgroundColor: selectedPriority === priority ? 
                      (priority === 'High' ? Colors.error : priority === 'Medium' ? Colors.warning : Colors.success) : Colors.divider }
                  ]}
                  onPress={() => setSelectedPriority(priority)}
                >
                  <Text style={[styles.priorityOptionText, selectedPriority === priority && { color: Colors.white }]}>
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.submitButton]} onPress={submitNewTask}>
                <Text style={styles.submitButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  welcomeSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
  },
  greeting: {
    fontSize: scaleFont(24),
    fontWeight: '700',
    color: Colors.white,
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: Colors.primaryLight,
    marginTop: scaleHeight(4),
  },
  notificationIcon: {
    padding: scaleWidth(8),
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    borderRadius: scaleWidth(10),
    minWidth: scaleWidth(18),
    height: scaleWidth(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: scaleFont(10),
    fontWeight: 'bold',
  },
  progressSection: {
    padding: scaleWidth(20),
    backgroundColor: Colors.white,
    marginHorizontal: scaleWidth(16),
    marginTop: scaleHeight(20),
    borderRadius: scaleWidth(16),
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleHeight(20),
  },
  statCard: {
    alignItems: 'center',
    gap: scaleHeight(4),
  },
  statNumber: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
  },
  tasksSection: {
    marginTop: scaleHeight(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(12),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: scaleFont(14),
    color: Colors.primary,
    fontWeight: '500',
  },
  quickActions: {
    padding: scaleWidth(20),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleHeight(12),
  },
  actionButton: {
    alignItems: 'center',
    gap: scaleHeight(8),
  },
  actionText: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: scaleHeight(40),
    gap: scaleHeight(12),
  },
  emptyText: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.success,
  },
  emptySubtext: {
    fontSize: scaleFont(14),
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: scaleHeight(40),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(20),
    padding: scaleWidth(20),
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(16),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    fontSize: scaleFont(14),
    marginBottom: scaleHeight(12),
    color: Colors.textPrimary,
  },
  textArea: {
    height: scaleHeight(80),
    textAlignVertical: 'top',
  },
  priorityLabel: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(8),
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: scaleWidth(10),
    marginBottom: scaleHeight(20),
  },
  priorityOption: {
    flex: 1,
    paddingVertical: scaleHeight(8),
    borderRadius: scaleWidth(6),
    alignItems: 'center',
  },
  prioritySelected: {
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  priorityOptionText: {
    fontSize: scaleFont(12),
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: scaleWidth(12),
  },
  modalButton: {
    flex: 1,
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(8),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.divider,
  },
  submitButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  submitButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
});

export default HomeScreen;