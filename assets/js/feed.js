// Grace Academy Feed JavaScript
let currentUser = null;
let currentSource = 'all';
let posts = [];
let comments = {};

// Sample data for Grace Academy feed
const samplePosts = [
    // Student Posts
    {
        id: 1,
        type: 'student-post',
        author: 'Sarah Johnson',
        authorRole: 'student',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Just passed my final exam! 🎉',
        content: 'After 10 weeks of intensive study, I finally passed my dental assistant certification exam! The hands-on training at Grace Academy was incredible. Can\'t wait to start my new career!',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 24,
        comments: 8,
        timestamp: '2 hours ago',
        liked: false
    },
    {
        id: 2,
        type: 'student-post',
        author: 'Mike Chen',
        authorRole: 'student',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Study group success! 📚',
        content: 'Our study group met at the library today and we all aced the practice exam! The collaborative learning approach at Grace Academy really works. Thanks to everyone who joined!',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 18,
        comments: 5,
        timestamp: '4 hours ago',
        liked: false
    },
    
    // Teacher Posts
    {
        id: 3,
        type: 'teacher-post',
        author: 'Dr. Emily Rodriguez',
        authorRole: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Pro tip: Patient communication is key! 💬',
        content: 'Remember students, effective communication with patients is just as important as technical skills. Always explain procedures clearly and make patients feel comfortable. This builds trust and reduces anxiety.',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 32,
        comments: 12,
        timestamp: '6 hours ago',
        liked: false
    },
    {
        id: 4,
        type: 'teacher-post',
        author: 'Prof. James Wilson',
        authorRole: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'New sterilization techniques workshop! 🔬',
        content: 'Next week we\'ll be covering the latest sterilization protocols. This is crucial knowledge for your certification exam. Make sure to review chapters 8-10 before class!',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 28,
        comments: 7,
        timestamp: '8 hours ago',
        liked: false
    },
    
    // Professional Posts
    {
        id: 5,
        type: 'professional-post',
        author: 'Dr. Maria Santos',
        authorRole: 'professional',
        avatar: 'https://images.unsplash.com/photo-1594824388852-7b0b9b0b0b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Looking for a dental assistant! 💼',
        content: 'Our practice is expanding and we\'re looking for a certified dental assistant. Must have completed Grace Academy program or equivalent. Great benefits and growth opportunities!',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 45,
        comments: 15,
        timestamp: '10 hours ago',
        liked: false
    },
    {
        id: 6,
        type: 'professional-post',
        author: 'Dr. Robert Kim',
        authorRole: 'professional',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Mentorship opportunity available! 🤝',
        content: 'I\'m offering mentorship to Grace Academy students. I have 15 years of experience in general dentistry and would love to help guide the next generation of dental professionals.',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 38,
        comments: 22,
        timestamp: '12 hours ago',
        liked: false
    },
    
    // Dental News
    {
        id: 7,
        type: 'dental-news',
        author: 'Dental News Network',
        authorRole: 'news',
        avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'New dental technology revolutionizes patient care! 🦷',
        content: 'Breakthrough in digital dentistry: New AI-powered diagnostic tools are helping dentists detect cavities and gum disease earlier than ever before. This technology is becoming standard in modern practices.',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 67,
        comments: 18,
        timestamp: '1 day ago',
        liked: false
    },
    
    // Medical News
    {
        id: 8,
        type: 'medical-news',
        author: 'Medical Today',
        authorRole: 'news',
        avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Study shows link between oral health and heart disease! ❤️',
        content: 'New research confirms the connection between gum disease and cardiovascular health. Regular dental checkups and proper oral hygiene are more important than ever for overall health.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 89,
        comments: 25,
        timestamp: '1 day ago',
        liked: false
    },
    
    // Job Board
    {
        id: 9,
        type: 'job-board',
        author: 'Grace Academy Career Services',
        authorRole: 'career-services',
        avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Multiple dental assistant positions available! 🏥',
        content: 'We have several partner dental offices looking for certified dental assistants. Positions include general dentistry, orthodontics, and pediatric dentistry. Apply through our career portal!',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 156,
        comments: 34,
        timestamp: '2 days ago',
        liked: false
    },
    
    // Student Success Story
    {
        id: 10,
        type: 'student-post',
        author: 'Alexis Perrera',
        authorRole: 'student',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: 'Got hired before graduation! 🎊',
        content: 'I can\'t believe it! Dr. Santos offered me a position at her practice and I haven\'t even graduated yet. The Grace Academy program and mentorship from Dr. Kim made this possible. Thank you everyone!',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        likes: 78,
        comments: 29,
        timestamp: '3 days ago',
        liked: false
    }
];

// Sample comments for posts
const sampleComments = {
    1: [
        { id: 1, author: 'Dr. Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', content: 'Congratulations Sarah! You worked so hard for this achievement. 🎉', timestamp: '1 hour ago' },
        { id: 2, author: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', content: 'Amazing work! Can\'t wait to celebrate with you!', timestamp: '1 hour ago' }
    ],
    5: [
        { id: 3, author: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', content: 'This sounds perfect! I just graduated from Grace Academy. How do I apply?', timestamp: '8 hours ago' },
        { id: 4, author: 'Dr. Maria Santos', avatar: 'https://images.unsplash.com/photo-1594824388852-7b0b9b0b0b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80', content: 'Please email your resume to careers@santosdental.com. Looking forward to hearing from you!', timestamp: '7 hours ago' }
    ]
};

// Initialize the feed
document.addEventListener('DOMContentLoaded', function() {
    // Force dark mode on page load
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('grace-academy-theme', 'dark');
    
    initializeFeed();
    setupEventListeners();
    loadFeed();
    updateLastUpdated();
});

function initializeFeed() {
    posts = [...samplePosts];
    comments = { ...sampleComments };
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('search-action-btn').addEventListener('click', toggleSearch);
    document.getElementById('search-back-btn').addEventListener('click', toggleSearch);
    
    // Post creation
    document.getElementById('post-input-container').addEventListener('click', showPostForm);
    document.getElementById('cancel-post').addEventListener('click', hidePostForm);
    document.getElementById('submit-post').addEventListener('click', submitPost);
    
    // Character count
    document.getElementById('post-content').addEventListener('input', updateCharCount);
    
    // Menu functionality
    document.getElementById('menuBtn').addEventListener('click', openMenu);
    document.getElementById('closeMenuBtn').addEventListener('click', closeMenu);
    document.getElementById('menuOverlay').addEventListener('click', closeMenu);
    
    // News source filtering
    document.querySelectorAll('.news-source-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const source = this.getAttribute('data-source');
            filterBySource(source);
        });
    });
    
    // Comment modal
    document.getElementById('closeCommentModal').addEventListener('click', closeCommentModal);
    document.getElementById('cancelCommentBtn').addEventListener('click', closeCommentModal);
    document.getElementById('commentForm').addEventListener('submit', submitComment);
    document.getElementById('commentInput').addEventListener('input', updateCommentCharCount);
    
    // Sign-in modal
    document.getElementById('closeSigninModal').addEventListener('click', closeSigninModal);
    document.getElementById('skipSigninBtn').addEventListener('click', skipSignin);
}

function toggleSearch() {
    const title = document.getElementById('nav-title');
    const searchContainer = document.getElementById('search-bar-container');
    const actions = document.getElementById('nav-actions');
    
    if (searchContainer.classList.contains('hidden')) {
        title.classList.add('hidden');
        searchContainer.classList.remove('hidden');
        searchContainer.classList.add('flex');
        actions.classList.add('hidden');
    } else {
        title.classList.remove('hidden');
        searchContainer.classList.add('hidden');
        searchContainer.classList.remove('flex');
        actions.classList.remove('hidden');
    }
}

function showPostForm() {
    document.getElementById('post-input-container').classList.add('hidden');
    document.getElementById('post-form-container').classList.remove('hidden');
    document.getElementById('post-content').focus();
}

function hidePostForm() {
    document.getElementById('post-input-container').classList.remove('hidden');
    document.getElementById('post-form-container').classList.add('hidden');
    document.getElementById('post-content').value = '';
    updateCharCount();
}

function updateCharCount() {
    const content = document.getElementById('post-content').value;
    const charCount = document.getElementById('char-count');
    charCount.textContent = `${content.length}/500`;
    
    const submitBtn = document.getElementById('submit-post');
    submitBtn.disabled = content.length === 0;
}

function submitPost() {
    const content = document.getElementById('post-content').value.trim();
    if (!content) return;
    
    const newPost = {
        id: Date.now(),
        type: 'student-post',
        author: currentUser ? currentUser.name : 'Guest User',
        authorRole: 'student',
        avatar: currentUser ? currentUser.picture : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        title: content.length > 50 ? content.substring(0, 50) + '...' : content,
        content: content,
        image: null,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        liked: false
    };
    
    posts.unshift(newPost);
    loadFeed();
    hidePostForm();
    
    // Show success message
    showNotification('Post shared successfully! 🎉');
}

function loadFeed() {
    const container = document.getElementById('news-container');
    const filteredPosts = currentSource === 'all' ? posts : posts.filter(post => post.type === currentSource);
    
    if (filteredPosts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-newspaper text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No posts found for this category.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
}

function createPostCard(post) {
    const badgeClass = getBadgeClass(post.authorRole);
    const badgeText = getBadgeText(post.authorRole);
    
    return `
        <div class="user-post-card">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <img src="${post.avatar}" alt="${post.author}" class="w-10 h-10 rounded-full">
                    <div>
                        <div class="flex items-center space-x-2">
                            <h3 class="font-semibold text-gray-800">${post.author}</h3>
                            <span class="${badgeClass}">${badgeText}</span>
                        </div>
                        <p class="text-sm text-gray-500">${post.timestamp}</p>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            
            <div class="mb-3">
                <h4 class="font-semibold text-gray-800 mb-2">${post.title}</h4>
                <p class="text-gray-600">${post.content}</p>
            </div>
            
            ${post.image ? `<img src="${post.image}" alt="Post image" class="w-full h-48 object-cover rounded-lg mb-3">` : ''}
            
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                <div class="flex items-center space-x-6">
                    <button class="like-button flex items-center space-x-2 text-gray-500 hover:text-red-500 ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        <i class="fas fa-heart"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-blue-500" onclick="openCommentModal(${post.id})">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments}</span>
                    </button>
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                        <i class="fas fa-share"></i>
                        <span>Share</span>
                    </button>
                </div>
                ${post.authorRole === 'professional' ? '<button class="text-purple-600 hover:text-purple-800 text-sm font-semibold" onclick="requestMentorship(' + post.id + ')">Request Mentorship</button>' : ''}
            </div>
        </div>
    `;
}

function getBadgeClass(role) {
    switch(role) {
        case 'student': return 'student-badge';
        case 'teacher': return 'teacher-badge';
        case 'professional': return 'professional-badge';
        case 'mentor': return 'mentor-badge';
        default: return 'student-badge';
    }
}

function getBadgeText(role) {
    switch(role) {
        case 'student': return 'Student';
        case 'teacher': return 'Teacher';
        case 'professional': return 'Professional';
        case 'mentor': return 'Mentor';
        default: return 'Student';
    }
}

function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    if (post.liked) {
        post.likes--;
        post.liked = false;
    } else {
        post.likes++;
        post.liked = true;
        createFloatingHeart();
    }
    
    loadFeed();
}

function createFloatingHeart() {
    const container = document.getElementById('floating-hearts-container');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight;
    
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        container.removeChild(heart);
    }, 3000);
}

function openCommentModal(postId) {
    const modal = document.getElementById('commentModal');
    modal.classList.remove('hidden');
    
    // Load comments for this post
    const commentList = document.getElementById('commentListContainer');
    const postComments = comments[postId] || [];
    
    if (postComments.length === 0) {
        commentList.innerHTML = '<p class="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>';
    } else {
        commentList.innerHTML = postComments.map(comment => `
            <div class="flex items-start space-x-3 mb-3">
                <img src="${comment.avatar}" alt="${comment.author}" class="w-8 h-8 rounded-full">
                <div class="flex-1">
                    <div class="flex items-center space-x-2">
                        <h4 class="font-semibold text-sm text-gray-800">${comment.author}</h4>
                        <span class="text-xs text-gray-500">${comment.timestamp}</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">${comment.content}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Store current post ID for comment submission
    modal.setAttribute('data-post-id', postId);
}

function closeCommentModal() {
    document.getElementById('commentModal').classList.add('hidden');
    document.getElementById('commentInput').value = '';
    updateCommentCharCount();
}

function updateCommentCharCount() {
    const content = document.getElementById('commentInput').value;
    const charCount = document.getElementById('commentCharCount');
    charCount.textContent = `${content.length}/200`;
    
    const submitBtn = document.getElementById('submitCommentBtn');
    submitBtn.disabled = content.length === 0;
}

function submitComment(e) {
    e.preventDefault();
    
    const content = document.getElementById('commentInput').value.trim();
    if (!content) return;
    
    const modal = document.getElementById('commentModal');
    const postId = parseInt(modal.getAttribute('data-post-id'));
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    const newComment = {
        id: Date.now(),
        author: currentUser ? currentUser.name : 'Guest User',
        avatar: currentUser ? currentUser.picture : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        content: content,
        timestamp: 'Just now'
    };
    
    if (!comments[postId]) {
        comments[postId] = [];
    }
    comments[postId].unshift(newComment);
    post.comments++;
    
    loadFeed();
    closeCommentModal();
    
    showNotification('Comment posted! 💬');
}

function requestMentorship(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    showNotification(`Mentorship request sent to ${post.author}! 🤝`);
}

function filterBySource(source) {
    currentSource = source;
    
    // Update active link
    document.querySelectorAll('.news-source-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-source="${source}"]`).classList.add('active');
    
    loadFeed();
}

function openMenu() {
    document.getElementById('menuOverlay').classList.remove('hidden');
    document.getElementById('menuPanel').classList.remove('-translate-x-full');
}

function closeMenu() {
    document.getElementById('menuOverlay').classList.add('hidden');
    document.getElementById('menuPanel').classList.add('-translate-x-full');
}

function closeSigninModal() {
    document.getElementById('signinModal').classList.add('hidden');
}

function skipSignin() {
    closeSigninModal();
    showNotification('Welcome to Grace Academy Feed! 🎓');
}

function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('last-updated').textContent = `Last updated: ${timeString}`;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Google Sign-In callback
function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    
    currentUser = {
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture
    };
    
    // Update UI
    document.getElementById('userAvatar').src = currentUser.picture;
    document.getElementById('userAvatarMenu').src = currentUser.picture;
    document.getElementById('userNameMenu').textContent = currentUser.name;
    document.getElementById('post-input-container').textContent = `What's on your mind, ${currentUser.name.split(' ')[0]}?`;
    
    // Show authenticated elements
    document.getElementById('my-posts-btn').classList.remove('hidden');
    document.getElementById('user-avatar-container').classList.remove('hidden');
    document.getElementById('user-avatar-nav').src = currentUser.picture;
    
    // Hide sign-in elements
    document.getElementById('google-signin-container').classList.add('hidden');
    
    closeSigninModal();
    showNotification(`Welcome back, ${currentUser.name}! 🎓`);
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

// Auto-refresh feed every 5 minutes
setInterval(() => {
    updateLastUpdated();
}, 300000);
