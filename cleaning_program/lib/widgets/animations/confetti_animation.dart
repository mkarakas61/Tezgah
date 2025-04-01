import 'package:flutter/material.dart';
import 'confetti_painter.dart';

class ConfettiAnimation extends StatefulWidget {
  final VoidCallback onAnimationComplete;
  
  const ConfettiAnimation({
    super.key,
    required this.onAnimationComplete,
  });
  
  @override
  State<ConfettiAnimation> createState() => _ConfettiAnimationState();
}

class _ConfettiAnimationState extends State<ConfettiAnimation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
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
          painter: ConfettiPainter(_controller.value),
          size: Size(MediaQuery.of(context).size.width, 300),
        );
      },
    );
  }
} 