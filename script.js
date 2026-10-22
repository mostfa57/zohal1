/*
 * زحل للطاقة الشمسية — إعدادات بسيطة يمكنك تعديلها لاحقاً.
 * ألصق رابط الحساب كاملاً بين علامتي الاقتباس، مثلاً:
 * instagram: "https://www.instagram.com/your-account/"
 * facebook: "https://www.facebook.com/your-page/"
 */
const SOCIAL_PROFILE_URLS = {
    instagram: "",
    facebook: ""
};

const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-navigation");

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "فتح القائمة" : "إغلاق القائمة");
        mainNavigation.classList.toggle("is-open", !isOpen);
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNavigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "فتح القائمة");
        });
    });
}

Object.entries(SOCIAL_PROFILE_URLS).forEach(([platform, profileUrl]) => {
    const socialLink = document.querySelector(`[data-social-link="${platform}"]`);

    if (!socialLink) {
        return;
    }

    const cleanUrl = profileUrl.trim();

    if (cleanUrl) {
        socialLink.href = cleanUrl;
        socialLink.target = "_blank";
        socialLink.rel = "noopener noreferrer";
        socialLink.removeAttribute("aria-disabled");
        socialLink.classList.remove("is-unavailable");
        socialLink.querySelector("small").textContent = "تابعنا هناك";
        return;
    }

    socialLink.addEventListener("click", (event) => {
        event.preventDefault();
    });
});

const filterButtons = document.querySelectorAll(".filter-button");
const galleryCards = document.querySelectorAll(".gallery-card");
const visibleCount = document.querySelector("#visible-count");

filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        const selectedFilter = filterButton.dataset.filter;
        let visibleCards = 0;

        filterButtons.forEach((button) => {
            const isActive = button === filterButton;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        galleryCards.forEach((card) => {
            const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCards += 1;
            }
        });

        if (visibleCount) {
            visibleCount.textContent = String(visibleCards);
        }
    });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCaption = document.querySelector(".lightbox__caption");
const lightboxClose = document.querySelector(".lightbox__close");

if (lightbox && lightboxImage && lightboxCaption) {
    galleryCards.forEach((card) => {
        card.addEventListener("click", () => {
            const image = card.querySelector("img");

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = card.dataset.title;
            lightbox.showModal();
        });
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.close();
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.close();
        }
    });
}

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}
