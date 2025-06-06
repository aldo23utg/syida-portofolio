document.addEventListener('DOMContentLoaded', function() {

    // === KODE LOADING SCREEN SEKALI TAYANG ===
    const loadingOverlay = document.getElementById('loading-overlay');

    // Cek apakah elemen loading screen ada di halaman ini (hanya ada di index.html)
    if (loadingOverlay) {
        // Cek sessionStorage apakah layar ini sudah pernah ditampilkan di sesi ini
        if (sessionStorage.getItem('hasAlreadyLoaded')) {
            // Jika sudah, sembunyikan langsung tanpa animasi
            loadingOverlay.style.display = 'none';
        } else {
            // Jika ini kunjungan pertama, tunggu semua aset (gambar, css) selesai dimuat
            window.addEventListener('load', () => {
                // Tunggu animasi loading bar selesai, lalu sembunyikan dengan efek fade out
                setTimeout(() => {
                    loadingOverlay.classList.add('hidden');
                    // Tandai di sessionStorage bahwa layar pemuatan sudah ditampilkan
                    sessionStorage.setItem('hasAlreadyLoaded', 'true');
                }, 2200); // Waktu harus sedikit lebih lama dari animasi loading-bar
            });
        }
    }
    // === AKHIR KODE LOADING SCREEN ===


    // Inisialisasi AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,    // Duration of animation
            once: true,        // Whether animation should happen only once - while scrolling down
            offset: 100,       // Offset (in px) from the original trigger point
            easing: 'ease-in-out-cubic' // Default easing for AOS animations
        });
    }

    // Efek Navbar Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) { // Slightly increased scroll threshold
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPageFileName = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        const linkFileName = link.getAttribute('href').split("/").pop() || "index.html";
        const linkPath = link.getAttribute('href');

        if (linkFileName === currentPageFileName || linkPath === currentPageFileName || (currentPageFileName === "index.html" && linkPath === "../index.html")) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Update Tahun Copyright di Footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll untuk link internal (jika ada yang menggunakan #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                const targetElement = document.querySelector(hrefAttribute);
                
                // PERUBAHAN: Mengembalikan ke metode kalkulasi dinamis yang lebih akurat
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const additionalOffset = 20; // Jarak aman tambahan
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - additionalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});