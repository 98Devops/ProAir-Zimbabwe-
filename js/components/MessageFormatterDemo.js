/* ============================================
   ProAir Zimbabwe — Message Formatter Demo
   Demonstration of MessageFormatter functionality
   ============================================ */

import MessageFormatter from './MessageFormatter.js';

/**
 * Demo function to showcase MessageFormatter capabilities
 */
function demonstrateMessageFormatter() {
    console.log('=== ProAir Zimbabwe Message Formatter Demo ===\n');

    // Demo 1: Basic enquiry
    console.log('1. Basic Car A/C Enquiry:');
    const basicEnquiry = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '0779123456',
        service: 'Car A/C Regas & Service',
        message: 'My car air conditioning is not cooling properly. Need it checked.',
        timestamp: new Date('2024-01-15T10:30:00Z'),
        id: 'PA-20240115-0001'
    };
    console.log(MessageFormatter.formatEnquiry(basicEnquiry));
    console.log('\n' + '='.repeat(60) + '\n');

    // Demo 2: Urgent home service
    console.log('2. Urgent Home Heating Issue:');
    const urgentEnquiry = {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '0779987654',
        service: 'Home Heating & Cooling',
        message: 'EMERGENCY - Our heating system is broken and not working at all. Family with young children.',
        preferredContact: 'WhatsApp',
        timestamp: new Date(),
        id: 'PA-20240115-0002'
    };
    console.log(MessageFormatter.formatEnquiry(urgentEnquiry));
    console.log('\n' + '='.repeat(60) + '\n');

    // Demo 3: Office climate control
    console.log('3. Office Climate Control Request:');
    const officeEnquiry = {
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        phone: '0779555777',
        service: 'Office Climate Control',
        message: 'Looking for a quote to install air conditioning in our new office space. About 200 square meters.',
        preferredContact: 'Email'
    };
    console.log(MessageFormatter.formatEnquiry(officeEnquiry));
    console.log('\n' + '='.repeat(60) + '\n');

    // Demo 4: Portable equipment hire
    console.log('4. Portable Heater Hire:');
    const hireEnquiry = {
        name: 'Event Organizers Ltd',
        email: 'bookings@eventorg.co.zw',
        phone: '0779333444',
        service: 'Portable Heater Hire',
        message: 'Need to hire 5 portable heaters for outdoor event this weekend. Can you deliver?'
    };
    console.log(MessageFormatter.formatEnquiry(hireEnquiry));
    console.log('\n' + '='.repeat(60) + '\n');

    // Demo 5: Contact info formatting
    console.log('5. Contact Information Formatting:');
    const contactData = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '0779000000',
        preferredContact: 'Phone'
    };
    console.log(MessageFormatter.formatContactInfo(contactData));
    console.log('\n' + '='.repeat(60) + '\n');

    console.log('Demo completed! MessageFormatter is working correctly.');
}

// Run demo if this file is executed directly
if (typeof window !== 'undefined') {
    // Browser environment
    window.demonstrateMessageFormatter = demonstrateMessageFormatter;
    console.log('MessageFormatter demo loaded. Call demonstrateMessageFormatter() to run.');
} else {
    // Node.js environment
    demonstrateMessageFormatter();
}

export default demonstrateMessageFormatter;