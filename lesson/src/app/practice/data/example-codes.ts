import { ConceptId } from "../types";

// Her kavram için örnek kodlar
export const EXAMPLE_CODES: Record<ConceptId, string> = {
  solid: `// SOLID prensiplerini uygulayan bir örnek

// Single Responsibility Principle (SRP)
// Her sınıf sadece bir sorumluluk almalıdır.
struct UserRepository {
    database: Database,
}

impl UserRepository {
    fn save(&self, user: &User) -> Result<(), Error> {
        // Kullanıcıyı kaydet
        Ok(())
    }
    
    fn find_by_id(&self, id: &str) -> Option<User> {
        // Kullanıcıyı bul
        None
    }
}

// Ayrı bir sorumluluk: e-posta gönderimi
struct EmailService {
    smtp_client: SmtpClient,
}

impl EmailService {
    fn send_welcome_email(&self, user: &User) -> Result<(), Error> {
        // Hoş geldin e-postası gönder
        Ok(())
    }
}

// Open/Closed Principle (OCP)
// Genişletmeye açık, değiştirmeye kapalı
trait PaymentProcessor {
    fn process(&self, amount: f64) -> Result<(), Error>;
}

struct CreditCardProcessor {
    // Kredi kartı detayları
}

impl PaymentProcessor for CreditCardProcessor {
    fn process(&self, amount: f64) -> Result<(), Error> {
        // Kredi kartı ile ödeme işlemi
        Ok(())
    }
}

struct PayPalProcessor {
    // PayPal detayları
}

impl PaymentProcessor for PayPalProcessor {
    fn process(&self, amount: f64) -> Result<(), Error> {
        // PayPal ile ödeme işlemi
        Ok(())
    }
}

// Liskov Substitution Principle (LSP)
// Alt tür, üst türün yerine geçebilmelidir
trait Bird {
    fn fly(&self) -> Result<(), Error>;
}

struct Sparrow {
    // Serçe özellikleri
}

impl Bird for Sparrow {
    fn fly(&self) -> Result<(), Error> {
        // Serçe uçuş implementasyonu
        Ok(())
    }
}

// Interface Segregation Principle (ISP)
// Gereksiz metodları içeren büyük arayüzler yerine, 
// özel amaçlı küçük arayüzler tercih edilmelidir
trait Reader {
    fn read(&self, data: &[u8]) -> Result<usize, Error>;
}

trait Writer {
    fn write(&self, data: &[u8]) -> Result<usize, Error>;
}

struct File {
    // Dosya detayları
}

impl Reader for File {
    fn read(&self, data: &[u8]) -> Result<usize, Error> {
        // Okuma işlemi
        Ok(0)
    }
}

impl Writer for File {
    fn write(&self, data: &[u8]) -> Result<usize, Error> {
        // Yazma işlemi
        Ok(0)
    }
}

// Dependency Inversion Principle (DIP)
// Yüksek seviyeli modüller düşük seviyeli modüllere bağlı olmamalıdır.
// Her ikisi de soyutlamalara bağlı olmalıdır.

trait Logger {
    fn log(&self, message: &str);
}

struct ConsoleLogger {}

impl Logger for ConsoleLogger {
    fn log(&self, message: &str) {
        println!("{}", message);
    }
}

struct UserService {
    logger: Box<dyn Logger>, // Somut sınıf yerine arayüz
}

impl UserService {
    fn new(logger: Box<dyn Logger>) -> Self {
        Self { logger }
    }
    
    fn create_user(&self, user: &User) {
        // Kullanıcı oluştur
        self.logger.log("Kullanıcı oluşturuldu");
    }
}

// Ana fonksiyon
fn main() {
    let logger = Box::new(ConsoleLogger {});
    let user_service = UserService::new(logger);
    
    // Kullanım
    let user = User { id: "1".to_string(), name: "John".to_string() };
    user_service.create_user(&user);
}

// Yardımcı yapılar
struct User {
    id: String,
    name: String,
}

struct Database {}
struct SmtpClient {}
struct Error {}`,

  clean_arch: `// Clean Architecture örneği
// Katmanlı Yapı: Domain -> Use Cases -> Interfaces -> Adapters (Infrastructure)

//------------------------------
// 1. Domain Layer (İç Katman)
//------------------------------

// Domain Entity
pub struct User {
    id: String,
    username: String,
    email: String,
    password_hash: String,
}

impl User {
    pub fn new(id: String, username: String, email: String, password_hash: String) -> Self {
        Self { id, username, email, password_hash }
    }
    
    pub fn validate_email(&self) -> bool {
        // Email doğrulama iş mantığı
        self.email.contains('@')
    }
}

// Domain Repository Interface (Port)
pub trait UserRepository {
    fn save(&self, user: &User) -> Result<(), String>;
    fn find_by_id(&self, id: &str) -> Option<User>;
    fn find_by_email(&self, email: &str) -> Option<User>;
}

//------------------------------
// 2. Use Case Layer (İş Mantığı)
//------------------------------

pub struct CreateUserUseCase<R: UserRepository> {
    user_repository: R,
}

impl<R: UserRepository> CreateUserUseCase<R> {
    pub fn new(user_repository: R) -> Self {
        Self { user_repository }
    }
    
    pub fn execute(&self, 
        id: String, 
        username: String, 
        email: String, 
        password: String
    ) -> Result<(), String> {
        // İş mantığı - domaine ait iş kurallarını uygular
        let user = User::new(
            id,
            username,
            email, 
            self.hash_password(&password),
        );
        
        if !user.validate_email() {
            return Err("Invalid email format".to_string());
        }
        
        // Veri depolama - repository arayüzü kullanılır
        self.user_repository.save(&user)
    }
    
    fn hash_password(&self, password: &str) -> String {
        // Şifre hashleme (örnekte basitleştirilmiş)
        format!("hashed_{}", password)
    }
}

//------------------------------
// 3. Interface Adapters Layer
//------------------------------

// Controller (Arayüz Adaptörü)
pub struct UserController<R: UserRepository> {
    create_user_use_case: CreateUserUseCase<R>,
}

impl<R: UserRepository> UserController<R> {
    pub fn new(create_user_use_case: CreateUserUseCase<R>) -> Self {
        Self { create_user_use_case }
    }
    
    pub fn create_user(&self, request: CreateUserRequest) -> CreateUserResponse {
        // HTTP isteğini iş mantığı katmanına uygun formata dönüştür
        let result = self.create_user_use_case.execute(
            request.id,
            request.username,
            request.email,
            request.password,
        );
        
        match result {
            Ok(_) => CreateUserResponse { success: true, error: None },
            Err(e) => CreateUserResponse { success: false, error: Some(e) },
        }
    }
}

// DTO (Data Transfer Objects)
pub struct CreateUserRequest {
    id: String,
    username: String,
    email: String,
    password: String,
}

pub struct CreateUserResponse {
    success: bool,
    error: Option<String>,
}

//------------------------------
// 4. Infrastructure Layer (Dış Katman)
//------------------------------

// Database Adapter (PostgreSQL Repository Implementation)
pub struct PostgresUserRepository {
    connection_string: String,
}

impl PostgresUserRepository {
    pub fn new(connection_string: String) -> Self {
        Self { connection_string }
    }
}

impl UserRepository for PostgresUserRepository {
    fn save(&self, user: &User) -> Result<(), String> {
        // PostgreSQL veritabanına kullanıcı kaydetme işlemi
        println!("Saving user to PostgreSQL: {}", user.email);
        Ok(())
    }
    
    fn find_by_id(&self, id: &str) -> Option<User> {
        // Veritabanından ID'ye göre kullanıcı bulma
        println!("Finding user by ID from PostgreSQL: {}", id);
        None
    }
    
    fn find_by_email(&self, email: &str) -> Option<User> {
        // Veritabanından email'e göre kullanıcı bulma
        println!("Finding user by email from PostgreSQL: {}", email);
        None
    }
}

// Main Application
fn main() {
    // Infrastructure
    let user_repository = PostgresUserRepository::new(
        "postgres://localhost:5432/mydb".to_string()
    );
    
    // Use Case
    let create_user_use_case = CreateUserUseCase::new(user_repository);
    
    // Controller
    let user_controller = UserController::new(create_user_use_case);
    
    // Web API'den gelen istek (simülasyon)
    let request = CreateUserRequest {
        id: "123".to_string(),
        username: "john_doe".to_string(),
        email: "john@example.com".to_string(),
        password: "securepassword123".to_string(),
    };
    
    // Çağrı
    let response = user_controller.create_user(request);
    
    // Sonuç
    if response.success {
        println!("User created successfully");
    } else {
        println!("Failed to create user: {}", response.error.unwrap());
    }
}`,

  rust: `// Rust programlama desenlerini gösteren örnek

// 1. Ownership ve Borrowing
fn ownership_example() {
    // Ownership (sahiplik)
    let s1 = String::from("hello");
    let s2 = s1; // s1'in sahipliği s2'ye taşındı
    
    // println!("{}", s1); // Hata: s1 artık geçerli değil
    println!("{}", s2); // Çalışır: s2 artık bu verinin sahibi
    
    // Borrowing (ödünç alma)
    let s3 = String::from("world");
    let len = calculate_length(&s3); // s3'ü ödünç ver, sahipliği taşıma
    
    println!("'{}' kelimesinin uzunluğu: {}", s3, len); // s3 hala geçerli
}

fn calculate_length(s: &String) -> usize {
    s.len() // String'in sahipliğini almaz, sadece referansı kullanır
}

// 2. Trait'ler ve Generics kullanımı
trait Describable {
    fn describe(&self) -> String;
}

struct Person {
    name: String,
    age: u32,
}

struct Car {
    model: String,
    year: u32,
}

// Person için Describable trait implementasyonu
impl Describable for Person {
    fn describe(&self) -> String {
        format!("{} isimli kişi {} yaşında", self.name, self.age)
    }
}

// Car için Describable trait implementasyonu
impl Describable for Car {
    fn describe(&self) -> String {
        format!("{} model araba, {}", self.model, self.year)
    }
}

// Generic fonksiyon - Describable trait'i uygulayan her türü kabul eder
fn print_description<T: Describable>(item: &T) {
    println!("Açıklama: {}", item.describe());
}

// 3. Result ve Option kullanımı
fn parse_user_id(input: &str) -> Result<u32, String> {
    match input.parse::<u32>() {
        Ok(id) if id > 0 => Ok(id),
        Ok(_) => Err("Kullanıcı ID'si pozitif olmalıdır".to_string()),
        Err(_) => Err("Geçersiz kullanıcı ID'si formatı".to_string()),
    }
}

fn find_user_by_id(id: u32) -> Option<Person> {
    if id == 42 {
        Some(Person {
            name: String::from("Alice"),
            age: 30,
        })
    } else {
        None // Kullanıcı bulunamadı
    }
}

// 4. Struct ve Enum kullanımı
enum PaymentMethod {
    CreditCard { number: String, cvv: String },
    PayPal(String), // e-posta adresi
    BankTransfer { account: String, bank_code: String },
}

struct Payment {
    amount: f64,
    method: PaymentMethod,
}

impl Payment {
    fn process(&self) -> Result<String, String> {
        match &self.method {
            PaymentMethod::CreditCard { number, cvv } => {
                // Kredi kartı işleme mantığı
                println!("Kredi kartı ile {} TL işleniyor", self.amount);
                Ok(format!("Kredi kartı ödeme onay kodu: XYZ123"))
            },
            PaymentMethod::PayPal(email) => {
                // PayPal işleme mantığı
                println!("PayPal ({}) ile {} TL işleniyor", email, self.amount);
                Ok(format!("PayPal ödeme onay kodu: PP987"))
            },
            PaymentMethod::BankTransfer { account, bank_code } => {
                // Banka transferi işleme mantığı
                println!("Banka transferi ile {} TL işleniyor", self.amount);
                Ok(format!("Transfer onay kodu: BT456"))
            }
        }
    }
}

fn main() {
    // Ownership örneğini çağır
    ownership_example();
    
    // Trait ve generic örneği
    let person = Person {
        name: String::from("Bob"),
        age: 25,
    };
    
    let car = Car {
        model: String::from("Tesla Model 3"),
        year: 2022,
    };
    
    print_description(&person);
    print_description(&car);
    
    // Result ve Option örneği
    let user_input = "42";
    
    match parse_user_id(user_input) {
        Ok(id) => {
            println!("Geçerli kullanıcı ID'si: {}", id);
            
            match find_user_by_id(id) {
                Some(user) => println!("Kullanıcı bulundu: {} ({})", user.name, user.age),
                None => println!("Kullanıcı bulunamadı"),
            }
        },
        Err(e) => println!("Hata: {}", e),
    }
    
    // Struct ve Enum örneği
    let payment = Payment {
        amount: 100.0,
        method: PaymentMethod::CreditCard {
            number: String::from("1234-5678-9012-3456"),
            cvv: String::from("123"),
        },
    };
    
    match payment.process() {
        Ok(confirmation) => println!("Ödeme başarılı: {}", confirmation),
        Err(e) => println!("Ödeme hatası: {}", e),
    }
}`
}; 