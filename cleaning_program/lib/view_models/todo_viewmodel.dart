import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/todo_item.dart';
import '../models/token_points.dart';
import '../services/notification_service.dart';

class TodoViewModel extends ChangeNotifier {
  List<TodoItem> _todos = [];
  int _userPoints = 0;
  int _userSavTokens = 0;
  late NotificationService _notificationService;
  bool _isInitialized = false;

  TodoViewModel() {
    _initServices();
  }
  
  Future<void> _initServices() async {
    _notificationService = await NotificationService.init();
    await _initData();
    _isInitialized = true;
    notifyListeners();
  }

  List<TodoItem> get todos => _todos;
  int get userPoints => _userPoints;
  int get userSavTokens => _userSavTokens;
  bool get isInitialized => _isInitialized;

  List<TodoItem> get todosForToday {
    final now = DateTime.now();
    return _todos.where((todo) => 
      todo.nextDueDate != null && 
      todo.nextDueDate!.year == now.year &&
      todo.nextDueDate!.month == now.month &&
      todo.nextDueDate!.day == now.day
    ).toList();
  }

  Future<void> _initData() async {
    await _loadTodos();
    await _loadUserData();
  }

  Future<void> _loadTodos() async {
    final prefs = await SharedPreferences.getInstance();
    final todosJson = prefs.getStringList('todos') ?? [];
    _todos = todosJson
        .map((item) => TodoItem.fromJson(jsonDecode(item)))
        .toList();
    notifyListeners();
  }

  Future<void> _saveTodos() async {
    final prefs = await SharedPreferences.getInstance();
    final todosJson = _todos.map((item) => jsonEncode(item.toJson())).toList();
    await prefs.setStringList('todos', todosJson);
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    _userPoints = prefs.getInt('userPoints') ?? 0;
    _userSavTokens = prefs.getInt('userSavTokens') ?? 0;
    notifyListeners();
  }
  
  Future<void> _saveUserData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('userPoints', _userPoints);
    await prefs.setInt('userSavTokens', _userSavTokens);
  }

  Future<void> addTodo(String title, {int? repeatDays, TimeOfDay? reminderTime}) async {
    if (title.isEmpty) return;

    final newTodo = TodoItem(
      id: DateTime.now().toString(),
      title: title,
      points: 5, // Yeni görev için standart puanlar
      savTokens: 1, // Her görev için 1 SAV Token
    );
    
    if (repeatDays != null && repeatDays > 0) {
      newTodo.repeatDays = repeatDays;
      newTodo.nextDueDate = DateTime.now().add(Duration(days: repeatDays));
    }
    
    newTodo.reminderTime = reminderTime;
    
    // Eğer bildirim zamanı ayarlandıysa, bildirimi zamanla
    if (newTodo.nextDueDate != null && newTodo.reminderTime != null) {
      await _notificationService.scheduleNotification(newTodo);
    }
    
    _todos.add(newTodo);
    await _saveTodos();
    notifyListeners();
  }

  Future<void> updateTodo(
      TodoItem todo, 
      {String? title, int? repeatDays, TimeOfDay? reminderTime}) async {
    final index = _todos.indexWhere((item) => item.id == todo.id);
    if (index == -1) return;
    
    if (title != null) {
      _todos[index].title = title;
    }
    
    _todos[index].updatedAt = DateTime.now();
    
    if (repeatDays != null) {
      _todos[index].repeatDays = repeatDays;
      if (repeatDays > 0) {
        _todos[index].nextDueDate = DateTime.now().add(Duration(days: repeatDays));
      } else {
        _todos[index].nextDueDate = null;
      }
    }
    
    if (reminderTime != null) {
      _todos[index].reminderTime = reminderTime;
    }
    
    // Bildirim zamanlaması
    if (_todos[index].nextDueDate != null && _todos[index].reminderTime != null) {
      await _notificationService.scheduleNotification(_todos[index]);
    } else {
      await _notificationService.cancelNotification(_todos[index]);
    }
    
    await _saveTodos();
    notifyListeners();
  }

  Future<void> toggleTodoCompletion(String id) async {
    final todo = _todos.firstWhere((item) => item.id == id);
    todo.isCompleted = !todo.isCompleted;
    todo.updatedAt = DateTime.now();
    
    if (todo.isCompleted) {
      // Görev tamamlandı, puanları ve token'ları ekle
      todo.streak++;
      
      // Ödül hesaplama
      final reward = TokenPoints.calculateReward(true, todo.streak);
      _userPoints += reward.stars;
      _userSavTokens += reward.tokens;
      await _saveUserData();
      
      // Eğer tekrarlı görevse, sonraki tarihi ayarla ve bildirimi güncelle
      if (todo.repeatDays != null && todo.repeatDays! > 0) {
        todo.nextDueDate = DateTime.now().add(Duration(days: todo.repeatDays!));
        todo.isCompleted = false; // Tekrarlı görevler tamamlanınca yeniden aktif olur
        
        if (todo.reminderTime != null) {
          await _notificationService.scheduleNotification(todo);
        }
      } else {
        // Tekrarlı olmayan görevlerin bildirimlerini iptal et
        await _notificationService.cancelNotification(todo);
      }
    } else {
      // Görev tamamlanmaktan çıkarıldı, streak'i sıfırla
      todo.streak = 0;
    }
    
    await _saveTodos();
    notifyListeners();
  }

  Future<void> deleteTodo(String id) async {
    final todo = _todos.firstWhere((item) => item.id == id);
    await _notificationService.cancelNotification(todo);
    
    _todos.removeWhere((item) => item.id == id);
    await _saveTodos();
    notifyListeners();
  }

  Future<void> reorderTodos(int oldIndex, int newIndex) async {
    if (newIndex > oldIndex) {
      newIndex -= 1;
    }
    final item = _todos.removeAt(oldIndex);
    _todos.insert(newIndex, item);
    await _saveTodos();
    notifyListeners();
  }
} 