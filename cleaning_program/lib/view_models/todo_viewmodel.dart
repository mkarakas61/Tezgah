import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/todo_item.dart';
import '../models/token_points.dart';
import '../services/notification_service.dart';

class TodoViewModel extends ChangeNotifier {
  List<Map<String, dynamic>> _todos = [];
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

  List<Map<String, dynamic>> get todos => _todos;
  int get userPoints => _userPoints;
  int get userSavTokens => _userSavTokens;
  bool get isInitialized => _isInitialized;

  List<TodoItem> get todosForToday {
    final now = DateTime.now();
    return _todos.where((todo) => 
      todo['nextDueDate'] != null && 
      todo['nextDueDate']['year'] == now.year &&
      todo['nextDueDate']['month'] == now.month &&
      todo['nextDueDate']['day'] == now.day
    ).toList();
  }

  Future<void> _initData() async {
    await _loadTodos();
    await _loadUserData();
  }

  Future<void> _loadTodos() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final todosJson = prefs.getString('todos');
      if (todosJson != null) {
        final List<dynamic> decodedTodos = json.decode(todosJson);
        _todos = decodedTodos.map((todo) => Map<String, dynamic>.from(todo)).toList();
      }
      _isInitialized = true;
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading todos: $e');
      _isInitialized = true;
      notifyListeners();
    }
  }

  Future<void> _saveTodos() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('todos', json.encode(_todos));
    } catch (e) {
      debugPrint('Error saving todos: $e');
    }
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

  Future<void> addTodo(Map<String, dynamic> todo) async {
    _todos.add(todo);
    await _saveTodos();
    notifyListeners();
  }

  Future<void> updateTodo(int index, Map<String, dynamic> updatedTodo) async {
    if (index >= 0 && index < _todos.length) {
      _todos[index] = updatedTodo;
      await _saveTodos();
      notifyListeners();
    }
  }

  Future<void> deleteTodo(int index) async {
    if (index >= 0 && index < _todos.length) {
      _todos.removeAt(index);
      await _saveTodos();
      notifyListeners();
    }
  }

  Future<void> toggleTodoCompletion(int index) async {
    if (index >= 0 && index < _todos.length) {
      _todos[index]['isCompleted'] = !(_todos[index]['isCompleted'] ?? false);
      await _saveTodos();
      notifyListeners();
    }
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