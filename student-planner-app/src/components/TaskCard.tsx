import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { scaleWidth, scaleHeight, scaleFont } from '../utils/responsive';

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  onPress: () => void;
  onLongPress?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  priority,
  onPress,
  onLongPress,
}) => {
  const getPriorityColor = () => {
    switch (priority) {
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

  const getPriorityIcon = () => {
    switch (priority) {
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

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
            <Ionicons name={getPriorityIcon()} size={12} color={Colors.white} />
            <Text style={styles.priorityText}>{priority}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={14} color={Colors.textSecondary} />
            <Text style={styles.dateText}>Due: {dueDate}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: scaleWidth(12),
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(8),
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    padding: scaleWidth(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(8),
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: scaleWidth(8),
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(12),
    gap: scaleWidth(4),
  },
  priorityText: {
    fontSize: scaleFont(10),
    color: Colors.white,
    fontWeight: '500',
  },
  description: {
    fontSize: scaleFont(13),
    color: Colors.textSecondary,
    marginBottom: scaleHeight(12),
    lineHeight: scaleHeight(18),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(6),
  },
  dateText: {
    fontSize: scaleFont(12),
    color: Colors.textSecondary,
  },
});

export default TaskCard;