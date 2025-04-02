import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:intl/intl.dart';
import 'package:cleaning_program/models/todo_item.dart';

class CalendarView extends StatefulWidget {
  final List<TodoItem> todos;

  const CalendarView({Key? key, required this.todos}) : super(key: key);

  @override
  State<CalendarView> createState() => _CalendarViewState();
}

class _CalendarViewState extends State<CalendarView> {
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;
  Map<DateTime, List<TodoItem>> _events = {};

  @override
  void initState() {
    super.initState();
    _initializeEvents();
  }

  void _initializeEvents() {
    _events = {};
    for (var todo in widget.todos) {
      final date = DateTime(
        todo.createdAt.year,
        todo.createdAt.month,
        todo.createdAt.day,
      );
      if (_events[date] == null) {
        _events[date] = [];
      }
      _events[date]!.add(todo);
    }
  }

  List<TodoItem> _getEventsForDay(DateTime day) {
    return _events[day] ?? [];
  }

  void _showDayDetails(DateTime day) {
    final events = _getEventsForDay(day);
    if (events.isEmpty) return;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => DayDetailsSheet(
        date: day,
        todos: events,
      ),
    );
  }

  void _showMoreDetails() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => HistoryView(todos: widget.todos),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ElevatedButton(
            onPressed: _showMoreDetails,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF4ECDC4),
              minimumSize: const Size(double.infinity, 50),
            ),
            child: const Text(
              'Daha Fazla Detay',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
        TableCalendar(
          firstDay: DateTime.utc(2020, 1, 1),
          lastDay: DateTime.utc(2030, 12, 31),
          focusedDay: _focusedDay,
          selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
          eventLoader: _getEventsForDay,
          onDaySelected: (selectedDay, focusedDay) {
            setState(() {
              _selectedDay = selectedDay;
              _focusedDay = focusedDay;
            });
            _showDayDetails(selectedDay);
          },
          calendarStyle: CalendarStyle(
            markersMaxCount: 1,
            markerDecoration: const BoxDecoration(
              color: Color(0xFF4ECDC4),
              shape: BoxShape.circle,
            ),
            selectedDecoration: const BoxDecoration(
              color: Color(0xFF4ECDC4),
              shape: BoxShape.circle,
            ),
            todayDecoration: BoxDecoration(
              color: const Color(0xFF4ECDC4).withOpacity(0.5),
              shape: BoxShape.circle,
            ),
          ),
        ),
      ],
    );
  }
}

class DayDetailsSheet extends StatelessWidget {
  final DateTime date;
  final List<TodoItem> todos;

  const DayDetailsSheet({
    Key? key,
    required this.date,
    required this.todos,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color(0xFF4ECDC4),
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
            ),
            child: Text(
              DateFormat('d MMMM yyyy').format(date),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            padding: const EdgeInsets.all(16),
            itemCount: todos.length,
            itemBuilder: (context, index) {
              final todo = todos[index];
              return ListTile(
                title: Text(todo.title),
                subtitle: Text(
                  DateFormat('HH:mm').format(todo.createdAt),
                  style: const TextStyle(color: Colors.grey),
                ),
                onTap: () => _showTodoDetails(context, todo),
              );
            },
          ),
        ],
      ),
    );
  }

  void _showTodoDetails(BuildContext context, TodoItem todo) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(todo.title),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Oluşturulma: ${DateFormat('dd/MM/yyyy HH:mm').format(todo.createdAt)}'),
            if (todo.updatedAt != null)
              Text('Son Güncelleme: ${DateFormat('dd/MM/yyyy HH:mm').format(todo.updatedAt!)}'),
            Text('Durum: ${todo.isCompleted ? 'Tamamlandı' : 'Devam Ediyor'}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Kapat'),
          ),
        ],
      ),
    );
  }
}

class HistoryView extends StatelessWidget {
  final List<TodoItem> todos;

  const HistoryView({Key? key, required this.todos}) : super(key: key);

  Map<int, Map<int, List<TodoItem>>> _organizeByYearAndMonth() {
    final organized = <int, Map<int, List<TodoItem>>>{};
    
    for (var todo in todos) {
      final year = todo.createdAt.year;
      final month = todo.createdAt.month;
      
      organized[year] ??= {};
      organized[year]![month] ??= [];
      organized[year]![month]!.add(todo);
    }
    
    return organized;
  }

  @override
  Widget build(BuildContext context) {
    final organizedData = _organizeByYearAndMonth();
    final years = organizedData.keys.toList()..sort((a, b) => b.compareTo(a));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Geçmiş Detayları'),
        backgroundColor: const Color(0xFF4ECDC4),
      ),
      body: ListView.builder(
        itemCount: years.length,
        itemBuilder: (context, index) {
          final year = years[index];
          return ExpansionTile(
            title: Text('$year'),
            children: [
              for (var month in organizedData[year]!.keys.toList()..sort((a, b) => b.compareTo(a)))
                ExpansionTile(
                  title: Text(DateFormat('MMMM').format(DateTime(year, month))),
                  children: organizedData[year]![month]!
                      .map((todo) => ListTile(
                            title: Text(todo.title),
                            subtitle: Text(_formatDateTime(todo.createdAt)),
                            onTap: () => _showDetailedHistory(context, todo),
                          ))
                      .toList(),
                ),
            ],
          );
        },
      ),
    );
  }

  String _formatDateTime(DateTime dateTime) {
    return DateFormat('dd/MM/yyyy HH:mm:ss').format(dateTime);
  }

  void _showDetailedHistory(BuildContext context, TodoItem todo) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(todo.title),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Oluşturulma Tarihi:\n${_formatDateTime(todo.createdAt)}'),
            const SizedBox(height: 8),
            if (todo.updatedAt != null) ...[
              Text('Son Güncelleme Tarihi:\n${_formatDateTime(todo.updatedAt!)}'),
              const SizedBox(height: 8),
            ],
            Text('Durum: ${todo.isCompleted ? 'Tamamlandı' : 'Devam Ediyor'}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Kapat'),
          ),
        ],
      ),
    );
  }
} 