/* ============================================
   ProAir Zimbabwe — WhatsApp Safe Emoji Constants
   Centralized emoji mappings and fallbacks
   ============================================ */

/**
 * WhatsApp-safe emoji constants and mappings
 * These emojis have been tested for compatibility across WhatsApp platforms
 */
export const WHATSAPP_SAFE_EMOJIS = {
    // Business communication emojis
    BLUE_CIRCLE: '🔵',
    PERSON: '👤', 
    EMAIL: '📧',
    MOBILE_PHONE: '📱',
    WRENCH: '🔧',
    SPEECH_BUBBLE: '💬',
    CLOCK: '⏰',
    HOUSE: '🏠',
    CAR: '🚗',
    OFFICE: '🏢',
    
    // Priority indicators
    RED_CIRCLE: '🔴',      // Urgent
    YELLOW_CIRCLE: '🟡',   // Normal
    GREEN_CIRCLE: '🟢',    // Low
    ORANGE_CIRCLE: '🟠',   // High
    
    // Business workflow
    CLIPBOARD: '📋',
    LIGHTNING: '⚡',
    PHONE_RECEIVER: '📞',
    CALENDAR: '📅',
    LOCATION_PIN: '📍',
    MONEY_BAG: '💰',
    TRIANGULAR_RULER: '📐',
};

/**
 * Unicode escape sequences for WhatsApp-safe emojis
 */
export const UNICODE_MAPPINGS = {
    [WHATSAPP_SAFE_EMOJIS.BLUE_CIRCLE]: '\\u{1F535}',
    [WHATSAPP_SAFE_EMOJIS.PERSON]: '\\u{1F464}',
    [WHATSAPP_SAFE_EMOJIS.EMAIL]: '\\u{1F4E7}',
    [WHATSAPP_SAFE_EMOJIS.MOBILE_PHONE]: '\\u{1F4F1}',
    [WHATSAPP_SAFE_EMOJIS.WRENCH]: '\\u{1F527}',
    [WHATSAPP_SAFE_EMOJIS.SPEECH_BUBBLE]: '\\u{1F4AC}',
    [WHATSAPP_SAFE_EMOJIS.CLOCK]: '\\u{23F0}',
    [WHATSAPP_SAFE_EMOJIS.HOUSE]: '\\u{1F3E0}',
    [WHATSAPP_SAFE_EMOJIS.CAR]: '\\u{1F697}',
    [WHATSAPP_SAFE_EMOJIS.OFFICE]: '\\u{1F3E2}',
    [WHATSAPP_SAFE_EMOJIS.RED_CIRCLE]: '\\u{1F534}',
    [WHATSAPP_SAFE_EMOJIS.YELLOW_CIRCLE]: '\\u{1F7E1}',
    [WHATSAPP_SAFE_EMOJIS.GREEN_CIRCLE]: '\\u{1F7E2}',
    [WHATSAPP_SAFE_EMOJIS.ORANGE_CIRCLE]: '\\u{1F7E0}',
    [WHATSAPP_SAFE_EMOJIS.CLIPBOARD]: '\\u{1F4CB}',
    [WHATSAPP_SAFE_EMOJIS.LIGHTNING]: '\\u{26A1}',
    [WHATSAPP_SAFE_EMOJIS.PHONE_RECEIVER]: '\\u{1F4DE}',
    [WHATSAPP_SAFE_EMOJIS.CALENDAR]: '\\u{1F4C5}',
    [WHATSAPP_SAFE_EMOJIS.LOCATION_PIN]: '\\u{1F4CD}',
    [WHATSAPP_SAFE_EMOJIS.MONEY_BAG]: '\\u{1F4B0}',
    [WHATSAPP_SAFE_EMOJIS.TRIANGULAR_RULER]: '\\u{1F4D0}',
};

/**
 * Text-based fallback symbols (ASCII-safe)
 */
export const FALLBACK_MAPPINGS = {
    [WHATSAPP_SAFE_EMOJIS.BLUE_CIRCLE]: '*',
    [WHATSAPP_SAFE_EMOJIS.PERSON]: 'Name:',
    [WHATSAPP_SAFE_EMOJIS.EMAIL]: 'Email:',
    [WHATSAPP_SAFE_EMOJIS.MOBILE_PHONE]: 'Phone:',
    [WHATSAPP_SAFE_EMOJIS.WRENCH]: 'Service:',
    [WHATSAPP_SAFE_EMOJIS.SPEECH_BUBBLE]: 'Message:',
    [WHATSAPP_SAFE_EMOJIS.CLOCK]: 'Time:',
    [WHATSAPP_SAFE_EMOJIS.HOUSE]: 'Home:',
    [WHATSAPP_SAFE_EMOJIS.CAR]: 'Car:',
    [WHATSAPP_SAFE_EMOJIS.OFFICE]: 'Office:',
    [WHATSAPP_SAFE_EMOJIS.RED_CIRCLE]: '[URGENT]',
    [WHATSAPP_SAFE_EMOJIS.YELLOW_CIRCLE]: '[NORMAL]',
    [WHATSAPP_SAFE_EMOJIS.GREEN_CIRCLE]: '[LOW]',
    [WHATSAPP_SAFE_EMOJIS.ORANGE_CIRCLE]: '[HIGH]',
    [WHATSAPP_SAFE_EMOJIS.CLIPBOARD]: 'Lead:',
    [WHATSAPP_SAFE_EMOJIS.LIGHTNING]: 'Actions:',
    [WHATSAPP_SAFE_EMOJIS.PHONE_RECEIVER]: 'Call:',
    [WHATSAPP_SAFE_EMOJIS.CALENDAR]: 'Schedule:',
    [WHATSAPP_SAFE_EMOJIS.LOCATION_PIN]: 'Location:',
    [WHATSAPP_SAFE_EMOJIS.MONEY_BAG]: 'Quote:',
    [WHATSAPP_SAFE_EMOJIS.TRIANGULAR_RULER]: 'Measure:',
};

/**
 * Service-specific emoji mappings
 */
export const SERVICE_EMOJIS = {
    CAR_AC: WHATSAPP_SAFE_EMOJIS.CAR,
    HOME_HEATING_COOLING: WHATSAPP_SAFE_EMOJIS.HOUSE,
    OFFICE_CLIMATE: WHATSAPP_SAFE_EMOJIS.OFFICE,
    PORTABLE_HIRE: WHATSAPP_SAFE_EMOJIS.WRENCH,
    GAS_HEATER_HIRE: WHATSAPP_SAFE_EMOJIS.HOUSE,
    WHIRLYBIRD: WHATSAPP_SAFE_EMOJIS.HOUSE,
    EXTRACTOR_FAN: WHATSAPP_SAFE_EMOJIS.OFFICE,
    GENERAL: WHATSAPP_SAFE_EMOJIS.WRENCH,
};

/**
 * Priority level emoji mappings
 */
export const PRIORITY_EMOJIS = {
    LOW: WHATSAPP_SAFE_EMOJIS.GREEN_CIRCLE,
    NORMAL: WHATSAPP_SAFE_EMOJIS.YELLOW_CIRCLE,
    HIGH: WHATSAPP_SAFE_EMOJIS.ORANGE_CIRCLE,
    URGENT: WHATSAPP_SAFE_EMOJIS.RED_CIRCLE,
};

/**
 * Business workflow emoji mappings
 */
export const WORKFLOW_EMOJIS = {
    CUSTOMER_INFO: WHATSAPP_SAFE_EMOJIS.PERSON,
    EMAIL_INFO: WHATSAPP_SAFE_EMOJIS.EMAIL,
    PHONE_INFO: WHATSAPP_SAFE_EMOJIS.MOBILE_PHONE,
    SERVICE_INFO: WHATSAPP_SAFE_EMOJIS.WRENCH,
    MESSAGE_CONTENT: WHATSAPP_SAFE_EMOJIS.SPEECH_BUBBLE,
    TIMESTAMP: WHATSAPP_SAFE_EMOJIS.CLOCK,
    LEAD_INFO: WHATSAPP_SAFE_EMOJIS.CLIPBOARD,
    QUICK_ACTIONS: WHATSAPP_SAFE_EMOJIS.LIGHTNING,
    CALL_ACTION: WHATSAPP_SAFE_EMOJIS.PHONE_RECEIVER,
    SCHEDULE_ACTION: WHATSAPP_SAFE_EMOJIS.CALENDAR,
    LOCATION_ACTION: WHATSAPP_SAFE_EMOJIS.LOCATION_PIN,
    QUOTE_ACTION: WHATSAPP_SAFE_EMOJIS.MONEY_BAG,
    MEASURE_ACTION: WHATSAPP_SAFE_EMOJIS.TRIANGULAR_RULER,
};

/**
 * Helper function to get all supported emojis as an array
 */
export function getAllSupportedEmojis() {
    return Object.values(WHATSAPP_SAFE_EMOJIS);
}

/**
 * Helper function to check if an emoji is supported
 */
export function isEmojiSupported(emoji) {
    return Object.values(WHATSAPP_SAFE_EMOJIS).includes(emoji);
}

/**
 * Helper function to get emoji by service type
 */
export function getServiceEmoji(serviceType) {
    const normalizedType = serviceType.toUpperCase().replace(/[^A-Z]/g, '_');
    return SERVICE_EMOJIS[normalizedType] || SERVICE_EMOJIS.GENERAL;
}

/**
 * Helper function to get emoji by priority level
 */
export function getPriorityEmoji(priority) {
    const normalizedPriority = priority.toUpperCase();
    return PRIORITY_EMOJIS[normalizedPriority] || PRIORITY_EMOJIS.NORMAL;
}