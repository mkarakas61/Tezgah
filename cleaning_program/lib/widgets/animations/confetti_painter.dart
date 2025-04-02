import 'package:flutter/material.dart';
import 'dart:math';

class ConfettiPainter extends CustomPainter {
  final double progress;
  final Random random = Random();
  
  ConfettiPainter(this.progress);
  
  @override
  void paint(Canvas canvas, Size size) {
    const confettiCount = 50;
    final Paint paint = Paint();
    
    for (int i = 0; i < confettiCount; i++) {
      final color = HSLColor.fromAHSL(
        1.0,
        random.nextDouble() * 360,
        1.0,
        0.5 + random.nextDouble() * 0.5,
      ).toColor();
      
      paint.color = color;
      
      final startX = random.nextDouble() * size.width;
      final startY = random.nextDouble() * size.height * 0.5;
      final currentY = startY + progress * size.height * 0.5;
      
      // X position with wiggle
      final wiggle = sin(progress * 10 + i) * 20;
      final currentX = startX + wiggle;
      
      // Konfeti parçacığının şekli (daire, kare veya çizgi)
      final shape = random.nextInt(3);
      
      switch (shape) {
        case 0: // Daire
          canvas.drawCircle(
            Offset(currentX, currentY), 
            4 + random.nextDouble() * 4,
            paint
          );
          break;
        case 1: // Kare
          final size = 4 + random.nextDouble() * 6;
          canvas.drawRect(
            Rect.fromLTWH(currentX - size/2, currentY - size/2, size, size),
            paint
          );
          break;
        case 2: // Çizgi
          final rotation = random.nextDouble() * pi;
          final length = 6 + random.nextDouble() * 8;
          
          canvas.save();
          canvas.translate(currentX, currentY);
          canvas.rotate(rotation);
          canvas.drawRect(
            Rect.fromLTWH(-length/2, -1, length, 2),
            paint
          );
          canvas.restore();
          break;
      }
    }
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
} 