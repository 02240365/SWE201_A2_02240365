import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const menuItems = [
    { 
      icon: 'person', 
      title: 'Personal Information', 
      onPress: () => Alert.alert(
        '👤 Personal Information',
        'Name: Sonam Zangmo\nStudent ID: 02240365\nCourse: BE Software Engineering\nYear: 2nd Year\nSection: CST\nEmail: 02240365.cst@rub.edu.bt',
        [{ text: 'OK' }]
      )
    },
    { 
      icon: 'stats-chart', 
      title: 'Study Statistics', 
      onPress: () => Alert.alert(
        '📊 Study Statistics',
        '📚 This Week:\n• Study Hours: 12\n• Tasks Completed: 5\n• Upcoming Deadlines: 3\n• Focus Score: 85%\n\n📈 Monthly Progress: +15%\n\nKeep up the great work!',
        [{ text: 'Thanks!' }]
      )
    },
    { 
      icon: 'star', 
      title: 'Achievements', 
      onPress: () => Alert.alert(
        '🏆 Achievements',
        'Earned Badges:\n\n✅ First Task Complete\n✅ 5 Tasks Done\n✅ Early Bird (Submitted before deadline)\n✅ Consistent Learner (7-day streak)\n✅ Assignment Master\n\n🔒 Locked: Complete 20 tasks to unlock "Task Champion"',
        [{ text: 'Awesome!' }]
      )
    },
    { 
      icon: 'help-circle', 
      title: 'Help & Support', 
      onPress: () => Alert.alert(
        '📧 Help & Support',
        'FAQs:\n\nQ: How do I add a task?\nA: Tap "Add Task" on Home screen\n\nQ: How to set reminders?\nA: Go to Task Details > Set Reminder\n\nQ: Need more help?\nA: Contact: support@studentplanner.com\n\nVersion: 2.0.0',
        [{ text: 'Got it' }]
      )
    },
    { 
      icon: 'information-circle', 
      title: 'About', 
      onPress: () => Alert.alert(
        '📱 About Student Planner',
        'Version 2.0.0\n\nA comprehensive productivity app for students to manage assignments, track progress, and stay organized.\n\nFeatures:\n• Task Management\n• Progress Tracking\n• Study Analytics\n• Interactive Animations\n• Gesture Controls\n\nDeveloped for SWE201 Assignment 2\n© 2024 Sonam Zangmo',
        [{ text: 'OK' }]
      )
    },
    { 
      icon: 'color-palette', 
      title: 'Theme Settings', 
      onPress: () => Alert.alert(
        '🎨 Theme Settings',
        'Current Theme: Blue/White Professional\n\nAvailable Themes:\n• Blue Professional (Current)\n• Dark Mode (Coming Soon)\n• Green Nature (Coming Soon)\n\nCustom themes will be available in next update!',
        [{ text: 'OK' }]
      )
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out? You will need to sign in again.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive', 
          onPress: () => Alert.alert(
            'Logged Out', 
            'You have been logged out successfully.\n\nThank you for using Student Planner!',
            [{ text: 'OK' }]
          ) 
        }
      ]
    );
  };

  const handleSaveSettings = () => {
    Alert.alert(
      'Settings Saved',
      'Your preferences have been updated successfully!',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SZ</Text>
          </View>
          <TouchableOpacity 
            style={styles.editIcon}
            onPress={() => Alert.alert('Edit Profile', 'Profile picture editor coming soon!')}
          >
            <Ionicons name="camera" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Sonam Zangmo</Text>
        <Text style={styles.email}>02240365.cst@rub.edu.bt</Text>
        <Text style={styles.role}>Software Engineering Student</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Ionicons name="flame" size={14} color={Colors.warning} />
            <Text style={styles.badgeText}>7 Day Streak</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="trophy" size={14} color={Colors.warning} />
            <Text style={styles.badgeText}>Top Performer</Text>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={22} color={Colors.primary} />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.divider, true: Colors.primaryLight }}
            thumbColor={notifications ? Colors.primary : Colors.textHint}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon" size={22} color={Colors.primary} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.divider, true: Colors.primaryLight }}
            thumbColor={darkMode ? Colors.primary : Colors.textHint}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="alarm" size={22} color={Colors.primary} />
            <Text style={styles.settingText}>Study Reminders</Text>
          </View>
          <Switch
            value={reminders}
            onValueChange={setReminders}
            trackColor={{ false: Colors.divider, true: Colors.primaryLight }}
            thumbColor={reminders ? Colors.primary : Colors.textHint}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="mail" size={22} color={Colors.primary} />
            <Text style={styles.settingText}>Email Updates</Text>
          </View>
          <Switch
            value={emailUpdates}
            onValueChange={setEmailUpdates}
            trackColor={{ false: Colors.divider, true: Colors.primaryLight }}
            thumbColor={emailUpdates ? Colors.primary : Colors.textHint}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon as any} size={22} color={Colors.primary} />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textHint} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
        <Ionicons name="log-out" size={22} color={Colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
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
    backgroundColor: Colors.primary,
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(30),
    alignItems: 'center',
    borderBottomLeftRadius: scaleWidth(30),
    borderBottomRightRadius: scaleWidth(30),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: scaleHeight(12),
  },
  avatar: {
    width: scaleWidth(100),
    height: scaleWidth(100),
    borderRadius: scaleWidth(50),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: scaleFont(36),
    fontWeight: '700',
    color: Colors.primary,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.accent,
    borderRadius: scaleWidth(15),
    padding: scaleWidth(6),
  },
  name: {
    fontSize: scaleFont(24),
    fontWeight: '700',
    color: Colors.white,
    marginTop: scaleHeight(8),
  },
  email: {
    fontSize: scaleFont(14),
    color: Colors.primaryLight,
    marginTop: scaleHeight(4),
  },
  role: {
    fontSize: scaleFont(12),
    color: Colors.primaryLight,
    marginTop: scaleHeight(2),
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: scaleWidth(12),
    marginTop: scaleHeight(12),
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(12),
    gap: scaleWidth(4),
    alignItems: 'center',
  },
  badgeText: {
    fontSize: scaleFont(11),
    color: Colors.white,
  },
  section: {
    backgroundColor: Colors.white,
    marginTop: scaleHeight(16),
    marginHorizontal: scaleWidth(16),
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: scaleHeight(12),
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(10),
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(12),
  },
  settingText: {
    fontSize: scaleFont(15),
    color: Colors.textPrimary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(8),
    alignItems: 'center',
    marginTop: scaleHeight(12),
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(12),
  },
  menuText: {
    fontSize: scaleFont(15),
    color: Colors.textPrimary,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  appVersion: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
  },
  copyright: {
    fontSize: scaleFont(10),
    color: Colors.textHint,
    marginTop: scaleHeight(4),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaleWidth(20),
    padding: scaleHeight(14),
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(12),
    gap: scaleWidth(8),
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutText: {
    fontSize: scaleFont(16),
    color: Colors.error,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: scaleHeight(30),
  },
});

export default ProfileScreen;