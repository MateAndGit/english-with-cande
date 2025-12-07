document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. 스크롤 애니메이션 (요소 등장)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    const hiddenElements = document.querySelectorAll('section, .card, .timeline-item');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // 3. ✨ 타자기 효과 (Typing Effect)
    const textSpan = document.querySelector('.typing-text');
    const words = ["Profesora de Inglés 👩‍🏫", "Especialista en Neurodiversidad 🧠", "Apasionada por Enseñar ❤️"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // 문장 완성 후 2초 대기
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // 다음 문장으로
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    // 타자기 효과 시작
    if(textSpan) type();


    // 4. 🌻 클릭하면 해바라기 피어나는 효과 (Click Magic)
    document.addEventListener('click', function(e) {
        // 해바라기 요소 생성
        const flower = document.createElement('div');
        flower.classList.add('click-flower');
        flower.innerHTML = '🌻'; 
        
        // 클릭한 위치에 배치
        flower.style.left = e.pageX + 'px';
        flower.style.top = e.pageY + 'px';
        
        // 랜덤 크기/각도 (자연스럽게)
        const randomSize = Math.random() * 0.5 + 1; // 1배~1.5배
        flower.style.transform = `scale(${randomSize})`;

        document.body.appendChild(flower);

        // 1초 뒤에 태그 삭제 (메모리 관리)
        setTimeout(() => {
            flower.remove();
        }, 1000);
    });

    console.log("Website made with love for Candela! 🌻");
});