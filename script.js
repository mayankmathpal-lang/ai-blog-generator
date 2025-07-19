/**
 * AI Blog Generator Script
 * Handles blog post generation, user interactions, and export functionality
 */

// Blog template configurations for different writing tones
const blogTemplates = {
    professional: {
        intro: "In today's rapidly evolving landscape, {topic} has emerged as a critical area of focus for businesses and professionals alike.",
        structure: ["Introduction", "Key Concepts", "Current Applications", "Future Implications", "Conclusion"],
        style: "formal",
        vocabulary: "advanced"
    },
    casual: {
        intro: "Hey there! Let's dive into {topic} and explore what makes it so fascinating.",
        structure: ["Getting Started", "The Fun Stuff", "Real-World Examples", "What's Next?", "Wrapping Up"],
        style: "informal",
        vocabulary: "simple"
    },
    educational: {
        intro: "Understanding {topic} is essential for anyone looking to stay informed about this important subject.",
        structure: ["Overview", "Fundamental Principles", "Practical Applications", "Case Studies", "Summary"],
        style: "instructional",
        vocabulary: "clear"
    },
    conversational: {
        intro: "Have you ever wondered about {topic}? Well, you're in for a treat because we're about to explore this fascinating subject together.",
        structure: ["Let's Start", "Here's What's Interesting", "Real Examples", "What This Means", "Final Thoughts"],
        style: "friendly",
        vocabulary: "accessible"
    },
    technical: {
        intro: "This comprehensive analysis examines {topic} from a technical perspective, exploring its mechanisms, implementation, and implications.",
        structure: ["Technical Overview", "System Architecture", "Implementation Details", "Performance Analysis", "Conclusions"],
        style: "analytical",
        vocabulary: "technical"
    }
};

// Sample content database for different topics
const sampleContent = {
    "The Future of Artificial Intelligence": {
        points: [
            "AI is transforming industries across the globe with unprecedented speed and efficiency",
            "Machine learning algorithms are becoming more sophisticated, enabling complex problem-solving",
            "Ethical considerations are paramount in AI development to ensure responsible innovation",
            "Automation will reshape the job market, creating new opportunities while transforming existing roles",
            "AI will enhance human capabilities rather than replace them, fostering human-AI collaboration"
        ],
        conclusion: "The future of AI holds immense promise for solving complex problems and improving human life, but requires careful consideration of ethical implications and societal impact.",
        keywords: ["artificial intelligence", "machine learning", "automation", "ethics", "innovation"]
    },
    "Web Development Best Practices": {
        points: [
            "Clean, semantic HTML forms the foundation of accessible and maintainable web applications",
            "Responsive design ensures optimal user experience across all devices and screen sizes",
            "Performance optimization is crucial for user engagement and search engine rankings",
            "Security measures protect against common vulnerabilities and data breaches",
            "Regular testing and maintenance ensure quality and reliability over time"
        ],
        conclusion: "Following established best practices leads to robust, maintainable web applications that provide excellent user experiences.",
        keywords: ["web development", "responsive design", "performance", "security", "testing"]
    },
    "Digital Marketing Strategies": {
        points: [
            "Content marketing builds brand authority and establishes thought leadership",
            "Social media engagement drives meaningful customer relationships and brand loyalty",
            "SEO optimization improves search visibility and organic traffic growth",
            "Email marketing maintains ongoing customer connections and drives conversions",
            "Analytics provide actionable insights for continuous optimization and improvement"
        ],
        conclusion: "A comprehensive digital marketing strategy integrates multiple channels and tactics for maximum impact and ROI.",
        keywords: ["digital marketing", "content marketing", "SEO", "social media", "analytics"]
    },
    "Cybersecurity Fundamentals": {
        points: [
            "Strong password policies and multi-factor authentication provide essential security layers",
            "Regular software updates and patches protect against known vulnerabilities",
            "Employee training and awareness programs prevent social engineering attacks",
            "Network monitoring and intrusion detection systems identify potential threats",
            "Backup and disaster recovery plans ensure business continuity during incidents"
        ],
        conclusion: "Effective cybersecurity requires a multi-layered approach combining technology, processes, and human awareness.",
        keywords: ["cybersecurity", "authentication", "monitoring", "backup", "training"]
    },
    "Sustainable Business Practices": {
        points: [
            "Environmental responsibility drives long-term business value and stakeholder trust",
            "Resource efficiency reduces operational costs while minimizing environmental impact",
            "Supply chain transparency ensures ethical sourcing and sustainable partnerships",
            "Employee engagement in sustainability initiatives creates a culture of responsibility",
            "Innovation in sustainable technologies opens new market opportunities"
        ],
        conclusion: "Sustainable business practices are not just environmentally responsible but also economically advantageous in the long term.",
        keywords: ["sustainability", "environmental responsibility", "resource efficiency", "supply chain", "innovation"]
    }
};

// Word count configurations for different article lengths
const wordCountConfig = {
    short: { min: 300, max: 500, target: 400 },
    medium: { min: 500, max: 800, target: 650 },
    long: { min: 800, max: 1200, target: 950 }
};

/**
 * Main function to generate blog post
 * Validates input, shows loading state, and generates content
 */
function generateBlog() {
    const topic = document.getElementById('topic').value.trim();
    const tone = document.getElementById('tone').value;
    const length = document.getElementById('length').value;
    const keywords = document.getElementById('keywords').value.trim();

    // Input validation
    if (!topic) {
        showError('Please enter a blog topic');
        return;
    }

    if (topic.length < 3) {
        showError('Blog topic must be at least 3 characters long');
        return;
    }

    // Update UI to show loading state
    const generateBtn = document.querySelector('.generate-btn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    const outputSection = document.getElementById('output');
    outputSection.style.display = 'block';
    
    const blogContent = document.getElementById('blog-content');
    blogContent.innerHTML = '<div class="loading">Generating your blog post...</div>';

    // Simulate AI generation with realistic delay
    const processingTime = Math.random() * 2000 + 1500; // 1.5-3.5 seconds
    setTimeout(() => {
        try {
            const generatedBlog = createBlogPost(topic, tone, length, keywords);
            blogContent.innerHTML = generatedBlog;
            
            // Scroll to results
            outputSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            showError('Error generating blog post. Please try again.');
            console.error('Blog generation error:', error);
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Blog Post';
        }
    }, processingTime);
}

/**
 * Creates a blog post based on user inputs
 * @param {string} topic - The blog topic
 * @param {string} tone - Writing tone
 * @param {string} length - Article length
 * @param {string} keywords - Keywords string
 * @returns {string} Generated HTML content
 */
function createBlogPost(topic, tone, length, keywords) {
    const template = blogTemplates[tone];
    const wordCount = wordCountConfig[length].target;
    
    // Get content data (use sample content if available, otherwise generate generic)
    const content = sampleContent[topic] || generateGenericContent(topic);
    
    // Process keywords
    const keywordList = keywords ? keywords.split(',').map(k => k.trim()).filter(k => k.length > 0) : [];
    
    // Generate metadata
    const metadata = generateMetadata(topic, tone, length, keywordList);
    
    // Create structured content
    const structuredContent = createStructuredContent(topic, template, content, keywordList);
    
    return `
        <div class="blog-post">
            <h2>${escapeHtml(topic)}</h2>
            <div class="blog-meta">
                ${metadata}
            </div>
            <div class="blog-content">
                ${structuredContent}
            </div>
        </div>
    `;
}

/**
 * Generates generic content for topics not in the sample database
 * @param {string} topic - The blog topic
 * @returns {object} Content object with points and conclusion
 */
function generateGenericContent(topic) {
    return {
        points: [
            `${topic} is a rapidly evolving field with significant implications for various industries`,
            `Understanding the core principles and fundamentals of ${topic} is essential for success`,
            `Current applications and implementations of ${topic} span multiple sectors and use cases`,
            `Future developments and innovations in ${topic} will bring new opportunities and challenges`,
            `Best practices and methodologies in ${topic} ensure optimal results and sustainable growth`
        ],
        conclusion: `${topic} represents an important area of focus for continued growth, innovation, and strategic development in the modern landscape.`,
        keywords: [topic.toLowerCase(), "innovation", "development", "best practices", "future trends"]
    };
}

/**
 * Generates metadata for the blog post
 * @param {string} topic - Blog topic
 * @param {string} tone - Writing tone
 * @param {string} length - Article length
 * @param {array} keywords - Keywords array
 * @returns {string} HTML metadata string
 */
function generateMetadata(topic, tone, length, keywords) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const wordCount = wordCountConfig[length].target;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    
    let metadata = `
        <span>📅 ${currentDate}</span>
        <span>📝 ~${wordCount} words</span>
        <span>⏱️ ${readingTime} min read</span>
        <span>🎯 ${tone.charAt(0).toUpperCase() + tone.slice(1)} tone</span>
    `;
    
    if (keywords.length > 0) {
        metadata += `<span>🏷️ ${keywords.slice(0, 3).join(', ')}${keywords.length > 3 ? '...' : ''}</span>`;
    }
    
    return metadata;
}

/**
 * Creates structured content based on template and content data
 * @param {string} topic - Blog topic
 * @param {object} template - Template configuration
 * @param {object} content - Content data
 * @param {array} keywords - Keywords array
 * @returns {string} Structured HTML content
 */
function createStructuredContent(topic, template, content, keywords) {
    const intro = template.intro.replace('{topic}', topic);
    const sections = template.structure;
    
    return `
        <p>${intro}</p>
        
        <h3>${sections[1]}</h3>
        <p>${content.points[0]}. This foundational understanding helps us appreciate the complexity and potential of this field, providing a solid base for further exploration.</p>
        
        <h3>${sections[2]}</h3>
        <p>${content.points[1]}. Let's explore the key elements that make this topic so compelling and relevant in today's context:</p>
        <ul>
            <li>${content.points[2]}</li>
            <li>${content.points[3]}</li>
            <li>${content.points[4]}</li>
        </ul>
        
        <h3>${sections[3]}</h3>
        <p>The practical applications of ${topic} are vast and varied, spanning multiple industries and use cases. From startups to enterprise organizations, the impact is being felt across different sectors. This transformation is not just theoretical—it's happening right now, with tangible results and measurable outcomes.</p>
        
        ${keywords.length > 0 ? `<p>Key areas of focus include ${keywords.slice(0, 3).join(', ')}, which represent critical components of successful implementation and adoption.</p>` : ''}
        
        <h3>${sections[4]}</h3>
        <p>${content.conclusion} As we continue to explore and develop in this area, the possibilities for innovation, growth, and positive impact are limitless.</p>
        
        <p>Thank you for reading this comprehensive exploration of ${topic}. We hope you found it informative, engaging, and valuable for your understanding of this important subject.</p>
    `;
}

/**
 * Exports the generated blog post as an HTML file
 * Creates a downloadable HTML document with embedded styles
 */
function exportBlog() {
    const blogContent = document.getElementById('blog-content').innerHTML;
    const topic = document.getElementById('topic').value.trim();
    const filename = `${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-blog-post.html`;
    
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(topic)} - AI Generated Blog Post</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        .blog-post {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .blog-post h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2em;
            line-height: 1.3;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        .blog-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 25px;
            color: #666;
            font-size: 14px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .blog-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .blog-content {
            line-height: 1.8;
            color: #444;
        }
        .blog-content h3 {
            color: #333;
            margin: 25px 0 15px 0;
            font-size: 1.3em;
            border-left: 4px solid #667eea;
            padding-left: 15px;
        }
        .blog-content p {
            margin-bottom: 15px;
            text-align: justify;
        }
        .blog-content ul {
            margin: 15px 0;
            padding-left: 20px;
        }
        .blog-content li {
            margin-bottom: 8px;
            color: #555;
        }
        .blog-content li::marker {
            color: #667eea;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        @media (max-width: 768px) {
            body { padding: 10px; }
            .blog-post { padding: 20px; }
            .blog-meta { flex-direction: column; gap: 10px; }
        }
        @media print {
            body { background: white; }
            .blog-post { box-shadow: none; }
        }
    </style>
</head>
<body>
    ${blogContent}
    <div class="footer">
        <p>Generated by AI Blog Generator on ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>`;
    
    try {
        const blob = new Blob([htmlTemplate], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        showSuccess('Blog post exported successfully!');
    } catch (error) {
        showError('Error exporting blog post. Please try again.');
        console.error('Export error:', error);
    }
}

/**
 * Displays an error message to the user
 * @param {string} message - Error message to display
 */
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-error';
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

/**
 * Displays a success message to the user
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

/**
 * Escapes HTML characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handles keyboard shortcuts
 * @param {Event} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + Enter to generate blog
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        generateBlog();
    }
    
    // Ctrl/Cmd + S to export (if blog is generated)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        const blogContent = document.getElementById('blog-content');
        if (blogContent.innerHTML && !blogContent.innerHTML.includes('loading')) {
            exportBlog();
        }
    }
}

/**
 * Initializes the application
 * Sets up event listeners and keyboard shortcuts
 */
function initializeApp() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Add CSS animations for alerts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add placeholder suggestions
    const topicInput = document.getElementById('topic');
    const suggestions = [
        "The Future of Artificial Intelligence",
        "Web Development Best Practices",
        "Digital Marketing Strategies",
        "Cybersecurity Fundamentals",
        "Sustainable Business Practices",
        "Remote Work Culture",
        "Data Privacy and Security",
        "E-commerce Trends",
        "Mobile App Development",
        "Cloud Computing Benefits"
    ];
    
    let currentSuggestion = 0;
    
    topicInput.addEventListener('focus', () => {
        if (!topicInput.value) {
            topicInput.placeholder = suggestions[currentSuggestion];
            currentSuggestion = (currentSuggestion + 1) % suggestions.length;
        }
    });
    
    // Auto-resize functionality for future textarea additions
    document.addEventListener('input', (e) => {
        if (e.target.tagName === 'TEXTAREA') {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    });
    
    console.log('AI Blog Generator initialized successfully!');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export functions for potential future use
window.BlogGenerator = {
    generate: generateBlog,
    export: exportBlog,
    templates: blogTemplates,
    sampleContent: sampleContent
};