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

class _TodoListScreenState extends State<TodoListScreen> with TickerProviderStateMixin {
  final TextEditingController _textController = TextEditingController();
  int _repeatDays = 0;
  TimeOfDay? _reminderTime;
  TodoItem? _editingTodo;
  late AnimationController _confettiController;
  late AnimationController _addTaskController;
  late AnimationController _tokenAnimationController;
  bool _showConfetti = false;
  bool _showStars = false;

  @override
  void initState() {
    super.initState();
    _confettiController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
    _addTaskController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _tokenAnimationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
  }

  @override
  void dispose() {
    _textController.dispose();
    _confettiController.dispose();
    _addTaskController.dispose();
    _tokenAnimationController.dispose();
    super.dispose();
  }

  void _editTodo(TodoViewModel viewModel, TodoItem todo) {
    setState(() {
      _editingTodo = todo;
      _textController.text = todo.title;
      _repeatDays = todo.repeatDays ?? 0;
      _reminderTime = todo.reminderTime;
    });
  }

  void _submitTodo(TodoViewModel viewModel) {
    if (_textController.text.isEmpty) return;

    if (_editingTodo != null) {
      viewModel.updateTodo(
        _editingTodo!,
        title: _textController.text,
        repeatDays: _repeatDays,
        reminderTime: _reminderTime,
      );
      setState(() {
        _editingTodo = null;
      });
    } else {
      viewModel.addTodo(
        _textController.text,
        repeatDays: _repeatDays,
        reminderTime: _reminderTime,
      );
      // Animasyon oynat
      _addTaskController.forward().then((_) => _addTaskController.reverse());
    }
    
    _textController.clear();
    setState(() {
      _repeatDays = 0;
      _reminderTime = null;
    });
  }

  void _showRewardAnimation() {
    setState(() {
      _showConfetti = true;
      _showStars = true;
    });
    
    _confettiController.forward().then((_) {
      _confettiController.reset();
      setState(() {
        _showConfetti = false;
      });
    });
    
    _tokenAnimationController.forward().then((_) {
      _tokenAnimationController.reset();
    });
  }

  @override
  Widget build(BuildContext context) {
    final todoViewModel = Provider.of<TodoViewModel>(context);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Görevler',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          // Bildirim ikonu
          IconButton(
            icon: const Icon(Icons.notifications_outlined, color: Colors.white),
            onPressed: () {
              // Bildirim ayarları modalını göster
              showModalBottomSheet(
                context: context,
                builder: (context) => Container(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Bildirim Ayarları',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 16),
                      SwitchListTile(
                        title: const Text('Günlük Görev Hatırlatıcıları'),
                        subtitle: const Text('Her gün görevlerinizi hatırlatalım'),
                        value: true, // Bu değer viewModel'dan gelmeli
                        onChanged: (bool value) {
                          // Bildirim ayarını güncelle
                        },
                      ),
                      SwitchListTile(
                        title: const Text('Özel Görev Bildirimleri'),
                        subtitle: const Text('Belirlediğiniz saatlerde bildirim alın'),
                        value: true, // Bu değer viewModel'dan gelmeli
                        onChanged: (bool value) {
                          // Bildirim ayarını güncelle
                        },
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              children: [
                const Icon(Icons.stars, color: Colors.amber),
                const SizedBox(width: 4),
                Text(
                  '${todoViewModel.userPoints}',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(width: 12),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.purple.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.token, color: Colors.purpleAccent),
                      const SizedBox(width: 4),
                      Text(
                        '${todoViewModel.userSavTokens} SAV',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          Column(
            children: [
              // Günün görevleri bölümü
              if (todoViewModel.todosForToday.isNotEmpty)
                Container(
                  margin: const EdgeInsets.all(16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF4ECDC4), Color(0xFF2AB7B0)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.task_alt, color: Colors.white),
                          const SizedBox(width: 8),
                          Text(
                            'Bugünün Görevleri (${todoViewModel.todosForToday.length})',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      ...todoViewModel.todosForToday.map((todo) => 
                        Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Row(
                            children: [
                              Checkbox(
                                value: todo.isCompleted,
                                onChanged: (_) {
                                  todoViewModel.toggleTodoCompletion(todo.id);
                                  if (!todo.isCompleted) {
                                    _showRewardAnimation();
                                  }
                                },
                                activeColor: Colors.white,
                                checkColor: const Color(0xFF2AB7B0),
                              ),
                              Expanded(
                                child: Text(
                                  todo.title,
                                  style: TextStyle(
                                    color: Colors.white,
                                    decoration: todo.isCompleted
                                        ? TextDecoration.lineThrough
                                        : null,
                                  ),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.3),
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                child: Row(
                                  children: [
                                    const Icon(
                                      Icons.repeat,
                                      color: Colors.white,
                                      size: 16,
                                    ),
                                    const SizedBox(width: 4),
                                    Text(
                                      todo.repeatDays != null
                                          ? '${todo.repeatDays} gün'
                                          : 'Bir kez',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ).toList(),
                    ],
                  ),
                ),
              
              // Görevler Listesi
              Expanded(
                child: todoViewModel.todos.isEmpty
                    ? const Center(
                        child: Text('Hiç göreviniz yok. Yeni bir görev ekleyin!'),
                      )
                    : ReorderableListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: todoViewModel.todos.length,
                        onReorder: todoViewModel.reorderTodos,
                        itemBuilder: (context, index) {
                          final todo = todoViewModel.todos[index];
                          return TodoItemWidget(
                            key: Key(todo.id),
                            todo: todo,
                            onToggle: () {
                              todoViewModel.toggleTodoCompletion(todo.id);
                              if (!todo.isCompleted) {
                                _showRewardAnimation();
                              }
                            },
                            onEdit: () => _editTodo(todoViewModel, todo),
                            onDelete: () => todoViewModel.deleteTodo(todo.id),
                          );
                        },
                      ),
              ),
              
              // Görev ekleme form alanı
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
                        // Tekrarlanma ayarı
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
                        
                        // Hatırlatıcı ayarı
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
          ),
          
          // Animasyonlar
          if (_showConfetti)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: ConfettiAnimation(
                onAnimationComplete: () {
                  setState(() {
                    _showConfetti = false;
                  });
                },
              ),
            ),
          
          if (_showStars)
            Positioned(
              top: MediaQuery.of(context).size.height / 3,
              left: MediaQuery.of(context).size.width / 2 - 50,
              child: StarAnimation(
                color: Colors.amber,
                onAnimationComplete: () {
                  setState(() {
                    _showStars = false;
                  });
                },
              ),
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Yeni görev ekleme işlemi
        },
        backgroundColor: Theme.of(context).primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
} 