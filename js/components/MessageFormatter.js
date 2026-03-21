/* ============================================
   ProAir Zimbabwe — Message Formatter
   Structured WhatsApp Message Formatting
   ============================================ */

import EmojiEncoder from './EmojiEncoder.js';

/**
 * MessageFormatter creates professionally structured WhatsApp messages
 * with consistent formatting, emoji encoding, and business workflow integration.
 */
class MessageFormatter {
    
    /**
     * Format a customer enquiry into a structured WhatsApp message
     * @param {Object} leadData - Customer enquiry data
     * @param {string} leadData.name - Customer name
     * @param {string} leadData.email - Customer email
     * @param {string} leadData.phone - Customer phone number
     * @param {string} leadData.service - Selected service type
     * @param {string} leadData.message - Customer message
     * @param {string} [leadData.preferredContact] - Preferred contact method
     * @param {string} [leadData.id] - Lead reference ID
     * @param {Date} [leadData.timestamp] - Submission timestamp
     * @returns {string} Formatted WhatsApp message
     */
    static formatEnquiry(leadData) {
        // Validate required fields
        if (!leadData || !leadData.name || !leadData.email || !leadData.phone) {
            throw new Error('Missing required customer information');
        }

        // Generate timestamp if not provided
        const timestamp = leadData.timestamp || new Date();
        
        // Generate lead ID if not provided (fallback format)
        const leadId = leadData.id || this._generateFallbackLeadId(timestamp);
        
        // Detect urgency from message content
        const urgency = this._detectUrgency(leadData.message || '');
        
        // Build message sections
        let message = '';
        
        // Header section with urgency indicator
        message += this._buildHeader(leadData.service, urgency);
        message += '\n━━━━━━━━━━━━━━━━━━\n\n';
        
        // Customer information section
        message += this._buildCustomerSection(leadData);
        message += '\n';
        
        // Service information section
        message += this._buildServiceSection(leadData.service, urgency);
        message += '\n';
        
        // Customer message section
        message += this._buildMessageSection(leadData.message || 'No message provided');
        message += '\n';
        
        // Lead information section
        message += this._buildLeadSection(leadId, timestamp);
        message += '\n';
        
        // Quick actions section
        message += this._buildQuickActionsSection(leadData.service);
        
        // Footer
        message += '\n━━━━━━━━━━━━━━━━━━\n';
        message += '_ProAir Zimbabwe Lead Management System_';
        
        // Encode emojis for WhatsApp compatibility
        return EmojiEncoder.encodeWithFallback(message);
    }

    /**
     * Format contact information with consistent labeling and spacing
     * @param {Object} contactData - Contact information
     * @param {string} contactData.name - Customer name
     * @param {string} contactData.email - Customer email
     * @param {string} contactData.phone - Customer phone number
     * @param {string} [contactData.preferredContact] - Preferred contact method
     * @returns {string} Formatted contact information
     */
    static formatContactInfo(contactData) {
        if (!contactData || !contactData.name || !contactData.email || !contactData.phone) {
            throw new Error('Missing required contact information');
        }

        let contactInfo = '👤 *Customer Details:*\n';
        contactInfo += `Name: ${contactData.name}\n`;
        contactInfo += `📧 Email: ${contactData.email}\n`;
        contactInfo += `📱 Phone: ${contactData.phone}\n`;
        
        if (contactData.preferredContact) {
            contactInfo += `Preferred Contact: ${contactData.preferredContact}\n`;
        }
        
        return EmojiEncoder.encodeWithFallback(contactInfo);
    }

    /**
     * Detect urgency level from message content using keyword matching
     * @param {string} message - Customer message to analyze
     * @returns {string} Urgency level: 'urgent', 'high', 'normal', or 'low'
     */
    static detectUrgency(message) {
        if (!message || typeof message !== 'string') {
            return 'normal';
        }
        
        return this._detectUrgency(message);
    }

    /**
     * Format priority level with appropriate emoji indicators
     * @param {string} priority - Priority level ('urgent', 'high', 'normal', 'low')
     * @returns {string} Formatted priority with emoji indicator
     */
    static formatPriority(priority) {
        if (!priority || typeof priority !== 'string') {
            return '🟡 NORMAL';
        }
        
        return this._formatPriority(priority);
    }

    /**
     * Build the message header with service type and urgency
     * @private
     * @param {string} service - Service type
     * @param {string} urgency - Urgency level
     * @returns {string} Formatted header
     */
    static _buildHeader(service, urgency) {
        const serviceIcon = this._getServiceIcon(service);
        const urgencyPrefix = urgency === 'urgent' ? '🔴 ' : '';
        
        return `${urgencyPrefix}${serviceIcon} *ProAir Zimbabwe — ${service || 'General Enquiry'}*`;
    }

    /**
     * Build the customer information section
     * @private
     * @param {Object} leadData - Lead data containing customer info
     * @returns {string} Formatted customer section
     */
    static _buildCustomerSection(leadData) {
        let section = '👤 *Customer Details:*\n';
        section += `Name: ${leadData.name}\n`;
        section += `📧 Email: ${leadData.email}\n`;
        section += `📱 Phone: ${leadData.phone}\n`;
        
        if (leadData.preferredContact) {
            section += `Preferred Contact: ${leadData.preferredContact}\n`;
        }
        
        return section;
    }

    /**
     * Build the service information section
     * @private
     * @param {string} service - Service type
     * @param {string} urgency - Urgency level
     * @returns {string} Formatted service section
     */
    static _buildServiceSection(service, urgency) {
        let section = '🔧 *Service Details:*\n';
        section += `Type: ${service || 'General Enquiry'}\n`;
        section += `Category: ${this._getServiceCategory(service)}\n`;
        section += `Priority: ${this._formatPriority(urgency)}\n`;
        
        return section;
    }

    /**
     * Build the customer message section
     * @private
     * @param {string} message - Customer message
     * @returns {string} Formatted message section
     */
    static _buildMessageSection(message) {
        return `💬 *Customer Message:*\n${message}\n`;
    }

    /**
     * Build the lead information section
     * @private
     * @param {string} leadId - Lead reference ID
     * @param {Date} timestamp - Submission timestamp
     * @returns {string} Formatted lead section
     */
    static _buildLeadSection(leadId, timestamp) {
        let section = '📋 *Lead Information:*\n';
        section += `Reference: ${leadId}\n`;
        section += `Submitted: ${this._formatTimestamp(timestamp)}\n`;
        section += `Source: Website Contact Form\n`;
        
        return section;
    }

    /**
     * Build the quick actions section
     * @private
     * @param {string} service - Service type
     * @returns {string} Formatted quick actions section
     */
    static _buildQuickActionsSection(service) {
        const actions = this._getServiceActions(service);
        
        let section = '⚡ *Quick Actions:*\n';
        actions.forEach(action => {
            section += `• ${action}\n`;
        });
        
        return section;
    }

    /**
     * Detect urgency from message content
     * @private
     * @param {string} message - Customer message
     * @returns {string} Urgency level: 'urgent', 'high', 'normal', or 'low'
     */
    static _detectUrgency(message) {
        const messageText = message.toLowerCase();
        
        // Urgent keywords
        const urgentKeywords = ['emergency', 'urgent', 'broken', 'not working', 'no cooling', 'no heating', 'stopped working'];
        if (urgentKeywords.some(keyword => messageText.includes(keyword))) {
            return 'urgent';
        }
        
        // High priority keywords
        const highKeywords = ['asap', 'soon', 'quickly', 'fast', 'priority', 'important'];
        if (highKeywords.some(keyword => messageText.includes(keyword))) {
            return 'high';
        }
        
        return 'normal';
    }

    /**
     * Format priority level with appropriate emoji and text
     * @private
     * @param {string} urgency - Urgency level
     * @returns {string} Formatted priority
     */
    static _formatPriority(urgency) {
        const priorityMap = {
            'urgent': '🔴 URGENT',
            'high': '🟠 HIGH',
            'normal': '🟡 NORMAL',
            'low': '🟢 LOW'
        };
        
        return priorityMap[urgency] || '🟡 NORMAL';
    }

    /**
     * Get service-specific icon
     * @private
     * @param {string} service - Service type
     * @returns {string} Service icon emoji
     */
    static _getServiceIcon(service) {
        if (!service) return '🔧';
        
        const serviceText = service.toLowerCase();
        
        if (serviceText.includes('car') || serviceText.includes('automotive')) {
            return '🚗';
        } else if (serviceText.includes('home') || serviceText.includes('residential')) {
            return '🏠';
        } else if (serviceText.includes('office') || serviceText.includes('commercial')) {
            return '🏢';
        } else if (serviceText.includes('portable') || serviceText.includes('hire')) {
            return '📦';
        }
        
        return '🔧';
    }

    /**
     * Get service category for classification
     * @private
     * @param {string} service - Service type
     * @returns {string} Service category
     */
    static _getServiceCategory(service) {
        if (!service) return 'General';
        
        const serviceText = service.toLowerCase();
        
        if (serviceText.includes('car') || serviceText.includes('automotive')) {
            return 'Automotive A/C';
        } else if (serviceText.includes('home') || serviceText.includes('residential')) {
            return 'Residential Climate';
        } else if (serviceText.includes('office') || serviceText.includes('commercial')) {
            return 'Commercial Climate';
        } else if (serviceText.includes('portable') || serviceText.includes('hire')) {
            return 'Equipment Hire';
        } else if (serviceText.includes('ventilation') || serviceText.includes('extractor')) {
            return 'Ventilation';
        }
        
        return 'General';
    }

    /**
     * Get service-specific quick actions
     * @private
     * @param {string} service - Service type
     * @returns {string[]} Array of quick action items
     */
    static _getServiceActions(service) {
        const defaultActions = [
            '📞 Call customer',
            '📧 Send follow-up email',
            '📋 Prepare quote',
            '📅 Schedule appointment'
        ];
        
        if (!service) return defaultActions;
        
        const serviceText = service.toLowerCase();
        
        if (serviceText.includes('car') || serviceText.includes('automotive')) {
            return [
                '📞 Call customer',
                '🔧 Check parts availability',
                '📋 Prepare diagnostic quote',
                '📅 Schedule workshop appointment'
            ];
        } else if (serviceText.includes('home') || serviceText.includes('office')) {
            return [
                '📞 Call customer',
                '📍 Schedule site visit',
                '📐 Prepare measurement tools',
                '💰 Calculate installation quote'
            ];
        } else if (serviceText.includes('portable') || serviceText.includes('hire')) {
            return [
                '📞 Call customer',
                '📦 Check equipment availability',
                '🚚 Arrange delivery',
                '💰 Prepare hire quote'
            ];
        }
        
        return defaultActions;
    }

    /**
     * Format timestamp for display
     * @private
     * @param {Date} timestamp - Date object
     * @returns {string} Formatted timestamp
     */
    static _formatTimestamp(timestamp) {
        if (!timestamp || !(timestamp instanceof Date)) {
            return new Date().toLocaleString('en-ZW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        }
        
        return timestamp.toLocaleString('en-ZW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    /**
     * Generate fallback lead ID when none provided
     * @private
     * @param {Date} timestamp - Submission timestamp
     * @returns {string} Fallback lead ID
     */
    static _generateFallbackLeadId(timestamp) {
        const date = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
        const time = timestamp.getTime().toString().slice(-4);
        return `PA-${date}-${time}`;
    }
}

// ES6 export for modern modules
export default MessageFormatter;

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.MessageFormatter = MessageFormatter;
}