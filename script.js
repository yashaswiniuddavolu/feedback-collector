document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const feedbackItems = document.getElementById('feedbackItems');
    
    // Load feedback when page loads
    loadFeedback();
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback').value;
        
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, feedback })
            });
            
            if (response.ok) {
                form.reset();
                loadFeedback();
            } else {
                alert('Error submitting feedback');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting feedback');
        }
    });
    
    async function loadFeedback() {
        try {
            const response = await fetch('/api/feedback');
            const feedbacks = await response.json();
            
            feedbackItems.innerHTML = '';
            
            if (feedbacks.length === 0) {
                feedbackItems.innerHTML = '<p>No feedback yet. Be the first to submit!</p>';
                return;
            }
            
            feedbacks.forEach(feedback => {
                const feedbackElement = document.createElement('div');
                feedbackElement.className = 'feedback-item';
                feedbackElement.innerHTML = `
                    <h3>${feedback.name}</h3>
                    <p>${feedback.feedback}</p>
                    <small>${feedback.email} • ${new Date(feedback.date).toLocaleString()}</small>
                `;
                feedbackItems.appendChild(feedbackElement);
            });
        } catch (error) {
            console.error('Error loading feedback:', error);
            feedbackItems.innerHTML = '<p>Error loading feedback. Please try again later.</p>';
        }
    }
});