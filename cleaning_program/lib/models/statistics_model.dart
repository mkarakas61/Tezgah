import 'package:flutter/material.dart';

class StatisticsData {
  final String period;
  final int totalTasks;
  final int completedTasks;
  final double completionRate;

  StatisticsData({
    required this.period,
    required this.totalTasks,
    required this.completedTasks,
    required this.completionRate,
  });
}

class StatisticsModel extends ChangeNotifier {
  List<StatisticsData> _dailyStats = [];
  List<StatisticsData> _monthlyStats = [];
  List<StatisticsData> _yearlyStats = [];

  List<StatisticsData> get dailyStats => _dailyStats;
  List<StatisticsData> get monthlyStats => _monthlyStats;
  List<StatisticsData> get yearlyStats => _yearlyStats;

  void updateStatistics(List<Map<String, dynamic>> todos) {
    _updateDailyStats(todos);
    _updateMonthlyStats(todos);
    _updateYearlyStats(todos);
    notifyListeners();
  }

  void _updateDailyStats(List<Map<String, dynamic>> todos) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    
    final dailyTasks = todos.where((todo) {
      final todoDate = DateTime.parse(todo['date']);
      return DateTime(todoDate.year, todoDate.month, todoDate.day) == today;
    }).toList();

    final total = dailyTasks.length;
    final completed = dailyTasks.where((todo) => todo['isCompleted'] == true).length;
    final rate = total > 0 ? (completed / total) * 100.0 : 0.0;

    _dailyStats = [
      StatisticsData(
        period: 'Bugün',
        totalTasks: total,
        completedTasks: completed,
        completionRate: rate,
      ),
    ];
  }

  void _updateMonthlyStats(List<Map<String, dynamic>> todos) {
    final now = DateTime.now();
    final monthStart = DateTime(now.year, now.month, 1);
    
    final monthlyTasks = todos.where((todo) {
      final todoDate = DateTime.parse(todo['date']);
      return todoDate.isAfter(monthStart.subtract(const Duration(days: 1)));
    }).toList();

    final total = monthlyTasks.length;
    final completed = monthlyTasks.where((todo) => todo['isCompleted'] == true).length;
    final rate = total > 0 ? (completed / total) * 100.0 : 0.0;

    _monthlyStats = [
      StatisticsData(
        period: 'Bu Ay',
        totalTasks: total,
        completedTasks: completed,
        completionRate: rate,
      ),
    ];
  }

  void _updateYearlyStats(List<Map<String, dynamic>> todos) {
    final now = DateTime.now();
    final yearStart = DateTime(now.year, 1, 1);
    
    final yearlyTasks = todos.where((todo) {
      final todoDate = DateTime.parse(todo['date']);
      return todoDate.isAfter(yearStart.subtract(const Duration(days: 1)));
    }).toList();

    final total = yearlyTasks.length;
    final completed = yearlyTasks.where((todo) => todo['isCompleted'] == true).length;
    final rate = total > 0 ? (completed / total) * 100.0 : 0.0;

    _yearlyStats = [
      StatisticsData(
        period: 'Bu Yıl',
        totalTasks: total,
        completedTasks: completed,
        completionRate: rate,
      ),
    ];
  }
} 