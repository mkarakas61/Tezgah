import { FileItem, FileNode } from "../types";

// Örnek dosya yapısı veri modeli
export const initialFileStructure: FileItem[] = [
  {
    name: "src",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "domain",
        type: "folder",
        isOpen: true,
        children: [
          { 
            name: "entities", 
            type: "folder", 
            isOpen: false,
            children: [
              { 
                name: "user.rs", 
                type: "file",
                content: `// src/domain/entities/user.rs
pub struct User {
    id: String,
    name: String,
    email: String,
    active: bool,
}

impl User {
    pub fn new(id: String, name: String, email: String) -> Self {
        User {
            id,
            name,
            email,
            active: true,
        }
    }
    
    pub fn deactivate(&mut self) {
        self.active = false;
    }
    
    pub fn id(&self) -> &str { &self.id }
    pub fn name(&self) -> &str { &self.name }
    pub fn email(&self) -> &str { &self.email }
    pub fn is_active(&self) -> bool { self.active }
}` 
              },
              { name: "product.rs", type: "file" },
            ]
          },
          { 
            name: "repositories", 
            type: "folder", 
            isOpen: false,
            children: [
              { 
                name: "user_repository.rs", 
                type: "file",
                content: `// src/domain/repositories/user_repository.rs
use crate::domain::entities::User;

pub trait UserRepository {
    fn find_by_id(&self, id: &str) -> Option<User>;
    fn save(&self, user: &User) -> Result<(), String>;
}` 
              },
              { name: "product_repository.rs", type: "file" },
            ]
          },
          { name: "usecases", type: "folder", children: [
            { name: "user_service.rs", type: "file" },
            { name: "product_service.rs", type: "file" },
          ]},
        ]
      },
      {
        name: "infrastructure",
        type: "folder",
        isOpen: false,
        children: [
          { name: "repositories", type: "folder", children: [
            { name: "inmemory_user_repository.rs", type: "file" },
            { name: "inmemory_product_repository.rs", type: "file" },
          ]},
          { name: "database", type: "folder", children: [
            { name: "connection.rs", type: "file" },
          ]}
        ]
      },
      {
        name: "presentation",
        type: "folder",
        isOpen: false,
        children: [
          { name: "api", type: "folder", children: [
            { name: "user_controller.rs", type: "file" },
            { name: "product_controller.rs", type: "file" },
          ]},
          { name: "cli", type: "folder", children: [
            { name: "commands.rs", type: "file" },
          ]}
        ]
      },
      { 
        name: "main.rs", 
        type: "file",
        content: `// src/main.rs
mod domain;
mod infrastructure;
mod presentation;

fn main() {
    println!("Clean Architecture uygulamamıza hoş geldiniz!");
}` 
      },
    ]
  },
  { 
    name: "Cargo.toml", 
    type: "file",
    content: `[package]
name = "clean_architecture_example"
version = "0.1.0"
edition = "2021"

[dependencies]
uuid = { version = "1.3.0", features = ["v4"] }` 
  },
  { name: "README.md", type: "file" },
];

// Örnek dosya yapısı
export const INITIAL_FILE_STRUCTURE: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    isOpen: true,
    children: [
      {
        id: "11",
        name: "domain",
        type: "folder",
        isOpen: false,
        children: [
          {
            id: "111",
            name: "entities",
            type: "folder",
            isOpen: false,
            children: [
              {
                id: "1111",
                name: "user.rs",
                type: "file",
                language: "rust",
                content: `pub struct User {
    id: String,
    username: String,
    email: String,
}

impl User {
    pub fn new(id: String, username: String, email: String) -> Self {
        Self { id, username, email }
    }
    
    pub fn validate_email(&self) -> bool {
        self.email.contains('@')
    }
}`
              },
              {
                id: "1112",
                name: "product.rs",
                type: "file",
                language: "rust",
                content: `pub struct Product {
    id: String,
    name: String,
    price: f64,
}

impl Product {
    pub fn new(id: String, name: String, price: f64) -> Self {
        Self { id, name, price }
    }
}`
              }
            ]
          },
          {
            id: "112",
            name: "repositories",
            type: "folder",
            isOpen: false,
            children: [
              {
                id: "1121",
                name: "user_repository.rs",
                type: "file",
                language: "rust",
                content: `use crate::domain::entities::User;

pub trait UserRepository {
    fn save(&self, user: &User) -> Result<(), String>;
    fn find_by_id(&self, id: &str) -> Option<User>;
    fn find_by_email(&self, email: &str) -> Option<User>;
}`
              }
            ]
          }
        ]
      },
      {
        id: "12",
        name: "application",
        type: "folder",
        isOpen: false,
        children: [
          {
            id: "121",
            name: "services",
            type: "folder",
            isOpen: false,
            children: [
              {
                id: "1211",
                name: "user_service.rs",
                type: "file",
                language: "rust",
                content: `use crate::domain::entities::User;
use crate::domain::repositories::UserRepository;

pub struct UserService<R: UserRepository> {
    user_repository: R,
}

impl<R: UserRepository> UserService<R> {
    pub fn new(user_repository: R) -> Self {
        Self { user_repository }
    }
    
    pub fn create_user(&self, id: String, username: String, email: String) -> Result<User, String> {
        let user = User::new(id, username, email);
        
        if !user.validate_email() {
            return Err("Invalid email format".to_string());
        }
        
        self.user_repository.save(&user)?;
        Ok(user)
    }
    
    pub fn get_user(&self, id: &str) -> Option<User> {
        self.user_repository.find_by_id(id)
    }
}`
              }
            ]
          }
        ]
      },
      {
        id: "13",
        name: "main.rs",
        type: "file",
        language: "rust",
        content: `mod domain;
mod application;
mod infrastructure;

use domain::entities::User;
use application::services::UserService;
use infrastructure::repositories::PostgresUserRepository;

fn main() {
    // Bağımlılıkları oluştur
    let user_repo = PostgresUserRepository::new(
        "postgres://localhost:5432/mydb".to_string()
    );
    
    // Servis katmanını oluştur
    let user_service = UserService::new(user_repo);
    
    // Kullanıcı oluştur
    match user_service.create_user(
        "1".to_string(),
        "john_doe".to_string(),
        "john@example.com".to_string(),
    ) {
        Ok(user) => println!("User created successfully"),
        Err(e) => println!("Failed to create user: {}", e),
    }
}`
      },
      {
        id: "14",
        name: "infrastructure",
        type: "folder",
        isOpen: false,
        children: [
          {
            id: "141",
            name: "repositories",
            type: "folder",
            isOpen: false,
            children: [
              {
                id: "1411",
                name: "postgres_user_repository.rs",
                type: "file",
                language: "rust",
                content: `use crate::domain::entities::User;
use crate::domain::repositories::UserRepository;

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
}`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Cargo.toml",
    type: "file",
    language: "toml",
    content: `[package]
name = "clean_architecture_example"
version = "0.1.0"
edition = "2021"

[dependencies]
uuid = { version = "1.3.0", features = ["v4", "serde"] }
`
  },
  {
    id: "3",
    name: "README.md",
    type: "file",
    language: "markdown",
    content: `# Clean Architecture Örneği

Bu proje, Rust dilinde Clean Architecture prensiplerini uygulamak için bir örnek içerir.

## Katmanlar

1. **Domain Katmanı**: İş mantığının özünü içerir, dış bağımlılıkları yoktur.
   - Entities: İş domain'ine ait temel objeleri tanımlar
   - Repositories: Domain'e özel repository arayüzlerini tanımlar

2. **Application Katmanı**: Uygulama özelindeki iş mantığını içerir.
   - Services: Domain ile dış dünya arasında iletişimi sağlar

3. **Infrastructure Katmanı**: Dış sistemlerle iletişimi içerir.
   - Repositories: Domain'deki repository arayüzlerinin implementasyonları

## Nasıl Çalışır

1. Tüm bağımlılıklar dışarıdan içeriye doğrudur
2. İç katmanlar dış katmanlara bağımlı değildir
3. Bağımlılık Enjeksiyonu kullanılır
`
  }
]; 