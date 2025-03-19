import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FingerprintService {
  async generateFingerprint(): Promise<string> {
    const components: string[] = [
      navigator.userAgent,
      navigator.language,
      navigator.platform,
      new Date().getTimezoneOffset().toString(),
      screen.width.toString(),
      screen.height.toString(),
      screen.colorDepth.toString(),
      this.getWebGLFingerprint(),
      this.getCanvasFingerprint(),
      this.getCpuCores(),
      this.getDeviceMemory(),
    ];

    return await this.hashSHA256(components.join('|'));
  }

  private async hashSHA256(input: string): Promise<string> {
    const encoder: TextEncoder = new TextEncoder();
    const data: Uint8Array = encoder.encode(input);
    const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b: number) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private getWebGLFingerprint(): string {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const gl: WebGLRenderingContext | null = canvas.getContext(
        'webgl',
      ) as WebGLRenderingContext | null;
      if (!gl) return 'no-webgl';

      const debugInfo: WEBGL_debug_renderer_info | null = gl.getExtension(
        'WEBGL_debug_renderer_info',
      );
      return debugInfo
        ? (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string)
        : 'unknown';
    } catch {
      return 'no-webgl';
    }
  }

  private getCanvasFingerprint(): string {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (!ctx) return 'no-canvas';

      ctx.fillStyle = 'rgb(255,0,255)';
      ctx.fillRect(10, 10, 50, 50);
      ctx.fillStyle = 'rgb(0,255,0)';
      ctx.font = '18px Arial';
      ctx.fillText('Hello, fingerprint!', 10, 50);

      return canvas.toDataURL();
    } catch {
      return 'no-canvas';
    }
  }

  private getCpuCores(): string {
    return navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency.toString()
      : 'unknown';
  }

  private getDeviceMemory(): string {
    return (
      (
        navigator as Navigator & { deviceMemory?: number }
      ).deviceMemory?.toString() || 'unknown'
    );
  }
}
