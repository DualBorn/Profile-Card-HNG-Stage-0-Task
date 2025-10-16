const timeElement = document.querySelector('[data-testid="test-user-time"]');
const avatarImage = document.querySelector('[data-testid="test-user-avatar"]');
const uploadInput = document.getElementById('avatarUpload');

// Update the timestamp with current time in milliseconds
function updateTime() {
    timeElement.textContent = Date.now();
}

// Set the time right away when page loads
updateTime();

// Keep updating every second so it stays current
setInterval(updateTime, 1000);

// Handle avatar photo uploads
uploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    // If no file selected, just return
    if (!file) return;

    // Make sure it's actually an image file
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    // Clean up old blob URL to prevent memory leaks
    // I had issues with this before so always revoke old URLs
    if (avatarImage.src.startsWith('blob:')) {
        URL.revokeObjectURL(avatarImage.src);
    }

    // Create a URL for the uploaded image and set it
    const imageUrl = URL.createObjectURL(file);
    avatarImage.src = imageUrl;
    avatarImage.alt = `Profile photo - ${file.name}`;
});

// Clean up when user leaves the page
window.addEventListener('beforeunload', function() {
    if (avatarImage.src.startsWith('blob:')) {
        URL.revokeObjectURL(avatarImage.src);
    }
});