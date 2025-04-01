import 'package:flutter/material.dart';
import '../models/todo_item.dart';

class TodoItemWidget extends StatelessWidget {
  final TodoItem todo;
  final VoidCallback onToggle;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  const TodoItemWidget({
    super.key,
    required this.todo,
    required this.onToggle,
    required this.onEdit,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        child: Row(
          children: [
            // Tamamlandı işaretçisi
            Transform.scale(
              scale: 1.2,
              child: Checkbox(
                value: todo.isCompleted,
                onChanged: (_) => onToggle(),
                activeColor: const Color(0xFF4ECDC4),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
            
            // Görev içeriği
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    todo.title,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      decoration: todo.isCompleted
                          ? TextDecoration.lineThrough
                          : null,
                      color: todo.isCompleted
                          ? Colors.grey
                          : Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      // Tekrarlama bilgisi
                      if (todo.repeatDays != null && todo.repeatDays! > 0) ...[
                        const Icon(
                          Icons.repeat,
                          size: 14,
                          color: Colors.grey,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${todo.repeatDays} günde bir',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.grey,
                          ),
                        ),
                        const SizedBox(width: 12),
                      ],
                      
                      // Hatırlatıcı bilgisi
                      if (todo.reminderTime != null) ...[
                        const Icon(
                          Icons.notifications,
                          size: 14,
                          color: Colors.grey,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${todo.reminderTime!.hour}:${todo.reminderTime!.minute.toString().padLeft(2, '0')}',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                      
                      // Seri bilgisi
                      if (todo.streak > 0) ...[
                        const SizedBox(width: 12),
                        const Icon(
                          Icons.local_fire_department,
                          size: 14,
                          color: Colors.deepOrange,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${todo.streak} gün',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.deepOrange,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
            
            // İşlem butonları
            Row(
              children: [
                // Ödül göstergesi
                if (!todo.isCompleted) ...[
                  Row(
                    children: [
                      const Icon(
                        Icons.stars,
                        size: 16,
                        color: Colors.amber,
                      ),
                      Text(
                        '${todo.points}',
                        style: const TextStyle(
                          fontSize: 12,
                          color: Colors.amber,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Icon(
                        Icons.token,
                        size: 16,
                        color: Colors.purple,
                      ),
                      Text(
                        '${todo.savTokens}',
                        style: const TextStyle(
                          fontSize: 12,
                          color: Colors.purple,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 8),
                    ],
                  ),
                ],
                
                // Düzenleme butonu
                IconButton(
                  icon: const Icon(
                    Icons.edit,
                    color: Colors.grey,
                    size: 20,
                  ),
                  onPressed: onEdit,
                  constraints: const BoxConstraints(),
                  padding: const EdgeInsets.all(8),
                ),
                
                // Silme butonu
                IconButton(
                  icon: const Icon(
                    Icons.delete,
                    color: Colors.grey,
                    size: 20,
                  ),
                  onPressed: onDelete,
                  constraints: const BoxConstraints(),
                  padding: const EdgeInsets.all(8),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
} 