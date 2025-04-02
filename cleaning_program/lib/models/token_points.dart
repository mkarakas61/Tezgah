import 'package:flutter/material.dart';

class TokenPoints {
  final int stars;
  final int tokens;
  
  const TokenPoints({
    required this.stars,
    required this.tokens,
  });
  
  static TokenPoints calculateReward(bool isCompleted, int streak) {
    if (!isCompleted) {
      return const TokenPoints(stars: 0, tokens: 0);
    }
    
    // Base rewards
    int baseStars = 5;
    int baseTokens = 10;
    
    // Streak multiplier
    double multiplier = 1.0;
    if (streak >= 30) {
      multiplier = 3.0; // 30+ günlük seri
    } else if (streak >= 15) {
      multiplier = 2.0; // 15+ günlük seri
    } else if (streak >= 7) {
      multiplier = 1.5; // 7+ günlük seri
    } else if (streak >= 3) {
      multiplier = 1.2; // 3+ günlük seri
    }
    
    return TokenPoints(
      stars: (baseStars * multiplier).round(),
      tokens: (baseTokens * multiplier).round(),
    );
  }
} 