import 'package:flutter/material.dart';
import 'dart:math';

class StarPainter extends CustomPainter {
  final double progress;
  final Color color;
  
  StarPainter(this.progress, {this.color = Colors.yellow});
  
  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 * progress;
    
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    
    final path = Path();
    final points = 5;
    final innerRadius = radius * 0.4;
    
    for (int i = 0; i < points * 2; i++) {
      final useInnerRadius = i.isOdd;
      final currentRadius = useInnerRadius ? innerRadius : radius;
      final angle = i * pi / points;
      
      final x = center.dx + cos(angle) * currentRadius;
      final y = center.dy + sin(angle) * currentRadius;
      
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }
    
    path.close();
    canvas.drawPath(path, paint);
    
    // Işıltı efekti
    final glowPaint = Paint()
      ..color = color.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;
    
    canvas.drawPath(path, glowPaint);
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class StarAnimation extends StatefulWidget {
  final VoidCallback onAnimationComplete;
  final Color color;
  
  const StarAnimation({
    super.key,
    required this.onAnimationComplete,
    this.color = Colors.yellow,
  });
  
  @override
  State<StarAnimation> createState() => _StarAnimationState();
}

class _StarAnimationState extends State<StarAnimation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    
    _controller.forward().then((_) {
      widget.onAnimationComplete();
    });
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return CustomPaint(
          painter: StarPainter(_controller.value, color: widget.color),
          size: const Size(100, 100),
        );
      },
    );
  }
} 