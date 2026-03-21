/* ============================================
   ProAir Zimbabwe — WhatsApp Emojis Tests
   Unit tests for emoji constants and helpers
   ============================================ */

import { describe, test, expect } from 'vitest';
import { 
    WHATSAPP_SAFE_EMOJIS, 
    UNICODE_MAPPINGS, 
    FALLBACK_MAPPINGS,
    SERVICE_EMOJIS,
    PRIORITY_EMOJIS,
    WORKFLOW_EMOJIS,
    getAllSupportedEmojis,
    isEmojiSupported,
    getServiceEmoji,
    getPriorityEmoji
} from './WhatsAppEmojis.js';

describe('WhatsApp Emojis Constants', () => {
    
    test('should have consistent emoji mappings', () => {
        const supportedEmojis = Object.values(WHATSAPP_SAFE_EMOJIS);
        
        // Every supported emoji should have a Unicode mapping
        supportedEmojis.forEach(emoji => {
            expect(UNICODE_MAPPINGS).toHaveProperty(emoji);
            expect(UNICODE_MAPPINGS[emoji]).toMatch(/^\\u\{[0-9A-F]+\}$/i);
        });
        
        // Every supported emoji should have a fallback mapping
        supportedEmojis.forEach(emoji => {
            expect(FALLBACK_MAPPINGS).toHaveProperty(emoji);
            expect(typeof FALLBACK_MAPPINGS[emoji]).toBe('string');
            expect(FALLBACK_MAPPINGS[emoji].length).toBeGreaterThan(0);
        });
    });

    test('should provide valid service emojis', () => {
        const serviceTypes = Object.keys(SERVICE_EMOJIS);
        
        serviceTypes.forEach(serviceType => {
            const emoji = SERVICE_EMOJIS[serviceType];
            expect(Object.values(WHATSAPP_SAFE_EMOJIS)).toContain(emoji);
        });
    });

    test('should provide valid priority emojis', () => {
        const priorities = Object.keys(PRIORITY_EMOJIS);
        
        priorities.forEach(priority => {
            const emoji = PRIORITY_EMOJIS[priority];
            expect(Object.values(WHATSAPP_SAFE_EMOJIS)).toContain(emoji);
        });
    });

    test('should provide valid workflow emojis', () => {
        const workflowTypes = Object.keys(WORKFLOW_EMOJIS);
        
        workflowTypes.forEach(workflowType => {
            const emoji = WORKFLOW_EMOJIS[workflowType];
            expect(Object.values(WHATSAPP_SAFE_EMOJIS)).toContain(emoji);
        });
    });

    test('getAllSupportedEmojis should return all emojis', () => {
        const allEmojis = getAllSupportedEmojis();
        const expectedEmojis = Object.values(WHATSAPP_SAFE_EMOJIS);
        
        expect(allEmojis).toEqual(expectedEmojis);
        expect(allEmojis.length).toBeGreaterThan(0);
    });

    test('isEmojiSupported should correctly identify supported emojis', () => {
        expect(isEmojiSupported('🔵')).toBe(true);
        expect(isEmojiSupported('👤')).toBe(true);
        expect(isEmojiSupported('🦄')).toBe(false); // Not in our list
        expect(isEmojiSupported('abc')).toBe(false); // Not an emoji
    });

    test('getServiceEmoji should return appropriate emojis', () => {
        expect(getServiceEmoji('car-ac')).toBe(WHATSAPP_SAFE_EMOJIS.CAR);
        expect(getServiceEmoji('home-heating-cooling')).toBe(WHATSAPP_SAFE_EMOJIS.HOUSE);
        expect(getServiceEmoji('office-climate')).toBe(WHATSAPP_SAFE_EMOJIS.OFFICE);
        expect(getServiceEmoji('unknown-service')).toBe(WHATSAPP_SAFE_EMOJIS.WRENCH);
    });

    test('getPriorityEmoji should return appropriate emojis', () => {
        expect(getPriorityEmoji('low')).toBe(WHATSAPP_SAFE_EMOJIS.GREEN_CIRCLE);
        expect(getPriorityEmoji('normal')).toBe(WHATSAPP_SAFE_EMOJIS.YELLOW_CIRCLE);
        expect(getPriorityEmoji('high')).toBe(WHATSAPP_SAFE_EMOJIS.ORANGE_CIRCLE);
        expect(getPriorityEmoji('urgent')).toBe(WHATSAPP_SAFE_EMOJIS.RED_CIRCLE);
        expect(getPriorityEmoji('unknown')).toBe(WHATSAPP_SAFE_EMOJIS.YELLOW_CIRCLE);
    });

    test('fallback symbols should be ASCII-safe', () => {
        Object.values(FALLBACK_MAPPINGS).forEach(fallback => {
            // Should only contain ASCII characters
            expect(fallback).toMatch(/^[\x00-\x7F]*$/);
        });
    });

    test('Unicode mappings should be valid format', () => {
        Object.values(UNICODE_MAPPINGS).forEach(unicode => {
            expect(unicode).toMatch(/^\\u\{[0-9A-F]+\}$/i);
        });
    });
});