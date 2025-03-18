import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FingerprintService {
  /*TODO This has to be tested on different devices and OSs*/
  async generateFingerprint(): Promise<string> {
    const components: string[] = [
      navigator.userAgent,
      navigator.language,
      navigator.platform,
      new Date().getTimezoneOffset().toString(),
      screen.width.toString(),
      screen.height.toString(),
      screen.colorDepth.toString(),
      await this.getWebGLInfo(),
      await this.getAudioFingerprint(),
    ];

    return await this.hashSHA256(components.join('|'));
  }

  private async hashSHA256(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b: number) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async getWebGLInfo(): Promise<string> {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;

      if (!gl) {
        return 'no-webgl';
      }

      const debugInfo: WEBGL_debug_renderer_info | null = gl.getExtension(
        'WEBGL_debug_renderer_info',
      );
      return debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : 'unknown';
    } catch {
      return 'no-webgl';
    }
  }

  private async getAudioFingerprint(): Promise<string> {
    try {
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator: OscillatorNode = context.createOscillator();
      const compressor: DynamicsCompressorNode =
        context.createDynamicsCompressor();

      oscillator.connect(compressor);
      compressor.connect(context.destination);

      oscillator.frequency.value = 0;
      oscillator.start();
      oscillator.stop(context.currentTime + 0.01);

      return Math.round(compressor.reduction).toString();
    } catch {
      return 'no-audio';
    }
  }
}
