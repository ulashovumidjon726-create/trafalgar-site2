const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

const serviceDescriptions = {
  "Shifokor qidirish":
    "Bu bo‘limda shifokorlar, ularning mutaxassisligi va aloqa ma’lumotlarini joylashtirishingiz mumkin.",

  "Onlayn dorixona":
    "Bu bo‘lim dori vositalari haqida ma’lumot berish uchun mo‘ljallangan. Dori tanlash va qabul qilish bo‘yicha shifokor yoki farmatsevt bilan maslahatlashing.",

  "Konsultatsiya":
    "Bu namuna bo‘lim. Haqiqiy onlayn konsultatsiya uchun shifokorlar bilan aloqa tizimini ulash kerak.",

  "Tibbiy ma’lumotlar":
    "Bu yerda sog‘lom turmush tarzi, profilaktika va tibbiy savodxonlik haqidagi maqolalarni joylashtirishingiz mumkin.",

  "Tez yordam":
    "O‘zbekistonda tez tibbiy yordam raqami — 103. Hayot uchun xavfli vaziyatda darhol qo‘ng‘iroq qiling.",

  "Sog‘liq kuzatuvi":
    "Bu bo‘limni kundalik qaydlar va sog‘liq ko‘rsatkichlarini saqlash funksiyasi bilan keyinchalik kengaytirish mumkin."
};

// Mobil menyu
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Menyuni yopish" : "Menyuni ochish"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Menyudagi havolani bosganda menyuni yopish
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menyuni ochish");
    menuToggle.textContent = "☰";
  });
});

// Xizmat oynasini ochish
function openService(serviceName) {
  modalTitle.textContent = serviceName;
  modalText.textContent =
    serviceDescriptions[serviceName] ||
    "Ushbu xizmat haqida ma’lumot tez orada qo‘shiladi.";

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

// Xizmat tugmalari
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    openService(button.dataset.service);
  });
});

// Oynani yopish
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOk.addEventListener("click", closeModal);

// Oynadan tashqarini bosish
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Escape tugmasi bilan yopish
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

// Aloqa formasi
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  formStatus.textContent =
    "Forma to‘ldirildi. Hozircha xabar serverga yuborilmadi.";

  contactForm.reset();
});

// Joriy yil
document.getElementById("year").textContent =
  new Date().getFullYear();