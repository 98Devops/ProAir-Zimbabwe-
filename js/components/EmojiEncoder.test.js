/* ============================================
   ProAir Zimbabwe — EmojiEncoder Property Tests
   Property-Based Testing for Unicode Handling
   ============================================ */

import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import EmojiEncoder from './EmojiEncoder.js';

describe('EmojiEncoder Property Tests', () => {
    
    test('Property 1: Emoji Unicode Encoding - **Validates: Requirements 1.1, 1.2**', () => {
        // Generate test data with emoji characters
        const emojiArbitrary = fc.constantFrom(...EmojiEncoder.getSupportedEmojis());
        const textWithEmojisArbitrary = fc.tuple(
            fc.string({ minLength: 0, maxLength: 50 }),
            fc.array(emojiArbitrary, { minLength: 1, maxLength: 5 }),
            fc.string({ minLength: 0, maxLength: 50 })
        ).map(([prefix, emojis, suffix]) => prefix + emojis.join('') + suffix);

        fc.assert(fc.property(
            textWithEmojisArbitrary,
            (textWithEmojis) => {
                const encoded = EmojiEncoder.encode(textWithEmojis);
                
                // Property 1.1: Should not contain raw emoji characters after encoding
                const supportedEmojis = EmojiEncoder.getSupportedEmojis();
                supportedEmojis.forEach(emoji => {
                    expect(encoded).not.toContain(emoji);
                });
                
                // Property 1.2: Should contain Unicode escape sequences
                if (supportedEmojis.some(emoji => textWithEmojis.includes(emoji))) {
                    expect(encoded).toMatch(/\\u\{[0-9A-F]+\}/i);
                }
                
                // Property: Encoding should be deterministic
                const encodedAgain = EmojiEncoder.encode(textWithEmojis);
                expect(encoded).toBe(encodedAgain);
            }
        ), { numRuns: 20 });
    });

    test('Property 4: Emoji Compatibility Validation - **Validates: Requirements 1.4**', () => {
        fc.assert(fc.property(
            fc.constantFrom(...EmojiEncoder.getSupportedEmojis()),
            (emoji) => {
                // All emojis in the supported list should validate as compatible
                expect(EmojiEncoder.validateCompatibility(emoji)).toBe(true);
                
                // Should have a corresponding Unicode sequence
                const unicodeSequence = EmojiEncoder.getUnicodeSequence(emoji);
                expect(unicodeSequence).toMatch(/\\u\{[0-9A-F]+\}/i);
                
                // Should have a fallback symbol
                const fallback = EmojiEncoder.getFallbackSymbol(emoji);
                expect(fallback).toBeDefined();
                expect(typeof fallback).toBe('string');
                expect(fallback.length).toBeGreaterThan(0);
            }
        ), { numRuns: 10 });
    });

    test('Property 5: Emoji Fallback Handling - **Validates: Requirements 1.3, 1.5**', () => {
        const emojiArbitrary = fc.constantFrom(...EmojiEncoder.getSupportedEmojis());
        
        fc.assert(fc.property(
            fc.array(emojiArbitrary, { minLength: 1, maxLength: 10 }),
            fc.string({ minLength: 0, maxLength: 100 }),
            (emojis, text) => {
                const textWithEmojis = text + emojis.join('');
                const withFallback = EmojiEncoder.encodeWithFallback(textWithEmojis);
                
                // Should not contain question mark characters (�)
                expect(withFallback).not.toContain('�');
                
                // Should not be empty
                expect(withFallback.length).toBeGreaterThan(0);
                
                // Should contain either Unicode sequences or fallback text
                const hasUnicodeSequences = /\\u\{[0-9A-F]+\}/i.test(withFallback);
                const hasFallbackText = emojis.some(emoji => {
                    const fallback = EmojiEncoder.getFallbackSymbol(emoji);
                    return withFallback.includes(fallback);
                });
                
                expect(hasUnicodeSequences || hasFallbackText).toBe(true);
            }
        ), { numRuns: 20 });
    });

    test('Property: Encoding Preserves Non-Emoji Content', () => {
        fc.assert(fc.property(
            fc.string().filter(s => !EmojiEncoder.getSupportedEmojis().some(emoji => s.includes(emoji))),
            (textWithoutEmojis) => {
                const encoded = EmojiEncoder.encode(textWithoutEmojis);
                
                // Text without emojis should remain unchanged
                expect(encoded).toBe(textWithoutEmojis);
            }
        ), { numRuns: 20 });
    });

    test('Property: Fallback Symbols Are Safe Text', () => {
        fc.assert(fc.property(
            fc.constantFrom(...EmojiEncoder.getSupportedEmojis()),
            (emoji) => {
                const fallback = EmojiEncoder.getFallbackSymbol(emoji);
                
                // Fallback should not contain emoji characters
                expect(fallback).not.toMatch(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]/gu);
                
                // Fallback should be ASCII-safe
                expect(fallback).toMatch(/^[\x00-\x7F]*$/);
                
                // Fallback should not be the original emoji
                expect(fallback).not.toBe(emoji);
            }
        ), { numRuns: 10 });
    });

    test('Property: Unicode Sequences Are Valid Format', () => {
        fc.assert(fc.property(
            fc.constantFrom(...EmojiEncoder.getSupportedEmojis()),
            (emoji) => {
                const unicodeSequence = EmojiEncoder.getUnicodeSequence(emoji);
                
                // Should match Unicode escape sequence pattern
                expect(unicodeSequence).toMatch(/^\\u\{[0-9A-F]+\}$/i);
                
                // Should be different from original emoji
                expect(unicodeSequence).not.toBe(emoji);
                
                // Should be consistent
                const sequenceAgain = EmojiEncoder.getUnicodeSequence(emoji);
                expect(unicodeSequence).toBe(sequenceAgain);
            }
        ), { numRuns: 10 });
    });

    test('Property: Encoding Handles Edge Cases', () => {
        fc.assert(fc.property(
            fc.oneof(
                fc.constant(''),
                fc.constant(null),
                fc.constant(undefined),
                fc.integer(),
                fc.boolean()
            ),
            (invalidInput) => {
                // Should handle invalid inputs gracefully
                const result = EmojiEncoder.encode(invalidInput);
                expect(typeof result).toBe('string');
                
                const fallbackResult = EmojiEncoder.encodeWithFallback(invalidInput);
                expect(typeof fallbackResult).toBe('string');
            }
        ), { numRuns: 10 });
    });
});

describe('EmojiEncoder Unit Tests', () => {
    
    test('should encode supported emojis to Unicode sequences', () => {
        const testMessage = '🔵 ProAir Zimbabwe 👤 Customer';
        const encoded = EmojiEncoder.encode(testMessage);
        
        expect(encoded).toContain('\\u{1F535}'); // Blue circle
        expect(encoded).toContain('\\u{1F464}'); // Person
        expect(encoded).not.toContain('🔵');
        expect(encoded).not.toContain('👤');
    });

    test('should provide fallback symbols when encoding fails', () => {
        const testMessage = '🔵 Test 👤 User';
        const withFallback = EmojiEncoder.encodeWithFallback(testMessage);
        
        // Should not contain question marks
        expect(withFallback).not.toContain('�');
        expect(withFallback.length).toBeGreaterThan(0);
    });

    test('should validate emoji compatibility correctly', () => {
        expect(EmojiEncoder.validateCompatibility('🔵')).toBe(true);
        expect(EmojiEncoder.validateCompatibility('👤')).toBe(true);
        expect(EmojiEncoder.validateCompatibility('🦄')).toBe(false); // Not in safe list
    });

    test('should return appropriate fallback symbols', () => {
        expect(EmojiEncoder.getFallbackSymbol('🔵')).toBe('*');
        expect(EmojiEncoder.getFallbackSymbol('👤')).toBe('Name:');
        expect(EmojiEncoder.getFallbackSymbol('📧')).toBe('Email:');
    });

    test('should handle empty and invalid inputs', () => {
        expect(EmojiEncoder.encode('')).toBe('');
        expect(EmojiEncoder.encode(null)).toBe('');
        expect(EmojiEncoder.encode(undefined)).toBe('');
        
        expect(EmojiEncoder.encodeWithFallback('')).toBe('');
        expect(EmojiEncoder.encodeWithFallback(null)).toBe('');
    });

    test('should preserve non-emoji text', () => {
        const plainText = 'ProAir Zimbabwe - Contact Form';
        expect(EmojiEncoder.encode(plainText)).toBe(plainText);
    });

    test('testEncoding method should return valid test results', () => {
        const testResults = EmojiEncoder.testEncoding();
        
        expect(testResults).toHaveProperty('original');
        expect(testResults).toHaveProperty('encoded');
        expect(testResults).toHaveProperty('withFallback');
        expect(testResults).toHaveProperty('supportedEmojis');
        
        expect(Array.isArray(testResults.supportedEmojis)).toBe(true);
        expect(testResults.supportedEmojis.length).toBeGreaterThan(0);
    });
});