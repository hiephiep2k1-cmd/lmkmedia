
// Hiệu ứng hiện dần cho các Talent Card
const talentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Thêm một chút delay cho từng tấm ảnh hiện lên lần lượt
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.talent-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    talentObserver.observe(card);
});


// Header effect when scrolling
window.addEventListener('scroll', () => {
    const header = document.querySelector('#main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// Check if stats section is in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Xử lý gửi Form Đăng ký
const creatorForm = document.getElementById('creatorForm');
const formSuccess = document.getElementById('formSuccess');

if (creatorForm) {
    creatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Giả lập trạng thái đang gửi
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Đang gửi...";
        submitBtn.disabled = true;

        // Giả lập delay mạng 1.5 giây
        setTimeout(() => {
            creatorForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Log thông tin (Thực tế sẽ gửi đến API)
            console.log("Hồ sơ Creator đã được gửi!");
        }, 1500);
    });
}
// Smooth scrolling cho tất cả các link nội bộ
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Cuộn mượt đến vị trí form
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Trừ đi chiều cao của header cố định
                behavior: 'smooth'
            });

            // Nếu bấm vào nút để tới form, tự động focus vào ô nhập liệu đầu tiên
            if (targetId === '#apply-now') {
                setTimeout(() => {
                    const firstInput = targetElement.querySelector('input');
                    if (firstInput) firstInput.focus();
                }, 800); // Đợi cuộn xong rồi mới focus
            }
        }
    });
});

// Thêm hiệu ứng hover vào các input
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuItems = document.querySelectorAll('.nav-links a');

function isMobile(){
   return window.innerWidth <= 992;
}


/* trạng thái ban đầu */
if(isMobile()){
   navLinks.style.display='none';
}else{
   navLinks.style.display='flex';
}


/* Toggle chỉ mobile */
menuToggle.addEventListener('click', function(e){

if(!isMobile()) return;

e.stopPropagation();

if(navLinks.classList.contains('active')){

    navLinks.classList.remove('active');
    navLinks.style.display='none';

}else{

    navLinks.classList.add('active');
    navLinks.style.display='flex';

}

});


/* click link tự đóng (mobile) */
menuItems.forEach(function(link){

link.addEventListener('click', function(){

if(!isMobile()) return;

navLinks.classList.remove('active');
navLinks.style.display='none';

});

});


/* click ngoài tự đóng (mobile) */
document.addEventListener('click', function(e){

if(!isMobile()) return;

if(
!menuToggle.contains(e.target) &&
!navLinks.contains(e.target)
){
navLinks.classList.remove('active');
navLinks.style.display='none';
}

});


/* resize fix */
window.addEventListener('resize', function(){

if(isMobile()){

    if(!navLinks.classList.contains('active')){
       navLinks.style.display='none';
    }

}else{

    /* desktop luôn hiện */
    navLinks.style.display='flex';
    navLinks.classList.remove('active');

}

});
