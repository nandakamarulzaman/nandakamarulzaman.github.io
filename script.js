/* =========================================================
   NANDA PORTFOLIO — Modern JS
   ========================================================= */

const navLinks = document.querySelectorAll("header nav a");
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");
const barsBox = document.querySelector(".bars-box");
const header = document.querySelector("header");
const backToTop = document.getElementById("back-to-top");

let currentSection = 0;
let isTransitioning = false;

/* ---------- Mobile menu ---------- */
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

/* ---------- Section switching with bars transition ---------- */
function switchSection(newIndex) {
  if (isTransitioning || newIndex === currentSection) return;
  isTransitioning = true;

  barsBox.classList.add("active");
  header.classList.remove("active");

  setTimeout(() => {
    sections[currentSection].classList.remove("active");
    navLinks[currentSection].classList.remove("active");

    sections[newIndex].classList.add("active");
    navLinks[newIndex].classList.add("active");
    sections[newIndex].scrollTop = 0;

    currentSection = newIndex;

    setTimeout(() => {
      header.classList.add("active");
    }, 100);

    setTimeout(() => {
      barsBox.classList.remove("active");
      isTransitioning = false;
    }, 600);
  }, 450);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
}

navLinks.forEach((link, idx) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    switchSection(idx);
  });
});

logoLink.addEventListener("click", (e) => {
  e.preventDefault();
  switchSection(0);
});

/* ---------- Resume tabs ---------- */
const resumeBtns = document.querySelectorAll(".resume-btn");
const resumeDetails = document.querySelectorAll(".resume-detail");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    resumeBtns.forEach((b) => b.classList.remove("active"));
    resumeDetails.forEach((d) => d.classList.remove("active"));
    btn.classList.add("active");
    resumeDetails[idx].classList.add("active");
  });
});

/* ---------- Portfolio Modal ---------- */
const projectData = {
  1: {
    img: "img/portfolio/webSekolah.png",
    numb: "01",
    type: "Web Application",
    title: "School Website",
    desc: "A digital platform providing complete school information — profiles, programs, activities, announcements, and online services for students, parents, and the community.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "jQuery"],
    live: "https://smpithayatanthayyibah.sch.id/beranda",
    source: "#",
  },
  2: {
    img: "img/portfolio/e-learning.png",
    numb: "02",
    type: "Web Application",
    title: "E-Learning",
    desc: "An online learning platform providing materials, videos, quizzes, and discussion forums for students.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "jQuery"],
    live: "https://e-learning.smpithayatanthayyibah.sch.id/",
    source: "#",
  },
  3: {
    img: "img/portfolio/ppdb-test.png",
    numb: "03",
    type: "Web Application",
    title: "PPDB Test",
    desc: "An online admission system for new students, from registration to the announcement of selection results.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "jQuery"],
    live: "https://ppdb-dev.smpithayatanthayyibah.sch.id/",
    source: "#",
  },
  4: {
    img: "img/portfolio/buku-tamu.png",
    numb: "04",
    type: "Web Application",
    title: "Guest Book",
    desc: "A web application for recording every visit to the school and enhancing visitor-administrator interaction.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "jQuery"],
    live: "https://bukutamu.smpithayatanthayyibah.sch.id/",
    source: "#",
  },
  5: {
    img: "img/portfolio/absensi.png",
    numb: "05",
    type: "Web + RFID",
    title: "Digital Attendance",
    desc: "An online attendance system using RFID readers, enabling teachers to quickly and efficiently record student attendance.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "RFID"],
    live: "https://absensi.smpithayatanthayyibah.sch.id/",
    source: "#",
  },
  6: {
    img: "img/portfolio/aindustri.png",
    numb: "06",
    type: "Web Application",
    title: "Convection Website",
    desc: "An online platform with product catalogs, ordering systems, and inventory management for a garment business.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "jQuery"],
    live: "https://aindustri.co.id/",
    source: "#",
  },
  7: {
    img: "img/portfolio/alkholiliyah.png",
    numb: "07",
    type: "Web Application",
    title: "SMA Al-Kholiliyah",
    desc: "A complete school information platform for SMA Al-Kholiliyah.",
    tech: ["Laravel", "Bootstrap", "JavaScript", "jQuery"],
    live: "https://alkholiliyah.sch.id/",
    source: "#",
  },
};

const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalNumb = document.getElementById("modal-numb");
const modalType = document.getElementById("modal-type");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTech = document.getElementById("modal-tech");
const modalLive = document.getElementById("modal-live");
const modalSource = document.getElementById("modal-source");

let savedSectionScroll = 0;

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  // Simpan scroll dari section aktif
  const activeSection = document.querySelector("section.active");
  savedSectionScroll = activeSection ? activeSection.scrollTop : 0;

  modalImg.src = data.img;
  modalImg.alt = data.title;
  modalNumb.textContent = data.numb;
  modalType.textContent = data.type;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalLive.href = data.live;
  modalSource.href = data.source;
  modalTech.innerHTML = data.tech.map((t) => `<span>${t}</span>`).join("");

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");

  const activeSection = document.querySelector("section.active");
  if (activeSection) {
    activeSection.scrollTop = savedSectionScroll;
  }
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.project));
});

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------- Counter animation ---------- */
const stats = document.querySelectorAll(".stat-num");

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
stats.forEach((s) => observer.observe(s));

/* ---------- Back to top ---------- */
function checkBackToTop() {
  const activeSection = document.querySelector("section.active");
  if (!activeSection) return;
  if (activeSection.scrollTop > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

sections.forEach((section) => {
  section.addEventListener("scroll", checkBackToTop);
});

backToTop.addEventListener("click", () => {
  const activeSection = document.querySelector("section.active");
  if (activeSection) {
    activeSection.scrollTo({ top: 0, behavior: "smooth" });
  }
});

/* ---------- Contact form ---------- */
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for reaching out. I'll reply soon.",
        confirmButtonColor: "#ffffff",
        background: "#111111",
        color: "#ffffff",
        timer: 3500,
        timerProgressBar: true,
      });
      contactForm.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to send message. Please try again later.",
      confirmButtonColor: "#ffffff",
      background: "#111111",
      color: "#ffffff",
    });
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

/* ---------- Init ---------- */
window.addEventListener("load", () => {
  sections[0].classList.add("active");
  navLinks[0].classList.add("active");
  header.classList.add("active");
});
