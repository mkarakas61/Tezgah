import 'package:flutter/material.dart';

class TodoItem {
  final String id;
  String title;
  bool isCompleted;
  final DateTime createdAt;
  DateTime? updatedAt;
  int? repeatDays; // Kaç günde bir tekrarlanacak
  DateTime? nextDueDate; // Bir sonraki yapılması gereken tarih
  TimeOfDay? reminderTime; // Bildirim saati
  int streak = 0; // Görevin kaç kez arka arkaya tamamlandığı (streak)
  int points = 0; // Görev tamamlandığında kazanılan puanlar
  int savTokens = 0; // Kazanılan SAV token miktarı

  TodoItem({
    required this.id,
    required this.title,
    this.isCompleted = false,
    DateTime? createdAt,
    this.updatedAt,
    this.repeatDays,
    this.nextDueDate,
    this.reminderTime,
    this.streak = 0,
    this.points = 0,
    this.savTokens = 0,
  }) : createdAt = createdAt ?? DateTime.now();

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'isCompleted': isCompleted,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      'repeatDays': repeatDays,
      'nextDueDate': nextDueDate?.toIso8601String(),
      'reminderTime': reminderTime != null 
          ? {'hour': reminderTime!.hour, 'minute': reminderTime!.minute}
          : null,
      'streak': streak,
      'points': points,
      'savTokens': savTokens,
    };
  }

  factory TodoItem.fromJson(Map<String, dynamic> json) {
    return TodoItem(
      id: json['id'],
      title: json['title'],
      isCompleted: json['isCompleted'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
      repeatDays: json['repeatDays'],
      nextDueDate: json['nextDueDate'] != null ? DateTime.parse(json['nextDueDate']) : null,
      reminderTime: json['reminderTime'] != null 
          ? TimeOfDay(hour: json['reminderTime']['hour'], minute: json['reminderTime']['minute'])
          : null,
      streak: json['streak'] ?? 0,
      points: json['points'] ?? 0,
      savTokens: json['savTokens'] ?? 0,
    );
  }
} 