/* ============================================
   ProAir Zimbabwe — Emoji Encoder
   Unicode Escape Sequence Handling for WhatsApp
   ============================================ */

/**
 * EmojiEncoder handles conversion of emoji characters to Unicode escape sequences
 * compatible with WhatsApp platforms, with fallback to text-based symbols.
 */
class EmojiEncoder {
    // WhatsApp-safe emoji mappings with Unicode escape sequences
    static WHATSAPP_SAFE_EMOJIS = {
        // Business communication emojis
        '🔵': '\\u{1F535}',  // Blue circle for headers
        '👤': '\\u{1F464}',  // Person for customer info
        '📧': '\\u{1F4E7}',  // Email symbol
        '📱': '\\u{1F4F1}',  // Mobile phone
        '🔧': '\\u{1F527}',  // Wrench for services
        '💬': '\\u{1F4AC}',  // Speech bubble for messages
        '⏰': '\\u{23F0}',   // Clock for timestamps
        '🏠': '\\u{1F3E0}',  // House for home services
        '🚗': '\\u{1F697}',  // Car for automotive services
        '🏢': '\\u{1F3E2}',  // Office building
        '🔴': '\\u{1F534}',  // Red circle for urgent
        '🟡': '\\u{1F7E1}',  // Yellow circle for normal
        '🟢': '\\u{1F7E2}',  // Green circle for low priority
        '🟠': '\\u{1F7E0}',  // Orange circle for high priority
        '📋': '\\u{1F4CB}',  // Clipboard for lead info
        '⚡': '\\u{26A1}',   // Lightning for quick actions
        '📞': '\\u{1F4DE}',  // Phone receiver
        '📅': '\\u{1F4C5}',  // Calendar
        '📍': '\\u{1F4CD}',  // Location pin
        '💰': '\\u{1F4B0}',  // Money bag
        '📐': '\\u{1F4D0}',  // Triangular ruler
    };

    // Text-based fallback symbols for when emoji encoding fails
    static FALLBACK_SYMBOLS = {
        '🔵': '*',
        '👤': 'Name:',
        '📧': 'Email:',
        '📱': 'Phone:',
        '🔧': 'Service:',
        '💬': 'Message:',
        '⏰': 'Time:',
        '🏠': 'Home:',
        '🚗': 'Car:',
        '🏢': 'Office:',
        '🔴': '[URGENT]',
        '🟡': '[NORMAL]',
        '🟢': '[LOW]',
        '🟠': '[HIGH]',
        '📋': 'Lead:',
        '⚡': 'Actions:',
        '📞': 'Call:',
        '📅': 'Schedule:',
        '📍': 'Location:',
        '💰': 'Quote:',
        '📐': 'Measure:',
    };

    /**
     * Encode a text string by converting emojis to Unicode escape sequences
     * @param {string} text - Text containing emoji characters
     * @returns {string} Text with emojis converted to Unicode sequences
     */
    static encode(text) {
        // Convert to string if not already
        if (text === null || text === undefined) {
            return '';
        }
        
        const textStr = String(text);
        let encodedText = textStr;

        // Convert each supported emoji to its Unicode escape sequence
        for (const [emoji, unicodeSequence] of Object.entries(this.WHATSAPP_SAFE_EMOJIS)) {
            // Use global replace to handle multiple occurrences
            encodedText = encodedText.replace(new RegExp(emoji, 'g'), unicodeSequence);
        }

        return encodedText;
    }

    /**
     * Get Unicode escape sequence for a specific emoji
     * @param {string} emoji - Single emoji character
     * @returns {string} Unicode escape sequence or original emoji if not supported
     */
    static getUnicodeSequence(emoji) {
        return this.WHATSAPP_SAFE_EMOJIS[emoji] || emoji;
    }

    /**
     * Validate if an emoji is compatible with WhatsApp platforms
     * @param {string} emoji - Single emoji character to validate
     * @returns {boolean} True if emoji is in the safe list
     */
    static validateCompatibility(emoji) {
        return Object.prototype.hasOwnProperty.call(this.WHATSAPP_SAFE_EMOJIS, emoji);
    }

    /**
     * Get text-based fallback symbol for an emoji
     * @param {string} emoji - Single emoji character
     * @returns {string} Text-based fallback symbol
     */
    static getFallbackSymbol(emoji) {
        return this.FALLBACK_SYMBOLS[emoji] || emoji;
    }

    /**
     * Encode message with fallback handling - if encoding fails, use text symbols
     * @param {string} text - Text containing emoji characters
     * @returns {string} Text with emojis encoded or replaced with fallbacks
     */
    static encodeWithFallback(text) {
        // Convert to string if not already
        if (text === null || text === undefined) {
            return '';
        }
        
        const textStr = String(text);

        try {
            // First attempt Unicode encoding
            const encoded = this.encode(textStr);
            
            // Verify encoding worked by checking if we still have unsupported emojis
            const hasUnsupportedEmojis = this._hasUnsupportedEmojis(encoded);
            
            if (hasUnsupportedEmojis) {
                // Fall back to text symbols
                return this._replaceWithFallbacks(textStr);
            }
            
            return encoded;
        } catch (error) {
            console.warn('Emoji encoding failed, using fallback symbols:', error);
            return this._replaceWithFallbacks(textStr);
        }
    }

    /**
     * Check if text contains unsupported emoji characters
     * @private
     * @param {string} text - Text to check
     * @returns {boolean} True if unsupported emojis are found
     */
    static _hasUnsupportedEmojis(text) {
        // Check for emoji characters that aren't in our safe list
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
        const emojisFound = text.match(emojiRegex) || [];
        
        return emojisFound.some(emoji => !this.validateCompatibility(emoji));
    }

    /**
     * Replace emojis with text-based fallback symbols
     * @private
     * @param {string} text - Text containing emojis
     * @returns {string} Text with emojis replaced by fallback symbols
     */
    static _replaceWithFallbacks(text) {
        let fallbackText = text;

        for (const [emoji, fallback] of Object.entries(this.FALLBACK_SYMBOLS)) {
            fallbackText = fallbackText.replace(new RegExp(emoji, 'g'), fallback);
        }

        return fallbackText;
    }

    /**
     * Get list of all supported emojis
     * @returns {string[]} Array of supported emoji characters
     */
    static getSupportedEmojis() {
        return Object.keys(this.WHATSAPP_SAFE_EMOJIS);
    }

    /**
     * Test encoding with a sample message
     * @returns {Object} Test results with original and encoded messages
     */
    static testEncoding() {
        const testMessage = `🔵 *ProAir Zimbabwe — Test Message*
👤 Customer: John Doe
📧 Email: john@example.com
🔧 Service: Car A/C
💬 Message: Need urgent repair 🔴`;

        return {
            original: testMessage,
            encoded: this.encode(testMessage),
            withFallback: this.encodeWithFallback(testMessage),
            supportedEmojis: this.getSupportedEmojis()
        };
    }
}

// ES6 export for modern modules
export default EmojiEncoder;

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.EmojiEncoder = EmojiEncoder;
}