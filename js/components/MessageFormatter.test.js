/* ============================================
   ProAir Zimbabwe — Message Formatter Tests
   Unit Tests for MessageFormatter Class
   ============================================ */

import { describe, test, expect, vi } from 'vitest';
import fc from 'fast-check';
import MessageFormatter from './MessageFormatter.js';
import EmojiEncoder from './EmojiEncoder.js';

describe('MessageFormatter', () => {
    
    describe('formatEnquiry', () => {
        test('should format basic enquiry with all required fields', () => {
            const leadData = {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '0779123456',
                service: 'Car A/C Service',
                message: 'My car air conditioning is not cooling properly',
                timestamp: new Date('2024-01-15T10:30:00Z'),
                id: 'PA-20240115-0001'
            };

            const result = MessageFormatter.formatEnquiry(leadData);

            // Check that all sections are present
            expect(result).toContain('ProAir Zimbabwe — Car A/C Service');
            expect(result).toContain('Customer Details:');
            expect(result).toContain('John Doe');
            expect(result).toContain('john@example.com');
            expect(result).toContain('0779123456');
            expect(result).toContain('Service Details:');
            expect(result).toContain('Customer Message:');
            expect(result).toContain('Lead Information:');
            expect(result).toContain('PA-20240115-0001');
            expect(result).toContain('Quick Actions:');
        });

        test('should handle missing optional fields gracefully', () => {
            const leadData = {
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '0779654321',
                message: 'Need help with heating'
            };

            const result = MessageFormatter.formatEnquiry(leadData);

            expect(result).toContain('Jane Smith');
            expect(result).toContain('General Enquiry');
            expect(result).toContain('Need help with heating');
            // Should generate fallback lead ID and timestamp
            expect(result).toMatch(/PA-\d{8}-\d{4}/);
        });

        test('should throw error for missing required fields', () => {
            expect(() => {
                MessageFormatter.formatEnquiry({});
            }).toThrow('Missing required customer information');

            expect(() => {
                MessageFormatter.formatEnquiry({
                    name: 'John Doe'
                    // Missing email and phone
                });
            }).toThrow('Missing required customer information');
        });

        test('should detect urgency and add urgent indicator', () => {
            const urgentData = {
                name: 'Emergency Customer',
                email: 'emergency@example.com',
                phone: '0779999999',
                service: 'Car A/C Service',
                message: 'EMERGENCY - my car air conditioning is broken and not working at all'
            };

            const result = MessageFormatter.formatEnquiry(urgentData);

            expect(result).toContain('URGENT');
            expect(result).toContain('\\u{1F534}'); // Unicode for red circle
        });

        test('should include preferred contact method when provided', () => {
            const leadData = {
                name: 'Contact Preference Customer',
                email: 'contact@example.com',
                phone: '0779111111',
                service: 'Home Heating',
                message: 'Please contact me',
                preferredContact: 'WhatsApp'
            };

            const result = MessageFormatter.formatEnquiry(leadData);

            expect(result).toContain('Preferred Contact: WhatsApp');
        });
    });

    describe('formatContactInfo', () => {
        test('should format contact information with consistent structure', () => {
            const contactData = {
                name: 'Test Customer',
                email: 'test@example.com',
                phone: '0779000000'
            };

            const result = MessageFormatter.formatContactInfo(contactData);

            expect(result).toContain('Customer Details:');
            expect(result).toContain('Name: Test Customer');
            expect(result).toContain('Email: test@example.com');
            expect(result).toContain('Phone: 0779000000');
        });

        test('should include preferred contact method when provided', () => {
            const contactData = {
                name: 'Preferred Customer',
                email: 'preferred@example.com',
                phone: '0779222222',
                preferredContact: 'Email'
            };

            const result = MessageFormatter.formatContactInfo(contactData);

            expect(result).toContain('Preferred Contact: Email');
        });

        test('should throw error for missing required contact fields', () => {
            expect(() => {
                MessageFormatter.formatContactInfo({});
            }).toThrow('Missing required contact information');

            expect(() => {
                MessageFormatter.formatContactInfo({
                    name: 'Incomplete Customer'
                    // Missing email and phone
                });
            }).toThrow('Missing required contact information');
        });
    });

    describe('urgency detection', () => {
        test('should detect urgent keywords', () => {
            const urgentMessages = [
                'This is an emergency situation',
                'My AC is broken and not working',
                'URGENT repair needed',
                'No cooling at all - stopped working'
            ];

            urgentMessages.forEach(message => {
                const leadData = {
                    name: 'Test',
                    email: 'test@example.com',
                    phone: '0779000000',
                    message: message
                };

                const result = MessageFormatter.formatEnquiry(leadData);
                expect(result).toContain('URGENT');
            });
        });

        test('should detect high priority keywords', () => {
            const highPriorityMessages = [
                'Need this done ASAP please',
                'Can you fix this quickly?',
                'This is high priority for us',
                'Important repair needed soon'
            ];

            highPriorityMessages.forEach(message => {
                const leadData = {
                    name: 'Test',
                    email: 'test@example.com',
                    phone: '0779000000',
                    message: message
                };

                const result = MessageFormatter.formatEnquiry(leadData);
                expect(result).toContain('HIGH');
            });
        });

        test('should default to normal priority for regular messages', () => {
            const normalMessage = {
                name: 'Test',
                email: 'test@example.com',
                phone: '0779000000',
                message: 'I would like to schedule a service appointment'
            };

            const result = MessageFormatter.formatEnquiry(normalMessage);
            expect(result).toContain('NORMAL');
        });
    });

    describe('service categorization', () => {
        test('should categorize car services correctly', () => {
            const carService = {
                name: 'Car Owner',
                email: 'car@example.com',
                phone: '0779000000',
                service: 'Car A/C Regas & Service'
            };

            const result = MessageFormatter.formatEnquiry(carService);
            expect(result).toContain('Automotive A/C');
            expect(result).toContain('\\u{1F697}'); // Unicode for car emoji
        });

        test('should categorize home services correctly', () => {
            const homeService = {
                name: 'Home Owner',
                email: 'home@example.com',
                phone: '0779000000',
                service: 'Home Heating & Cooling'
            };

            const result = MessageFormatter.formatEnquiry(homeService);
            expect(result).toContain('Residential Climate');
            expect(result).toContain('\\u{1F3E0}'); // Unicode for house emoji
        });

        test('should categorize office services correctly', () => {
            const officeService = {
                name: 'Office Manager',
                email: 'office@example.com',
                phone: '0779000000',
                service: 'Office Climate Control'
            };

            const result = MessageFormatter.formatEnquiry(officeService);
            expect(result).toContain('Commercial Climate');
            expect(result).toContain('\\u{1F3E2}'); // Unicode for office building emoji
        });

        test('should categorize portable hire services correctly', () => {
            const hireService = {
                name: 'Event Organizer',
                email: 'hire@example.com',
                phone: '0779000000',
                service: 'Portable Heater Hire'
            };

            const result = MessageFormatter.formatEnquiry(hireService);
            expect(result).toContain('Equipment Hire');
        });

        test('should default to general category for unknown services', () => {
            const generalService = {
                name: 'General Customer',
                email: 'general@example.com',
                phone: '0779000000',
                service: 'Unknown Service Type'
            };

            const result = MessageFormatter.formatEnquiry(generalService);
            expect(result).toContain('General');
        });
    });

    describe('timestamp formatting', () => {
        test('should format timestamp correctly', () => {
            const testDate = new Date('2024-01-15T14:30:00Z');
            const leadData = {
                name: 'Time Test',
                email: 'time@example.com',
                phone: '0779000000',
                timestamp: testDate
            };

            const result = MessageFormatter.formatEnquiry(leadData);
            
            // Should contain formatted date and time (dd/mm/yyyy, hh:mm format)
            expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/); // Date format
            expect(result).toMatch(/\d{2}:\d{2}/); // Time format
        });

        test('should generate timestamp when none provided', () => {
            const leadData = {
                name: 'No Time',
                email: 'notime@example.com',
                phone: '0779000000'
            };

            const result = MessageFormatter.formatEnquiry(leadData);
            
            // Should contain some timestamp (dd/mm/yyyy format)
            expect(result).toMatch(/Submitted: \d{2}\/\d{2}\/\d{4}/);
        });
    });

    describe('quick actions', () => {
        test('should provide car-specific actions for automotive services', () => {
            const carData = {
                name: 'Car Customer',
                email: 'car@example.com',
                phone: '0779000000',
                service: 'Car A/C Service'
            };

            const result = MessageFormatter.formatEnquiry(carData);
            
            expect(result).toContain('Check parts availability');
            expect(result).toContain('diagnostic quote');
            expect(result).toContain('workshop appointment');
        });

        test('should provide home/office-specific actions for climate services', () => {
            const homeData = {
                name: 'Home Customer',
                email: 'home@example.com',
                phone: '0779000000',
                service: 'Home Climate Control'
            };

            const result = MessageFormatter.formatEnquiry(homeData);
            
            expect(result).toContain('Schedule site visit');
            expect(result).toContain('measurement tools');
            expect(result).toContain('installation quote');
        });

        test('should provide hire-specific actions for rental services', () => {
            const hireData = {
                name: 'Hire Customer',
                email: 'hire@example.com',
                phone: '0779000000',
                service: 'Portable Equipment Hire'
            };

            const result = MessageFormatter.formatEnquiry(hireData);
            
            expect(result).toContain('Check equipment availability');
            expect(result).toContain('Arrange delivery');
            expect(result).toContain('hire quote');
        });
    });

    describe('emoji encoding integration', () => {
        test('should encode emojis using EmojiEncoder', () => {
            const leadData = {
                name: 'Emoji Test',
                email: 'emoji@example.com',
                phone: '0779000000',
                service: 'Test Service'
            };

            // Mock EmojiEncoder to verify it's called
            const originalEncode = EmojiEncoder.encodeWithFallback;
            const mockEncode = vi.fn().mockReturnValue('encoded message');
            EmojiEncoder.encodeWithFallback = mockEncode;

            MessageFormatter.formatEnquiry(leadData);

            expect(mockEncode).toHaveBeenCalled();
            
            // Restore original function
            EmojiEncoder.encodeWithFallback = originalEncode;
        });
    });

    describe('lead ID generation', () => {
        test('should generate fallback lead ID when none provided', () => {
            const leadData = {
                name: 'No ID Customer',
                email: 'noid@example.com',
                phone: '0779000000'
            };

            const result = MessageFormatter.formatEnquiry(leadData);
            
            // Should contain PA-YYYYMMDD-XXXX format
            expect(result).toMatch(/PA-\d{8}-\d{4}/);
        });

        test('should use provided lead ID when available', () => {
            const leadData = {
                name: 'Has ID Customer',
                email: 'hasid@example.com',
                phone: '0779000000',
                id: 'PA-20240115-9999'
            };

            const result = MessageFormatter.formatEnquiry(leadData);
            
            expect(result).toContain('PA-20240115-9999');
        });
    });
});

// ============================================
// Property-Based Tests
// ============================================

// Helper: constructive lead ID generator (fast, no filtering)
const digits = ['0','1','2','3','4','5','6','7','8','9'];
const leadIdArb = fc.tuple(
    fc.array(fc.constantFrom(...digits), { minLength: 8, maxLength: 8 }).map(a => a.join('')),
    fc.array(fc.constantFrom(...digits), { minLength: 4, maxLength: 4 }).map(a => a.join(''))
).map(([d, s]) => `PA-${d}-${s}`);

// Helper: constructive phone generator
const phoneArb = fc.array(fc.constantFrom(...digits), { minLength: 10, maxLength: 13 }).map(a => a.join(''));

// Helper: bounded date generator (reasonable year range)
const dateArb = fc.date({ min: new Date('2000-01-01'), max: new Date('2030-12-31') });

describe('MessageFormatter - Property Tests', () => {
    
    // Property 2: Message Structure Consistency
    // **Validates: Requirements 2.1, 7.2**
    test('Property 2: Message Structure Consistency', () => {
        fc.assert(fc.property(
            fc.record({
                name: fc.string({ minLength: 1, maxLength: 50 }),
                email: fc.emailAddress(),
                phone: phoneArb,
                service: fc.oneof(
                    fc.constant('Car A/C Service'),
                    fc.constant('Home Heating & Cooling'),
                    fc.constant('Office Climate Control'),
                    fc.constant('Portable Equipment Hire'),
                    fc.constant('General Enquiry')
                ),
                message: fc.string({ minLength: 1, maxLength: 100 }),
                id: fc.option(leadIdArb),
                timestamp: fc.option(dateArb)
            }),
            (leadData) => {
                const formatted = MessageFormatter.formatEnquiry(leadData);
                
                // Should have clearly separated sections for contact details
                expect(formatted).toMatch(/Customer Details:/);
                expect(formatted).toContain(`Name: ${leadData.name}`);
                expect(formatted).toContain(`Email: ${leadData.email}`);
                expect(formatted).toContain(`Phone: ${leadData.phone}`);
                
                // Should have clearly separated sections for service information
                expect(formatted).toMatch(/Service Details:/);
                expect(formatted).toMatch(/Type:/);
                expect(formatted).toMatch(/Category:/);
                expect(formatted).toMatch(/Priority:/);
                
                // Should have clearly separated sections for customer message content
                expect(formatted).toMatch(/Customer Message:/);
                expect(formatted).toContain(leadData.message);
                
                // Should have lead information section for easy extraction
                expect(formatted).toMatch(/Lead Information:/);
                expect(formatted).toMatch(/Reference:/);
                expect(formatted).toMatch(/Submitted:/);
                
                // Should have quick actions section
                expect(formatted).toMatch(/Quick Actions:/);
            }
        ), { numRuns: 5 });
    });

    // Property 3: Formatting Consistency
    // **Validates: Requirements 2.2, 7.1**
    test('Property 3: Formatting Consistency', () => {
        fc.assert(fc.property(
            fc.array(
                fc.record({
                    name: fc.string({ minLength: 1, maxLength: 50 }),
                    email: fc.emailAddress(),
                    phone: phoneArb,
                    service: fc.oneof(
                        fc.constant('Car A/C Service'),
                        fc.constant('Home Heating & Cooling'),
                        fc.constant('Office Climate Control'),
                        fc.constant('Portable Equipment Hire')
                    ),
                    message: fc.string({ minLength: 1, maxLength: 100 }),
                    id: fc.option(leadIdArb),
                    timestamp: fc.option(fc.date())
                }),
                { minLength: 2, maxLength: 3 }
            ),
            (leadDataArray) => {
                const formattedMessages = leadDataArray.map(leadData => 
                    MessageFormatter.formatEnquiry(leadData)
                );
                
                // All messages should use consistent labeling
                formattedMessages.forEach(message => {
                    expect(message).toMatch(/Customer Details:/);
                    expect(message).toMatch(/Name:/);
                    expect(message).toMatch(/Email:/);
                    expect(message).toMatch(/Phone:/);
                    expect(message).toMatch(/Service Details:/);
                    expect(message).toMatch(/Type:/);
                    expect(message).toMatch(/Category:/);
                    expect(message).toMatch(/Priority:/);
                    expect(message).toMatch(/Customer Message:/);
                    expect(message).toMatch(/Lead Information:/);
                    expect(message).toMatch(/Reference:/);
                    expect(message).toMatch(/Submitted:/);
                    expect(message).toMatch(/Quick Actions:/);
                });
                
                // All messages should use consistent spacing (double newlines between sections)
                formattedMessages.forEach(message => {
                    const sections = message.split('\n\n');
                    expect(sections.length).toBeGreaterThan(3); // Should have multiple sections
                });
                
                // All messages should use consistent data formatting for structured data
                formattedMessages.forEach(message => {
                    // Phone numbers should be in consistent format (no special formatting required)
                    expect(message).toMatch(/Phone: [0-9+\-\s()]+/);
                    
                    // Email addresses should be in consistent format
                    expect(message).toMatch(/Email: [^\s]+@[^\s]+\.[^\s]+/);
                    
                    // Lead references should follow consistent format
                    expect(message).toMatch(/Reference: PA-\d{8}-\d{1,4}/);
                    
                    // Timestamps should be in consistent format
                    expect(message).toMatch(/Submitted: .+/);
                });
            }
        ), { numRuns: 5 });
    });

    // Property 7: Urgency Detection and Marking
    // **Validates: Requirements 2.4**
    test('Property 7: Urgency Detection and Marking', () => {
        const urgentKeywords = ['emergency', 'urgent', 'broken', 'not working', 'no cooling', 'no heating', 'stopped working'];
        const highKeywords = ['asap', 'soon', 'quickly', 'fast', 'priority', 'important'];

        // Test that urgent keywords always produce 'urgent' level
        fc.assert(fc.property(
            fc.constantFrom(...urgentKeywords),
            fc.string({ minLength: 0, maxLength: 100 }),
            (keyword, padding) => {
                const message = `${padding} ${keyword} ${padding}`;
                const result = MessageFormatter.detectUrgency(message);
                expect(result).toBe('urgent');
            }
        ), { numRuns: 5 });

        // Test that high priority keywords (without urgent keywords) produce 'high' level
        fc.assert(fc.property(
            fc.constantFrom(...highKeywords),
            fc.string({ minLength: 0, maxLength: 50 }).filter(s => 
                !urgentKeywords.some(k => s.toLowerCase().includes(k))
            ),
            (keyword, padding) => {
                const message = `${padding} ${keyword} ${padding}`;
                const result = MessageFormatter.detectUrgency(message);
                expect(result).toBe('high');
            }
        ), { numRuns: 5 });

        // Test that messages without any priority keywords produce 'normal' level
        fc.assert(fc.property(
            fc.string({ minLength: 1, maxLength: 200 }).filter(s => {
                const lower = s.toLowerCase();
                return ![...urgentKeywords, ...highKeywords].some(k => lower.includes(k));
            }),
            (message) => {
                const result = MessageFormatter.detectUrgency(message);
                expect(result).toBe('normal');
            }
        ), { numRuns: 5 });
    });

    // Test that formatPriority returns correct emoji indicators
    test('Property 7b: Priority formatting always includes correct indicator', () => {
        const priorityExpectations = {
            'urgent': 'URGENT',
            'high': 'HIGH',
            'normal': 'NORMAL',
            'low': 'LOW'
        };

        fc.assert(fc.property(
            fc.constantFrom('urgent', 'high', 'normal', 'low'),
            (priority) => {
                const formatted = MessageFormatter.formatPriority(priority);
                expect(formatted).toContain(priorityExpectations[priority]);
            }
        ), { numRuns: 5 });
    });
});