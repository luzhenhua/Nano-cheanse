/**
 * watermark.js
 * Implements the "Reverse Alpha Blending" algorithm.
 * Requires pre-captured alpha map assets: assets/bg_48.png and assets/bg_96.png
 */

class WatermarkRemover {
    constructor() {
        this.ALPHA_THRESHOLD = 0.002;
        this.MAX_ALPHA = 0.99; // Cap to avoid division by zero
        this.LOGO_VALUE = 255; // White logo

        this.alphaMaps = {
            48: null,
            96: null
        };
    }

    /**
     * Loads the alpha map image (bg_XX.png) and extracts alpha values.
     */
    async loadAlphaMap(size) {
        if (this.alphaMaps[size]) return this.alphaMaps[size];

        const filename = `assets/bg_${size}.png`;

        const img = await this.loadImage(filename).catch(() => {
            throw new Error(`Missing alpha map asset: ${filename}`);
        });

        this.alphaMaps[size] = this.extractAlphaFromImage(img, size);

        return this.alphaMaps[size];
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            try {
                const isHttp = /^https?:\/\//i.test(src);
                const url = isHttp ? new URL(src, window.location.href) : null;
                if (url && url.origin !== window.location.origin) {
                    img.crossOrigin = 'anonymous';
                }
            } catch {
                // Ignore URL parsing issues and continue without CORS mode.
            }
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load ${src}`));
            img.src = src;
        });
    }

    /**
     * Extracts alpha map from a loaded image (bg_XX.png).
     * Rule: alpha = max(r,g,b) / 255.0
     */
    extractAlphaFromImage(img, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        return this.extractAlphaFromCanvas(ctx, size);
    }

    /**
     * Extracts alpha values from a canvas context.
     * Rule: alpha = max(r,g,b) / 255.0
     */
    extractAlphaFromCanvas(ctx, size) {
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        const map = new Float32Array(size * size);

        for (let i = 0; i < data.length; i += 4) {
            // Take max of RGB as the intensity/alpha
            const maxVal = Math.max(data[i], data[i+1], data[i+2]);
            map[i / 4] = maxVal / 255.0;
        }
        return map;
    }

    async process(file) {
        const objectUrl = URL.createObjectURL(file);
        try {
            const img = await this.loadImage(objectUrl);
            return this.removeWatermark(img);
        } finally {
            URL.revokeObjectURL(objectUrl);
        }
    }

    async removeWatermark(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(img, 0, 0);

        // 1. Detect Config
        let logoSize, marginRight, marginBottom;
        if (img.width > 1024 && img.height > 1024) {
            logoSize = 96;
            marginRight = 64;
            marginBottom = 64;
        } else {
            logoSize = 48;
            marginRight = 32;
            marginBottom = 32;
        }

        // 2. Calculate Position
        const x = img.width - marginRight - logoSize;
        const y = img.height - marginBottom - logoSize;

        if (x < 0 || y < 0) {
            throw new Error("Image too small for watermark processing");
        }

        // 3. Get Alpha Map (Async, might load from network/disk)
        const alphaMap = await this.loadAlphaMap(logoSize);

        // 4. Process Region
        const regionData = ctx.getImageData(x, y, logoSize, logoSize);
        const pixels = regionData.data;

        for (let i = 0; i < alphaMap.length; i++) {
            let alpha = alphaMap[i];

            if (alpha < this.ALPHA_THRESHOLD) continue;

            alpha = Math.min(alpha, this.MAX_ALPHA);
            const oneMinusAlpha = 1.0 - alpha;

            const idx = i * 4;
            
            for (let c = 0; c < 3; c++) {
                const watermarked = pixels[idx + c];
                const original = (watermarked - alpha * this.LOGO_VALUE) / oneMinusAlpha;
                pixels[idx + c] = Math.max(0, Math.min(255, Math.round(original)));
            }
        }

        ctx.putImageData(regionData, x, y);

        return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    }
}
