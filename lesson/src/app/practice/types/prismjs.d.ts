declare module 'prismjs' {
  const Prism: {
    highlightElement: (element: HTMLElement) => void;
    highlight: (text: string, grammar: any, language: string) => string;
  };
  export default Prism;
} 