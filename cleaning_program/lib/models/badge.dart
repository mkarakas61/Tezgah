class Badge {
  final String id;
  final String name;
  final String description;
  final String iconPath;
  final int requiredPoints;
  bool isUnlocked;

  Badge({
    required this.id,
    required this.name,
    required this.description,
    required this.iconPath,
    required this.requiredPoints,
    this.isUnlocked = false,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'iconPath': iconPath,
      'requiredPoints': requiredPoints,
      'isUnlocked': isUnlocked,
    };
  }

  factory Badge.fromJson(Map<String, dynamic> json) {
    return Badge(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      iconPath: json['iconPath'],
      requiredPoints: json['requiredPoints'],
      isUnlocked: json['isUnlocked'] ?? false,
    );
  }
} 