document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const modeToggle = document.querySelector('.mode-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const loginBtn = document.querySelector('.login-btn');
    const authModal = document.getElementById('authModal');
    const closeBtns = document.querySelectorAll('.close');
    const loginForm = document.getElementById('loginForm');

    // 切换菜单
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 切换模式
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            sunIcon.style.opacity = 0;
            setTimeout(() => {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
                setTimeout(() => {
                    moonIcon.style.opacity = 1;
                }, 10);
            }, 300);
        } else {
            moonIcon.style.opacity = 0;
            setTimeout(() => {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
                setTimeout(() => {
                    sunIcon.style.opacity = 1;
                }, 10);
            }, 300);
        }
    });

    // 打开登录模态框
    loginBtn.addEventListener('click', () => {
        authModal.style.display = 'block';
    });

    // 关闭所有模态框
    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            authModal.style.display = 'none';
        });
    });

    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target == authModal) {
            authModal.style.display = 'none';
        }
    };

    // 处理登录表单提交
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                localStorage.setItem('token', result.token);
                authModal.style.display = 'none';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('登录失败，请重试');
        }
    });
});