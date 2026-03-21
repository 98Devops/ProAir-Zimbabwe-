/* ============================================
   ProAir Zimbabwe — EmojiEncoder Demo
   Demonstration of Unicode handling fix
   ============================================ */

import EmojiEncoder from './EmojiEncoder.js';

// Current message format from contact.js (with emoji issues)
const currentMessage = `🔵 *ProAir Zimbabwe — New Enquiry*
━━━━━━━━━━━━━━━━━━

👤 *Name:* John Doe
📧 *Email:* john@example.com
📱 *Phone:* 0779123456
🔧 *Service:* Car A/C Regas & Service

💬 *Message:*
My car's air conditioning is not working properly. It's blowing warm air instead of cold.

━━━━━━━━━━━━━━━━━━
_Sent from proairzw.co.zw_`;

console.log('=== EMOJI ENCODING DEMONSTRATION ===\n');

console.log('ORIGINAL MESSAGE (causes � characters in WhatsApp):');
console.log(currentMessage);
console.log('\n' + '='.repeat(50) + '\n');

console.log('ENCODED MESSAGE (Unicode sequences for WhatsApp compatibility):');
const encodedMessage = EmojiEncoder.encode(currentMessage);
console.log(encodedMessage);
console.log('\n' + '='.repeat(50) + '\n');

console.log('FALLBACK MESSAGE (text symbols if Unicode fails):');
const fallbackMessage = EmojiEncoder.encodeWithFallback(currentMessage);
console.log(fallbackMessage);
console.log('\n' + '='.repeat(50) + '\n');

console.log('SUPPORTED EMOJIS:');
console.log(EmojiEncoder.getSupportedEmojis().join(' '));
console.log('\n' + '='.repeat(50) + '\n');

console.log('EMOJI VALIDATION TESTS:');
console.log('🔵 is supported:', EmojiEncoder.validateCompatibility('🔵'));
console.log('👤 is supported:', EmojiEncoder.validateCompatibility('👤'));
console.log('🦄 is supported:', EmojiEncoder.validateCompatibility('🦄'));
console.log('\n' + '='.repeat(50) + '\n');

console.log('FALLBACK SYMBOLS:');
console.log('🔵 →', EmojiEncoder.getFallbackSymbol('🔵'));
console.log('👤 →', EmojiEncoder.getFallbackSymbol('👤'));
console.log('📧 →', EmojiEncoder.getFallbackSymbol('📧'));
console.log('🔧 →', EmojiEncoder.getFallbackSymbol('🔧'));

console.log('\n=== DEMONSTRATION COMPLETE ===');