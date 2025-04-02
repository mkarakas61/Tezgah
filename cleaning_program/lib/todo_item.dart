class TodoItem {
  final String id;
  String title;
  bool isCompleted;
  final DateTime createdAt;
  DateTime? updatedAt;
  List<ChangeLog> changeLogs;

  TodoItem({
    required this.id,
    required this.title,
    this.isCompleted = false,
    DateTime? createdAt,
    this.updatedAt,
    List<ChangeLog>? changeLogs,
  }) : 
    createdAt = createdAt ?? DateTime.now(),
    changeLogs = changeLogs ?? [];

  void addChangeLog(String change) {
    changeLogs.add(ChangeLog(
      timestamp: DateTime.now(),
      change: change,
    ));
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'isCompleted': isCompleted,
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt?.toIso8601String(),
    'changeLogs': changeLogs.map((log) => log.toJson()).toList(),
  };

  factory TodoItem.fromJson(Map<String, dynamic> json) => TodoItem(
    id: json['id'],
    title: json['title'],
    isCompleted: json['isCompleted'],
    createdAt: DateTime.parse(json['createdAt']),
    updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    changeLogs: (json['changeLogs'] as List?)
        ?.map((log) => ChangeLog.fromJson(log))
        .toList() ?? [],
  );
}

class ChangeLog {
  final DateTime timestamp;
  final String change;

  ChangeLog({
    required this.timestamp,
    required this.change,
  });

  Map<String, dynamic> toJson() => {
    'timestamp': timestamp.toIso8601String(),
    'change': change,
  };

  factory ChangeLog.fromJson(Map<String, dynamic> json) => ChangeLog(
    timestamp: DateTime.parse(json['timestamp']),
    change: json['change'],
  );
} 