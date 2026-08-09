// ১. টেক্সট সিলেক্ট করা বন্ধ করা (CSS injected via JS)
const style = document.createElement('style');
style.innerHTML = `
    body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;
document.head.appendChild(style);

// ২. রাইট-ক্লিক বন্ধ করা
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// ৩. কীবোর্ড শর্টকাট (F12, Ctrl+U, Ctrl+C, Ctrl+P) বন্ধ করা
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) e.preventDefault();
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'C' || e.key === 'c' || e.key === 'S' || e.key === 's' || e.key === 'P' || e.key === 'p')) e.preventDefault();
});

// ৪. ছবি ড্র্যাগ করা (টেনে নেওয়া) বন্ধ করা
document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') e.preventDefault();
});
