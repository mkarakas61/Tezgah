import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/todo_viewmodel.dart';
import '../widgets/animations/confetti_animation.dart';
import '../widgets/animations/star_animations.dart';
import '../widgets/todo_item_widget.dart';
import '../models/todo_item.dart';

class TodoListScreen extends StatefulWidget {
  const TodoListScreen({super.key});

  @override
  State<TodoListScreen> createState() => _TodoListScreenState();
}

class _TodoListScreenState extends State<TodoListScreen> {
  final TextEditingController _textController = TextEditingController();
  int? _repeatDays;
  TimeOfDay? _reminderTime;
  Map<String, dynamic>? _editingTodo;
  int? _editingIndex;

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  void _submitTodo(TodoViewModel todoViewModel) {
    if (_textController.text.isEmpty) return;

    final todo = {
      'id': DateTime.now().toString(),
      'title': _textController.text,
      'isCompleted': false,
      'date': DateTime.now().toIso8601String(),
      'repeatDays': _repeatDays,
      'reminderTime': _reminderTime != null
          ? {'hour': _reminderTime!.hour, 'minute': _reminderTime!.minute}
          : null,
    };

    if (_editingIndex != null) {
      todoViewModel.updateTodo(_editingIndex!, todo);
    } else {
      todoViewModel.addTodo(todo);
    }

    _textController.clear();
    setState(() {
      _repeatDays = null;
      _reminderTime = null;
      _editingTodo = null;
      _editingIndex = null;
    });
  }

  void _editTodo(TodoViewModel todoViewModel, int index) {
    final todo = todoViewModel.todos[index];
    _textController.text = todo['title'] ?? '';
    _repeatDays = todo['repeatDays'];
    if (todo['reminderTime'] != null) {
      _reminderTime = TimeOfDay(
        hour: todo['reminderTime']['hour'],
        minute: todo['reminderTime']['minute'],
      );
    }
    setState(() {
      _editingTodo = todo;
      _editingIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Görevler'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Consumer<TodoViewModel>(
        builder: (context, todoViewModel, child) {
          if (!todoViewModel.isInitialized) {
            return const Center(child: CircularProgressIndicator());
          }

          final todos = todoViewModel.todos;
          if (todos.isEmpty) {
            return const Center(
              child: Text(
                'Henüz görev eklenmemiş',
                style: TextStyle(fontSize: 18),
              ),
            );
          }

          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  itemCount: todos.length,
                  itemBuilder: (context, index) {
                    final todo = todos[index];
                    return Dismissible(
                      key: Key(todo['id'] ?? index.toString()),
                      direction: DismissDirection.endToStart,
                      background: Container(
                        alignment: Alignment.centerRight,
                        padding: const EdgeInsets.only(right: 20),
                        color: Colors.red,
                        child: const Icon(
                          Icons.delete,
                          color: Colors.white,
                        ),
                      ),
                      onDismissed: (direction) {
                        todoViewModel.deleteTodo(index);
                      },
                      child: Card(
                        margin: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        child: ListTile(
                          leading: Checkbox(
                            value: todo['isCompleted'] ?? false,
                            onChanged: (value) {
                              todoViewModel.toggleTodoCompletion(index);
                            },
                          ),
                          title: Text(
                            todo['title'] ?? '',
                            style: TextStyle(
                              decoration: (todo['isCompleted'] ?? false)
                                  ? TextDecoration.lineThrough
                                  : null,
                            ),
                          ),
                          subtitle: todo['date'] != null
                              ? Text(
                                  'Tarih: ${DateTime.parse(todo['date']).toString().split(' ')[0]}')
                              : null,
                          trailing: IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () {
                              _editTodo(todoViewModel, index);
                            },
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, -5),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _textController,
                            decoration: InputDecoration(
                              hintText: _editingTodo != null
                                  ? 'Görevi düzenle'
                                  : 'Yeni görev ekle...',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30),
                              ),
                              filled: true,
                              fillColor: Colors.grey.shade100,
                              contentPadding: const EdgeInsets.symmetric(
                                horizontal: 20,
                                vertical: 10,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        CircleAvatar(
                          backgroundColor: Theme.of(context).primaryColor,
                          child: IconButton(
                            icon: Icon(
                              _editingTodo != null ? Icons.check : Icons.add,
                              color: Colors.white,
                            ),
                            onPressed: () => _submitTodo(todoViewModel),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        DropdownButton<int>(
                          value: _repeatDays,
                          hint: const Text('Tekrarla'),
                          underline: Container(),
                          items: const [
                            DropdownMenuItem(
                              value: 0,
                              child: Text('Tekrarlama'),
                            ),
                            DropdownMenuItem(
                              value: 1,
                              child: Text('Her gün'),
                            ),
                            DropdownMenuItem(
                              value: 7,
                              child: Text('Her hafta'),
                            ),
                            DropdownMenuItem(
                              value: 30,
                              child: Text('Her ay'),
                            ),
                          ],
                          onChanged: (value) {
                            setState(() {
                              _repeatDays = value ?? 0;
                            });
                          },
                        ),
                        TextButton.icon(
                          icon: const Icon(Icons.notifications),
                          label: Text(
                            _reminderTime != null
                                ? 'Hatırlatıcı: ${_reminderTime!.format(context)}'
                                : 'Hatırlatıcı Ekle',
                          ),
                          onPressed: () async {
                            final time = await showTimePicker(
                              context: context,
                              initialTime: _reminderTime ?? TimeOfDay.now(),
                            );
                            if (time != null) {
                              setState(() {
                                _reminderTime = time;
                              });
                            }
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }
} 