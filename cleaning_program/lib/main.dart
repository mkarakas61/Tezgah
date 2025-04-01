import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:timezone/data/latest.dart' as tz_data;
import 'views/todo_screen.dart';
import 'view_models/todo_viewmodel.dart';
import 'calendar_view.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Flutter engine'ini başlatmak için
  tz_data.initializeTimeZones(); // Saat dilimi verilerini başlat
  
  runApp(
    ChangeNotifierProvider(
      create: (context) => TodoViewModel(),
      child: const CleaningApp(),
    ),
  );
}

class CleaningApp extends StatelessWidget {
  const CleaningApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Temizlik Programı',
      theme: ThemeData(
        primaryColor: const Color(0xFF4ECDC4),
        scaffoldBackgroundColor: const Color(0xFFE0F5F3),
        colorScheme: const ColorScheme.light(
          primary: Color(0xFF4ECDC4),
          secondary: Color(0xFF2AB7B0),
          surface: Color(0xFFFFFFFF),
          onPrimary: Colors.white,
          onSecondary: Colors.white,
          onSurface: Color(0xFF2C3E50),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF4ECDC4)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF4ECDC4)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF2AB7B0), width: 2),
          ),
        ),
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 2; // Ana sayfa başlangıçta seçili

  @override
  Widget build(BuildContext context) {
    final todoViewModel = Provider.of<TodoViewModel>(context);
    
    // ViewModel yüklenirken yükleniyor göster
    if (!todoViewModel.isInitialized) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }
    
    final List<Widget> screens = [
      const StatisticsScreen(),
      const CalendarScreen(),
      const TodoListScreen(),
      const SettingsScreen(),
      const ProfileScreen(),
    ];

    return Scaffold(
      body: screens[_selectedIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: (index) => setState(() => _selectedIndex = index),
          type: BottomNavigationBarType.fixed,
          selectedItemColor: const Color(0xFF4ECDC4),
          unselectedItemColor: Colors.grey,
          items: [
            const BottomNavigationBarItem(
              icon: Icon(Icons.analytics),
              label: 'İstatistik',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.calendar_today),
              label: 'Takvim',
            ),
            BottomNavigationBarItem(
              icon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFF4ECDC4),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF4ECDC4).withOpacity(0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: const Icon(Icons.check_circle, color: Colors.white),
              ),
              label: 'Görevler',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              label: 'Ayarlar',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Profil',
            ),
          ],
        ),
      ),
    );
  }
}

// Yardımcı Ekranlar
class StatisticsScreen extends StatelessWidget {
  const StatisticsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('İstatistikler'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: const Center(child: Text('İstatistikler Ekranı')),
    );
  }
}

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final todoViewModel = Provider.of<TodoViewModel>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Takvim'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: CalendarView(todos: todoViewModel.todos),
    );
  }
}

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ayarlar'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: const Center(child: Text('Ayarlar Ekranı')),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: const Center(child: Text('Profil Ekranı')),
    );
  }
}
