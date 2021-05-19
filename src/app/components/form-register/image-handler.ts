export class ImageHandler {
  private readonly input: HTMLInputElement;

  private readonly canvas: HTMLCanvasElement | null;

  private imageIsUpdated = false;

  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.input = document.createElement('input');
    this.setupInput();

    canvas?.addEventListener('click', () => {
      this.input.click();
    });
  }

  setupInput(): void {
    this.input.type = 'file';
    this.input.style.display = 'none';
    this.input.accept = '.jpg, .jpeg, .png';

    this.input.addEventListener('click', () => {
      const drawImage = this.drawImage.bind(this);
      const reader = new FileReader();

      this.input.addEventListener('change', () => {
        if (!this.input.files) return;
        const file = this.input?.files[0];
        reader.onload = () => {
          if (reader.result) drawImage(reader.result as string);
        };
        if (file) reader.readAsDataURL(file);
      });
    });
  }

  drawImage(src: string): void {
    const RATIO = 1;
    const img = new Image();
    const { canvas } = this;
    const ctx = canvas?.getContext('2d');

    if (canvas) canvas.style.backgroundImage = 'none';

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;

    img.onload = () => {
      const inputWidth = img.naturalWidth;
      const inputHeight = img.naturalHeight;
      const inputImageAspectRatio = inputWidth / inputHeight;
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;

      if (inputImageAspectRatio > RATIO) {
        outputWidth = inputHeight * RATIO;
      } else if (inputImageAspectRatio < RATIO) {
        outputHeight = inputWidth / RATIO;
      }
      if (canvas) {
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        ctx?.drawImage(img, 0, 0);
        this.imageIsUpdated = true;
      }
    };
  }

  getImage(): string {
    let result = 'none';
    if (this.canvas && this.imageIsUpdated)
      result = this.canvas.toDataURL('image/jpeg', 0.6);
    return result;
  }
}
