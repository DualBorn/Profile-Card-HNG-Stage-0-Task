const form = document.getElementById('contactForm');
const nameInput = document.querySelector('[data-testid="test-contact-name"]');
const emailInput = document.querySelector('[data-testid="test-contact-email"]');
const subjectInput = document.querySelector('[data-testid="test-contact-subject"]');
const messageInput = document.querySelector('[data-testid="test-contact-message"]');
const successBanner = document.querySelector('[data-testid="test-contact-success"]');
const nameError = document.querySelector('[data-testid="test-contact-error-name"]');
const emailError = document.querySelector('[data-testid="test-contact-error-email"]');
const subjectError = document.querySelector('[data-testid="test-contact-error-subject"]');
const messageError = document.querySelector('[data-testid="test-contact-error-message"]');

// Validate name field
function validateName() {
    const value = nameInput.value.trim();
    
    if (value === '') {
        showError(nameInput, nameError, 'Please enter your full name');
        return false;
    }
    
    clearError(nameInput, nameError);
    return true;
}

// Validate email field
function validateEmail() {
    const value = emailInput.value.trim();
    
    if (value === '') {
        showError(emailInput, emailError, 'Please enter your email address');
        return false;
    }
    
    // Check if email format is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailInput, emailError);
    return true;
}

// Validate subject field
function validateSubject() {
    const value = subjectInput.value.trim();
    
    if (value === '') {
        showError(subjectInput, subjectError, 'Please enter a subject');
        return false;
    }
    
    clearError(subjectInput, subjectError);
    return true;
}

// Validate message field
function validateMessage() {
    const value = messageInput.value.trim();
    
    if (value === '') {
        showError(messageInput, messageError, 'Please enter your message');
        return false;
    }
    
    // Message must be at least 10 characters
    if (value.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long');
        return false;
    }
    
    clearError(messageInput, messageError);
    return true;
}

// Show error message
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
}

// Clear error message
function clearError(input, errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('input-error');
    input.setAttribute('aria-invalid', 'false');
}

// Validate on blur (when user leaves the field)
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
subjectInput.addEventListener('blur', validateSubject);
messageInput.addEventListener('blur', validateMessage);

// Clear errors when user starts typing
nameInput.addEventListener('input', function() {
    if (nameError.textContent) {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener('input', function() {
    if (emailError.textContent) {
        clearError(emailInput, emailError);
    }
});

subjectInput.addEventListener('input', function() {
    if (subjectError.textContent) {
        clearError(subjectInput, subjectError);
    }
});

messageInput.addEventListener('input', function() {
    if (messageError.textContent) {
        clearError(messageInput, messageError);
    }
});

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // If everything is valid, show success message
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Hide the form
        form.style.display = 'none';
        
        // Show success banner
        successBanner.style.display = 'flex';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset form after 2 seconds
        setTimeout(function() {
            form.reset();
        }, 2000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.input-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});