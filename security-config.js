/**
 * Security Configuration for RCA Security Group Website
 * Implements security best practices and input validation
 */

// Input sanitization function
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Form validation
function validateContactForm(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Email validation
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Company validation (optional)
    if (formData.company && formData.company.length > 100) {
        errors.push('Company name must be less than 100 characters');
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (formData.message && formData.message.length > 2000) {
        errors.push('Message must be less than 2000 characters');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Rate limiting (simple client-side implementation)
const rateLimit = {
    attempts: {},
    maxAttempts: 5,
    timeWindow: 60000, // 1 minute
    
    check(identifier) {
        const now = Date.now();
        const userAttempts = this.attempts[identifier] || [];
        
        // Remove old attempts
        this.attempts[identifier] = userAttempts.filter(time => now - time < this.timeWindow);
        
        // Check if under limit
        if (this.attempts[identifier].length >= this.maxAttempts) {
            return false;
        }
        
        // Record this attempt
        this.attempts[identifier].push(now);
        return true;
    }
};

// CSRF token generation (simple implementation)
function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Secure form submission
function secureFormSubmission(form, callback) {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Sanitize all inputs
    Object.keys(data).forEach(key => {
        data[key] = sanitizeInput(data[key]);
    });
    
    // Validate form
    const validation = validateContactForm(data);
    if (!validation.isValid) {
        callback(false, validation.errors);
        return;
    }
    
    // Check rate limit (using IP or user identifier)
    const identifier = data.email || 'anonymous';
    if (!rateLimit.check(identifier)) {
        callback(false, ['Too many attempts. Please try again later.']);
        return;
    }
    
    // Generate CSRF token
    const csrfToken = generateCSRFToken();
    sessionStorage.setItem('csrf_token', csrfToken);
    
    callback(true, null, data, csrfToken);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeInput,
        isValidEmail,
        validateContactForm,
        rateLimit,
        generateCSRFToken,
        secureFormSubmission
    };
}
