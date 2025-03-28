import { AnalysisReport, ConceptId } from "../types";

// Kavramlar listesi
export const CONCEPTS = [
  {
    id: 'solid' as ConceptId,
    label: 'SOLID Prensipleri',
    description: 'SOLID yazılım tasarım prensiplerini uygulayın'
  },
  {
    id: 'clean_arch' as ConceptId,
    label: 'Clean Architecture',
    description: 'Clean Architecture yapısını uygulayın'
  },
  {
    id: 'rust' as ConceptId,
    label: 'Rust Patterns',
    description: 'Rust programlama dilinin yaygın desenlerini uygulayın'
  }
];

// Önceden tanımlanmış analiz raporları
export const ANALYSIS_REPORTS: Record<ConceptId, AnalysisReport> = {
  solid: {
    concept: 'solid',
    title: 'SOLID Prensipleri Analizi',
    description: 'SOLID yazılım tasarım prensiplerinin uygulanmasını değerlendirir',
    feedbackItems: [
      {
        id: '1',
        type: 'warning',
        title: 'Single Responsibility İhlali',
        message: 'UserService hem kullanıcı kimlik doğrulama hem de kullanıcı verileri işlemleri yapıyor. Bu işlemleri farklı sınıflara ayırın.',
        sourcePath: 'services/UserService.ts',
        sourceCode: `class UserService {
  authenticateUser(email, password) { ... }
  getUserData(userId) { ... }
  updateUserProfile(userId, data) { ... }
  createInvoice(userId) { ... } // Bu metot başka bir sınıfa taşınmalı
}`
      },
      {
        id: '2',
        type: 'error',
        title: 'Open/Closed Prensibi İhlali',
        message: 'Yeni bir şekil eklemek için PaymentProcessor sınıfını değiştirmeniz gerekiyor. Bu, Open/Closed prensibine aykırıdır.',
        sourcePath: 'payment/PaymentProcessor.ts',
        sourceCode: `class PaymentProcessor {
  processPayment(paymentType, amount) {
    if (paymentType === 'creditCard') {
      // Kredi kartı işlemleri
    } else if (paymentType === 'bankTransfer') {
      // Banka transferi işlemleri
    } // Yeni ödeme tipi eklemek için mevcut kodu değiştirmeniz gerekiyor
  }
}`
      }
    ]
  },
  clean_arch: {
    concept: 'clean_arch',
    title: 'Clean Architecture Analizi',
    description: 'Clean Architecture prensiplerinin uygulanmasını değerlendirir',
    feedbackItems: [
      {
        id: '3',
        type: 'warning',
        title: 'Bağımlılık Yönü İhlali',
        message: 'İş mantığı katmanı, veri erişim katmanına doğrudan bağımlı. Bağımlılıklar içe doğru olmalıdır.',
        sourcePath: 'domain/OrderService.ts',
        sourceCode: `import { OrderRepository } from '../infrastructure/OrderRepository';

class OrderService {
  private orderRepo = new OrderRepository(); // Doğrudan bağımlılık oluşturma
  
  createOrder(orderData) {
    return this.orderRepo.save(orderData);
  }
}`
      },
      {
        id: '4',
        type: 'error',
        title: 'Katman İhlali',
        message: 'Sunum katmanı doğrudan veri erişim katmanıyla iletişim kuruyor. Tüm iletişim iş mantığı katmanı üzerinden gerçekleşmelidir.',
        sourcePath: 'presentation/OrderController.ts',
        sourceCode: `import { OrderRepository } from '../infrastructure/OrderRepository';

class OrderController {
  private orderRepo = new OrderRepository(); // Sunum katmanı doğrudan veri erişim katmanına erişiyor
  
  handleCreateOrder(req, res) {
    const order = this.orderRepo.save(req.body);
    res.json(order);
  }
}`
      }
    ]
  },
  rust: {
    concept: 'rust',
    title: 'Rust Patterns Analizi',
    description: 'Rust programlama dilinin yaygın desenlerinin uygulanmasını değerlendirir',
    feedbackItems: [
      {
        id: '5',
        type: 'warning',
        title: 'Result Değerini İşlememe',
        message: 'Bu fonksiyon bir Result döndürüyor ancak hatayı ele almıyorsunuz. Result değerlerini ? operatörü ile veya match ifadesi ile işlemelisiniz.',
        sourcePath: 'src/main.rs',
        sourceCode: `fn main() {
    let file = File::open("data.txt"); // Hata işlenmemiş
    let data = read_file_contents("config.json"); // Hata işlenmemiş
    
    // Doğru kullanım:
    // let file = File::open("data.txt")?;
    // let data = match read_file_contents("config.json") {
    //    Ok(content) => content,
    //    Err(e) => return Err(e),
    // };
}`
      },
      {
        id: '6',
        type: 'error',
        title: 'Sahiplik Kuralı İhlali',
        message: 'Değişken taşındıktan sonra tekrar kullanılmaya çalışılıyor. Rust\'ta bir değer taşındıktan sonra artık kullanılamaz.',
        sourcePath: 'src/ownership.rs',
        sourceCode: `fn process_data() {
    let data = vec![1, 2, 3];
    transfer_ownership(data); // data değişkeni buraya taşındı
    
    println!("{:?}", data); // Hata: data değişkeni artık kullanılamaz
}

fn transfer_ownership(v: Vec<i32>) {
    // v'nin sahipliği şimdi burada
}`
      }
    ]
  }
};