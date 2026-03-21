# Requirements Document

## Introduction

The ProAir Zimbabwe booking system enhancement addresses critical issues with the current WhatsApp contact form integration and improves the overall lead management experience for the business team. The current system suffers from emoji encoding problems that render messages unprofessional and difficult to process, while lacking essential business workflow features for effective lead management.

## Glossary

- **Contact_Form**: The web-based form on proairzw.co.zw/contact.html that captures customer enquiries
- **WhatsApp_Integration**: The system that formats and sends customer enquiries to the business WhatsApp number
- **Business_Team**: ProAir Zimbabwe staff members who receive and process customer enquiries
- **Lead**: A potential customer enquiry submitted through the contact form
- **Message_Formatter**: The component responsible for creating properly formatted WhatsApp messages
- **Emoji_Encoder**: The component that ensures emojis display correctly across different platforms
- **Lead_Tracker**: The system component that helps business team track and manage enquiries
- **Service_Categories**: The predefined list of ProAir Zimbabwe services (Car A/C, Home/Office Climate Control, Portable Hire, Ventilation)

## Requirements

### Requirement 1: Fix Emoji Display Issues

**User Story:** As a business team member, I want to receive properly formatted WhatsApp messages with correct emoji display, so that I can quickly identify and process customer enquiries professionally.

#### Acceptance Criteria

1. WHEN a customer submits the contact form, THE Message_Formatter SHALL encode all emojis using Unicode escape sequences compatible with WhatsApp
2. THE Emoji_Encoder SHALL convert emoji characters to their proper Unicode representations before message transmission
3. WHEN the business team receives a WhatsApp message, THE system SHALL ensure all emojis display correctly without question mark (�) characters
4. THE Message_Formatter SHALL use only emojis that are universally supported across WhatsApp platforms
5. IF emoji encoding fails, THEN THE system SHALL fall back to text-based symbols (e.g., ">" instead of "🔵")

### Requirement 2: Enhance Message Professional Formatting

**User Story:** As a business team member, I want to receive well-structured enquiry messages, so that I can quickly extract key information and respond appropriately.

#### Acceptance Criteria

1. THE Message_Formatter SHALL structure messages with clear sections for contact details, service type, and customer message
2. WHEN formatting contact information, THE Message_Formatter SHALL use consistent labeling and spacing
3. THE Message_Formatter SHALL include a timestamp for when the enquiry was submitted
4. THE Message_Formatter SHALL add urgency indicators for high-priority services (e.g., emergency repairs)
5. THE Message_Formatter SHALL include the customer's preferred contact method if specified

### Requirement 3: Implement Lead Tracking System

**User Story:** As a business team member, I want to track the status of customer enquiries, so that I can ensure no leads are lost and follow up appropriately.

#### Acceptance Criteria

1. WHEN a customer submits an enquiry, THE Lead_Tracker SHALL generate a unique reference number
2. THE Lead_Tracker SHALL include the reference number in the WhatsApp message to the business team
3. THE system SHALL provide a way for business team to mark leads as "contacted", "quoted", "won", or "lost"
4. WHEN a lead status changes, THE Lead_Tracker SHALL record the timestamp and status change
5. THE Lead_Tracker SHALL provide a simple interface for viewing all leads and their current status

### Requirement 4: Service-Specific Message Enhancement

**User Story:** As a business team member, I want to receive service-specific information in enquiries, so that I can prepare appropriate responses and quotes.

#### Acceptance Criteria

1. WHEN a customer selects "Car A/C Regas & Service", THE Message_Formatter SHALL include relevant questions about vehicle make/model and symptoms
2. WHEN a customer selects home or office services, THE Message_Formatter SHALL include property size and location details
3. WHEN a customer selects portable hire services, THE Message_Formatter SHALL include rental duration and delivery requirements
4. THE Message_Formatter SHALL provide service-specific icons or identifiers for quick visual recognition
5. WHERE no specific service is selected, THE Message_Formatter SHALL categorize as "General Enquiry" with standard formatting

### Requirement 5: Business Response Workflow Integration

**User Story:** As a business team member, I want quick action buttons in WhatsApp messages, so that I can respond to customers efficiently without switching applications.

#### Acceptance Criteria

1. THE Message_Formatter SHALL include pre-formatted response templates for common scenarios
2. WHEN the business team needs to request more information, THE system SHALL provide template messages for missing details
3. THE Message_Formatter SHALL include the customer's phone number as a clickable link for direct calling
4. THE system SHALL provide quick quote templates based on the selected service category
5. THE Message_Formatter SHALL include a link back to the customer's original enquiry for reference

### Requirement 6: Error Handling and Fallback Mechanisms

**User Story:** As a customer, I want to be notified if my enquiry fails to send, so that I can try alternative contact methods.

#### Acceptance Criteria

1. IF the WhatsApp integration fails, THEN THE system SHALL display an error message with alternative contact options
2. WHEN WhatsApp is unavailable, THE system SHALL provide fallback options including direct phone numbers and email
3. THE system SHALL log all failed message attempts for business team review
4. IF message formatting fails, THEN THE system SHALL send a simplified text-only version
5. THE system SHALL provide a retry mechanism for failed submissions

### Requirement 7: Message Parsing and Data Extraction

**User Story:** As a business team member, I want structured data from customer enquiries, so that I can quickly enter information into our CRM or quoting system.

#### Acceptance Criteria

1. THE Message_Formatter SHALL structure data in a consistent format that can be easily copied
2. WHEN creating messages, THE system SHALL separate contact details from enquiry details for easy extraction
3. THE Message_Formatter SHALL format phone numbers consistently for easy dialing
4. THE system SHALL provide email addresses in a format that can be easily copied for follow-up
5. THE Message_Formatter SHALL include service codes or categories that match internal business systems

### Requirement 8: Multi-Platform Compatibility Testing

**User Story:** As a business team member, I want messages to display correctly on all devices, so that I can process enquiries regardless of which device I'm using.

#### Acceptance Criteria

1. THE system SHALL test message formatting on WhatsApp Web, iOS WhatsApp, and Android WhatsApp
2. WHEN messages are sent, THE Emoji_Encoder SHALL ensure compatibility across all major WhatsApp platforms
3. THE Message_Formatter SHALL maintain consistent formatting regardless of the receiving device
4. THE system SHALL validate that clickable links work correctly on all platforms
5. IF platform-specific issues are detected, THEN THE system SHALL adjust formatting accordingly