import { ConceptId, FeedbackItem } from '../types';
import { ANALYSIS_REPORTS } from '../data/analysis-reports';

export class CodeAnalyzer {
  /**
   * Seçilen kavrama göre statik analiz raporunu döndürür
   */
  static analyzeCode(code: string, concept: ConceptId): FeedbackItem[] {
    // Basit bir örnek olarak, önceden tanımlanmış analiz raporlarını kullanıyoruz
    return ANALYSIS_REPORTS[concept]?.feedbackItems || [];
  }

  /**
   * Gerçek zamanlı kod analizi yapar ve geri bildirim üretir
   */
  static analyzeCodeRealTime(code: string, concept: ConceptId): FeedbackItem[] {
    if (!code || code.trim() === '') {
      return [];
    }
    
    // Önce statik analiz raporlarını başlangıç noktası olarak kullan
    const baseAnalysis = this.analyzeCode(code, concept);
    let realTimeFeedback: FeedbackItem[] = [];
    
    // Koddaki önemli özellikler için analiz yap
    const codePatterns = this.detectCodePatterns(code);
    
    // Kavramlara göre özel analizler yap
    switch (concept) {
      case 'solid':
        realTimeFeedback = [...this.analyzeSolidPrinciples(code, codePatterns)];
        break;
      case 'rust':
        realTimeFeedback = [...this.analyzeRustPatterns(code, codePatterns)];
        break;
      case 'clean_arch':
        realTimeFeedback = [...this.analyzeCleanArchitecture(code, codePatterns)];
        break;
    }
    
    // Her durumda bazı temel analizleri de ekleyelim
    return [...baseAnalysis, ...realTimeFeedback].slice(0, 8); // En fazla 8 geri bildirim göster
  }
  
  /**
   * Kod içerisindeki önemli desenleri ve özellikleri tespit eder
   */
  private static detectCodePatterns(code: string): any {
    return {
      // Yapı özellikleri
      hasStruct: code.includes('struct '),
      hasEnum: code.includes('enum '),
      hasTrait: code.includes('trait '),
      hasImpl: code.includes('impl '),
      hasInterface: code.includes('interface ') || code.includes('trait '),
      
      // Bağımlılık özellikleri
      hasNewKeyword: code.includes('new ') || code.includes('new('),
      hasBoxDyn: code.includes('Box<dyn '),
      hasDependencyInjection: code.includes('fn new(') && code.includes(': '),
      
      // Fonksiyon sayısı
      functionCount: (code.match(/fn\s+\w+/g) || []).length,
      
      // Hata işleme
      usesResultType: code.includes('Result<') || code.includes('-> Result<'),
      usesOptionType: code.includes('Option<') || code.includes('-> Option<'),
      usesUnwrap: code.includes('.unwrap()'),
      usesQuestionMark: code.includes('?;'),
      
      // Mimari katmanlar
      mentionsDomain: code.includes('domain') || code.includes('Domain'),
      mentionsInfrastructure: code.includes('infrastructure') || code.includes('Infrastructure') || code.includes('infra'),
      mentionsRepository: code.includes('Repository') || code.includes('repository'),
      mentionsService: code.includes('Service') || code.includes('service'),
      mentionsController: code.includes('Controller') || code.includes('controller'),
      
      // Koşullu mantık
      conditionalCount: (code.match(/if\s+/g) || []).length,
      hasElseIf: code.includes('else if'),
      hasMatch: code.includes('match '),
      
      // OOP Desenleri
      hasInheritance: code.includes('extends') || (code.includes('impl') && code.includes('for')),
      hasEncapsulation: code.includes('pub ') && code.includes('pub(crate)'),
      
      // SOLID Özellikleri
      hasSingleResponsibility: this.hasSingleResponsibility(code),
      hasOpenClosed: this.hasOpenClosedPrinciple(code),
      hasLiskovSubstitution: this.hasLiskovSubstitution(code),
      hasInterfaceSegregation: this.hasInterfaceSegregation(code),
      hasDependencyInversion: this.hasDependencyInversion(code)
    };
  }
  
  /**
   * SOLID Prensiplerini analiz eder
   */
  private static analyzeSolidPrinciples(code: string, patterns: any): FeedbackItem[] {
    const feedback: FeedbackItem[] = [];
    
    // Single Responsibility Principle (SRP)
    if (patterns.functionCount > 5 && patterns.hasStruct) {
      feedback.push({
        id: 'solid-1',
        type: 'warning',
        title: 'Single Responsibility İhlali Olabilir',
        message: 'Bu yapı çok fazla fonksiyon içeriyor. Her sınıf tek bir sorumluluğa sahip olmalıdır. Fonksiyonları farklı yapılara bölmeyi düşünün.',
        sourcePath: 'Geçerli Kod',
        codeSnippet: this.extractRelevantCode(code, 'struct')
      });
    }
    
    // Open/Closed Principle (OCP)
    if (patterns.hasElseIf && patterns.conditionalCount > 3 && !patterns.hasMatch) {
      feedback.push({
        id: 'solid-2',
        type: 'warning',
        title: 'Open/Closed Prensibi İhlali',
        message: 'Çok fazla if-else kullanımı, kodun değişime kapalı olmadığını gösterir. Polymorphism kullanarak (trait ve implementasyonlar ile) bu sorunu çözebilirsiniz.',
        sourcePath: 'Geçerli Kod',
        codeSnippet: this.extractRelevantCode(code, 'if')
      });
    }
    
    // Liskov Substitution Principle (LSP)
    if (patterns.hasImpl && patterns.hasTrait && !patterns.hasLiskovSubstitution) {
      feedback.push({
        id: 'solid-3',
        type: 'info',
        title: 'Liskov Substitution Prensibi',
        message: 'Alt türler, üst türlerin yerine geçebilir olmalıdır. Trait implementasyonlarınızın trait kontratını doğru şekilde uyguladığından emin olun.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    // Interface Segregation Principle (ISP)
    if (patterns.hasTrait && patterns.functionCount > 7) {
      feedback.push({
        id: 'solid-4',
        type: 'warning',
        title: 'Interface Segregation İhlali',
        message: 'Trait\'iniz çok fazla metod içeriyor. Daha küçük ve odaklanmış trait\'lere bölmeyi düşünün.',
        sourcePath: 'Geçerli Kod',
        codeSnippet: this.extractRelevantCode(code, 'trait')
      });
    }
    
    // Dependency Inversion Principle (DIP)
    if (!patterns.hasBoxDyn && patterns.hasNewKeyword && patterns.mentionsRepository) {
      feedback.push({
        id: 'solid-5',
        type: 'warning',
        title: 'Dependency Inversion İhlali',
        message: 'Doğrudan somut türlere bağımlılık var. Soyutlamalara (trait\'lere) bağımlı olmayı tercih edin ve bağımlılıkları dışarıdan enjekte edin.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    return feedback;
  }
  
  /**
   * Rust desenlerini analiz eder
   */
  private static analyzeRustPatterns(code: string, patterns: any): FeedbackItem[] {
    const feedback: FeedbackItem[] = [];
    
    // Ownership ve Borrowing
    if (code.includes('clone()') && code.split('clone()').length > 3) {
      feedback.push({
        id: 'rust-1',
        type: 'warning',
        title: 'Aşırı Clone Kullanımı',
        message: 'Kodunuzda aşırı clone() kullanımı var. Bu, performans sorunlarına yol açabilir. Referanslar ve sahiplik mekanizmalarını gözden geçirin.',
        sourcePath: 'Geçerli Kod',
        codeSnippet: this.extractRelevantCode(code, 'clone()')
      });
    }
    
    // Result ve Option Kullanımı
    if (patterns.usesUnwrap) {
      feedback.push({
        id: 'rust-2',
        type: 'warning',
        title: 'Güvenli Olmayan Hata İşleme',
        message: 'unwrap() kullanımı kodunuzun hatalarda çökmesine neden olabilir. match, if let veya ? operatörünü kullanmayı düşünün.',
        sourcePath: 'Geçerli Kod',
        codeSnippet: this.extractRelevantCode(code, 'unwrap()')
      });
    }
    
    // Trait ve Generics Kullanımı
    if (!patterns.hasTrait && patterns.hasImpl) {
      feedback.push({
        id: 'rust-3',
        type: 'info',
        title: 'Trait Kullanımı Tavsiyesi',
        message: 'Kodunuzda trait tanımları eksik görünüyor. Rust\'ta polimorfizm için trait\'ler kullanmak genellikle önerilir.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    // Match Kullanımı
    if (patterns.conditionalCount > 3 && !patterns.hasMatch) {
      feedback.push({
        id: 'rust-4',
        type: 'info',
        title: 'Match Kullanımı Tavsiyesi',
        message: 'Çoklu if-else kullanımı yerine Rust\'ın match ifadesini kullanmayı düşünün. Bu, daha okunabilir ve hata olasılığı daha düşük kod sağlar.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    return feedback;
  }
  
  /**
   * Clean Architecture prensiplerini analiz eder
   */
  private static analyzeCleanArchitecture(code: string, patterns: any): FeedbackItem[] {
    const feedback: FeedbackItem[] = [];
    
    // Katman Bağımlılıkları
    if (patterns.mentionsDomain && patterns.mentionsInfrastructure) {
      feedback.push({
        id: 'clean-1',
        type: 'warning',
        title: 'Katman Bağımlılığı İhlali',
        message: 'Domain katmanı infrastructure katmanına bağımlı olmamalıdır. Bağımlılıklar dışarıdan içeriye doğru olmalıdır.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    // Bağımlılık Enjeksiyonu
    if (!patterns.hasDependencyInjection && patterns.mentionsRepository) {
      feedback.push({
        id: 'clean-2',
        type: 'info',
        title: 'Bağımlılık Enjeksiyonu Tavsiyesi',
        message: 'Repository\'leri doğrudan oluşturmak yerine, bunları dışarıdan enjekte etmek daha iyi bir yaklaşımdır.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    // Entity Kullanımı
    if (!code.includes('struct') && !code.includes('enum')) {
      feedback.push({
        id: 'clean-3',
        type: 'info',
        title: 'Entity Tanımı Eksik',
        message: 'Clean Architecture\'da domain katmanında entity\'lerin tanımlanması önemlidir. Bu, iş mantığınızı çerçevelemenize yardımcı olur.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    // Use Case Yapısı
    if (!patterns.mentionsService && !code.includes('UseCase')) {
      feedback.push({
        id: 'clean-4',
        type: 'info',
        title: 'Use Case Yapısı Tavsiyesi',
        message: 'Clean Architecture\'da use case\'lerin açıkça tanımlanması, iş mantığının organize edilmesine yardımcı olur.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    // Port ve Adapter Deseni
    if (!patterns.hasTrait && patterns.mentionsRepository) {
      feedback.push({
        id: 'clean-5',
        type: 'warning',
        title: 'Port ve Adapter Deseni Tavsiyesi',
        message: 'Repository\'ler için trait (port) tanımları eksik. Clean Architecture\'da port ve adapter deseni kullanmak önemlidir.',
        sourcePath: 'Geçerli Kod'
      });
    }
    
    return feedback;
  }
  
  /**
   * Tek sorumluluk prensibine uygunluğu kontrol eder
   */
  private static hasSingleResponsibility(code: string): boolean {
    const structMatches = code.match(/struct\s+\w+\s*{[^}]*}/g) || [];
    
    for (const struct of structMatches) {
      const functionMatches = code.match(new RegExp(`impl\\s+\\w+\\s+for\\s+${struct.match(/struct\s+(\w+)/)?.[1]}\\s*{[^}]*}`, 'g')) || [];
      let methodCount = 0;
      
      for (const impl of functionMatches) {
        methodCount += (impl.match(/fn\s+\w+/g) || []).length;
      }
      
      if (methodCount > 5) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Open/Closed prensibine uygunluğu kontrol eder
   */
  private static hasOpenClosedPrinciple(code: string): boolean {
    const hasSwitchOverTypes = code.match(/match\s+\w+\.(type|kind)/g) !== null;
    const hasLongIfElseChains = (code.match(/else\s+if/g) || []).length > 3;
    
    return !hasSwitchOverTypes && !hasLongIfElseChains;
  }
  
  /**
   * Liskov Substitution prensibine uygunluğu kontrol eder
   */
  private static hasLiskovSubstitution(code: string): boolean {
    // Basit bir örnek: trait ve impl arasında uyumsuzluk olup olmadığını kontrol et
    return !code.includes('unimplemented!()');
  }
  
  /**
   * Interface Segregation prensibine uygunluğu kontrol eder
   */
  private static hasInterfaceSegregation(code: string): boolean {
    const traitMatches = code.match(/trait\s+\w+\s*{[^}]*}/g) || [];
    
    for (const trait of traitMatches) {
      const methodCount = (trait.match(/fn\s+\w+/g) || []).length;
      if (methodCount > 5) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Dependency Inversion prensibine uygunluğu kontrol eder
   */
  private static hasDependencyInversion(code: string): boolean {
    return code.includes('Box<dyn') || code.includes('&dyn');
  }
  
  /**
   * Koddan ilgili kısmı çıkarır
   */
  private static extractRelevantCode(code: string, keyword: string): string {
    const lines = code.split('\n');
    const keywordIndex = lines.findIndex(line => line.includes(keyword));
    
    if (keywordIndex === -1) {
      return code.length > 200 ? code.substring(0, 200) + '...' : code;
    }
    
    const startLine = Math.max(0, keywordIndex - 3);
    const endLine = Math.min(lines.length, keywordIndex + 7);
    
    return lines.slice(startLine, endLine).join('\n');
  }
} 