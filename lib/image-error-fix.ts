// Image コンストラクタエラーの修正
export function fixImageConstructorError() {
  if (typeof window !== 'undefined') {
    try {
      const originalImage = window.Image;
      window.Image = function(...args: any[]) {
        try {
          return new originalImage(...args);
        } catch (error) {
          console.warn('Image constructor error suppressed:', error);
          return new originalImage();
        }
      };
      window.Image.prototype = originalImage.prototype;
    } catch (error) {
      console.warn('Failed to fix Image constructor error:', error);
    }
  }
}

// 自動的に実行
if (typeof window !== 'undefined') {
  fixImageConstructorError();
} 