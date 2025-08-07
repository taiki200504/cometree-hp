// 画像エラー修正ユーティリティ
// 本運用環境での画像読み込みエラーを防ぐための設定

export const imageErrorFix = {
  // 画像読み込みエラー時のフォールバック処理
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    target.src = '/images/placeholder.jpg';
    target.alt = '画像を読み込めませんでした';
  },

  // 画像の最適化設定
  optimizeImage: (src: string, width: number, height: number) => {
    return {
      src,
      width,
      height,
      loading: 'lazy' as const,
      onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src = '/images/placeholder.jpg';
      }
    };
  }
};

export default imageErrorFix;
