const activities = [
    {
        name: "SEMNASTI",
        category: "Seminar",
        date: "5-6 Desember 2025",
        location: "Universitas Dian Nuswantoro",
        description: "Seminar nasional yang membahas perkembangan sains dan teknologi."
    },

    {
        name: "IT Competition",
        category: "Competition",
        date: "10 Desember 2024 - 23 Januari 2025",
        location: "Universitas Dian Nuswantoro",
        description: "Kompetisi teknologi untuk mengembangkan kemampuan peserta di bidang IT."
    },

    {
        name: "HI-TECHNOLOGY",
        category: "Technology",
        date: "12 Mei 2026 & 13 Mei 2026",
        location: " Mall Citraland & Universitas Dian Nuswantoro",
        description: "Kegiatan teknologi yang mendorong pengembangan solusi teknologi yang inovatif."
    }
];

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

function observeElement(element) {
    observer.observe(element);
}

function displayActivities(activityData)
{
    const activityList = document.getElementById("activityList");

    if (!activityList){
        return;
    }

    activityList.innerHTML = "";

    activityData.forEach(function(activity){
        const activityItem = document.createElement("article");

        activityItem.classList.add(
            "activity-item",
            "scroll-animation"
        );

        activityItem.style.transitionDelay =
            `${activityData.indexOf(activity) * 0.15}s`;

        activityItem.innerHTML = `
            <h2>${activity.name}</h2>

            <div class="activity-info">
                <p><strong>Kategori:</strong> ${activity.category}</p>
                <p><strong>Tanggal:</strong> ${activity.date}</p>
                <p><strong>Lokasi:</strong> ${activity.location}</p>
            </div>

            <p class="activity-description">
                ${activity.description}
            </p>

            <button 
                class="btn register-btn"
                data-activity="${activity.name}">
                Daftar Kegiatan
            </button>
        `;

        activityList.appendChild(activityItem);

        observeElement(activityItem);
    });
}

const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0) {
    displayActivities(activities);

    filterButtons.forEach(function(button){
        button.addEventListener("click", function(){
            filterButtons.forEach(function(btn){
                btn.classList.remove("active");
            });
    
            button.classList.add("active");
    
            const selectedCategory = button.dataset.filter;
    
            if(selectedCategory === "all"){
                displayActivities(activities);
            } else {
                const filteredActivities = activities.filter(function(activity){
                    return activity.category === selectedCategory;
                });
    
                displayActivities(filteredActivities);
            }
        });
    });
}

const animatedElements = document.querySelectorAll(".scroll-animation");

animatedElements.forEach(function(element, index) {

    element.classList.add("scroll-animation");

    element.style.transitionDelay =
        `${(index % 3) * 0.1}s`;

    observeElement(element);

});

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }


    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

        updateThemeIcon();
    });


    function updateThemeIcon() {

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }
    }

    updateThemeIcon();
}


const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    const nameInput = document.getElementById("name");
    const nimInput = document.getElementById("nim");
    const emailInput = document.getElementById("email");
    const whatsappInput = document.getElementById("whatsapp");
    const activityInput = document.getElementById("activity");
    const reasonInput = document.getElementById("reason");

    const nameError = document.getElementById("nameError");
    const nimError = document.getElementById("nimError");
    const emailError = document.getElementById("emailError");
    const whatsappError = document.getElementById("whatsappError");
    const activityError = document.getElementById("activityError");
    const reasonError = document.getElementById("reasonError");

    const registrationMessage =
        document.getElementById("registrationMessage");

    nameInput.addEventListener("input", function() {

        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

    });

    nimInput.addEventListener("input", function() {

        this.value = this.value.replace(/[^a-zA-Z0-9.]/g, "");

    });

    whatsappInput.addEventListener("input", function() {

        this.value = this.value.replace(/[^0-9]/g, "");

    });

    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = nameInput.value.trim();
        const nim = nimInput.value.trim();
        const email = emailInput.value.trim();
        const whatsapp = whatsappInput.value.trim();
        const activity = activityInput.value;
        const reason = reasonInput.value.trim();

        nameError.textContent = "";
        nimError.textContent = "";
        emailError.textContent = "";
        whatsappError.textContent = "";
        activityError.textContent = "";
        reasonError.textContent = "";

        registrationMessage.textContent = "";

        registrationMessage.classList.remove("success-message");

        let isValid = true;

        if (name === "") {

            nameError.textContent =
                "Nama lengkap wajib diisi.";

            isValid = false;

        } else if (!/^[a-zA-Z\s]+$/.test(name)) {

            nameError.textContent =
                "Nama hanya boleh berisi huruf dan spasi.";

            isValid = false;

        }

        if (nim === "") {

            nimError.textContent =
                "NIM wajib diisi.";

            isValid = false;

        } else if (!/^[a-zA-Z0-9.]+$/.test(nim)) {

            nimError.textContent =
                "NIM hanya boleh berisi huruf, angka, dan titik.";

            isValid = false;

        }

        if (email === "") {

            emailError.textContent =
                "Email wajib diisi.";

            isValid = false;

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            emailError.textContent =
                "Format email tidak valid.";

            isValid = false;

        }

        if (whatsapp === "") {

            whatsappError.textContent =
                "Nomor WhatsApp wajib diisi.";

            isValid = false;

        } else if (!/^[0-9]+$/.test(whatsapp)) {

            whatsappError.textContent =
                "Nomor WhatsApp hanya boleh berisi angka.";

            isValid = false;

        } else if (whatsapp.length < 10) {

            whatsappError.textContent =
                "Nomor WhatsApp minimal 10 angka.";

            isValid = false;

        }

        if (activity === "") {

            activityError.textContent =
                "Silakan pilih kegiatan.";

            isValid = false;

        }

        if (reason === "") {

            reasonError.textContent =
                "Alasan mengikuti kegiatan wajib diisi.";

            isValid = false;

        } else if (reason.length < 10) {

            reasonError.textContent =
                "Alasan minimal 10 karakter.";

            isValid = false;

        }

        if (isValid) {

            registrationMessage.textContent =
                "Pendaftaran berhasil! Data kamu sudah tervalidasi.";

            registrationMessage.classList.add("success-message");

            registrationForm.reset();
        }
    });
}