import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/timezone.dart' as tz;
import '../models/todo_item.dart';

class NotificationService {
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;

  NotificationService({
    required this.flutterLocalNotificationsPlugin,
  });

  static Future<NotificationService> init() async {
    final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = 
        FlutterLocalNotificationsPlugin();
    
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    
    const DarwinInitializationSettings initializationSettingsIOS =
        DarwinInitializationSettings(
      requestSoundPermission: true,
      requestBadgePermission: true,
      requestAlertPermission: true,
    );
    
    final InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );
    
    await flutterLocalNotificationsPlugin.initialize(
      initializationSettings,
    );
    
    return NotificationService(
      flutterLocalNotificationsPlugin: flutterLocalNotificationsPlugin,
    );
  }

  Future<void> scheduleNotification(TodoItem todo) async {
    if (todo.reminderTime == null || todo.nextDueDate == null) return;
     
    final DateTime scheduledDate = DateTime(
      todo.nextDueDate!.year,
      todo.nextDueDate!.month,
      todo.nextDueDate!.day,
      todo.reminderTime!.hour,
      todo.reminderTime!.minute,
    );
    
    // Eğer hatırlatma zamanı geçmişse, bildirim oluşturma
    if (scheduledDate.isBefore(DateTime.now())) return;
    
    final tz.TZDateTime scheduledTZDate = tz.TZDateTime.from(
      scheduledDate, 
      tz.local,
    );
    
    final androidDetails = const AndroidNotificationDetails(
      'todo_channel',
      'Todo Reminders',
      channelDescription: 'Notifications for todo reminders',
      importance: Importance.high,
      priority: Priority.high,
    );
    
    final platformDetails = NotificationDetails(android: androidDetails);
    
    await flutterLocalNotificationsPlugin.zonedSchedule(
      todo.id.hashCode,
      'Görev Hatırlatması',
      '${todo.title} görevini tamamlama zamanı!',
      scheduledTZDate,
      platformDetails,
      androidAllowWhileIdle: true,
      uiLocalNotificationDateInterpretation: 
          UILocalNotificationDateInterpretation.absoluteTime,
      matchDateTimeComponents: DateTimeComponents.time,
    );
  }

  Future<void> cancelNotification(TodoItem todo) async {
    await flutterLocalNotificationsPlugin.cancel(todo.id.hashCode);
  }
} 