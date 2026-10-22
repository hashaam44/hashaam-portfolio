const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const projectNotes = {
  skinai: {
    eyebrow: "01 / COMPUTER VISION",
    title: "SkinAI",
    body: `<p><strong>Goal:</strong> explore skin-disease image classification and build a safer, knowledge-grounded assistant experience.</p>
      <h3>What has been worked on</h3>
      <ul><li>Experiments with saved Keras image-classification models and a MobileNetV2 baseline.</li><li>Initial knowledge-retrieval modules and safety/conversation groundwork.</li><li>Planning the local LLM connection through Ollama rather than relying on an expiring hosted API key.</li></ul>
      <h3>What remains</h3>
      <ul><li>Complete and compare model evaluation using appropriate held-out data and per-class metrics.</li><li>Finish the image-prediction and chatbot integration, then test the complete user flow.</li><li>Keep medical disclaimers and safety boundaries clear. This project is not a clinically validated diagnostic system.</li></ul>`
  },
  hub: {
    eyebrow: "02 / WEB APPLICATION",
    title: "AI/ML Hub",
    body: `<p><strong>Goal:</strong> build a web platform with account and profile features.</p>
      <h3>Implemented work</h3>
      <ul><li>Profile page and database-backed profile fields.</li><li>Profile-picture upload and display.</li><li>Edit-profile and change-password flows.</li><li>Avatar display in the navbar, user dashboard, admin recent-users area, and admin user-management listing.</li></ul>
      <h3>Recorded next step</h3><p>Display the profile picture on the Admin User Detail page. The site should be described feature-by-feature rather than as fully finished unless the remaining pages and flows have been tested.</p>`
  },
  rag: {
    eyebrow: "03 / KNOWLEDGE RETRIEVAL",
    title: "SkinAI Knowledge Retrieval",
    body: `<p><strong>Goal:</strong> retrieve relevant passages from reference documents so assistant answers can be grounded in source material.</p>
      <h3>Recorded groundwork</h3>
      <ul><li>Three WHO PDFs processed into 446 chunks.</li><li>768-dimensional embeddings generated with nomic-embed-text.</li><li>ChromaDB collection named <code>skin_disease_knowledge</code>.</li><li>Initial retrieval, RAG, safety, and conversation modules started.</li></ul>
      <h3>Important limitation</h3><p>These are setup/prototype milestones. They do not establish retrieval quality, factual accuracy, or production readiness; those require testing.</p>`
  },
  profile: {
    eyebrow: "04 / PRODUCT UI",
    title: "Profile & Admin UI",
    body: `<p><strong>Goal:</strong> keep profile information and avatar display consistent across user and admin pages.</p>
      <h3>Implemented sections</h3>
      <ul><li>Profile picture upload and rendering.</li><li>Edit profile and change password.</li><li>Navbar and user-dashboard avatar.</li><li>Admin dashboard recent-user and user-management avatars.</li></ul>
      <h3>Recorded next step</h3><p>Add the avatar to the Admin User Detail page. This is a feature-level progress summary, not a claim that every possible edge case has been tested.</p>`
  }
};

const dialog = document.querySelector("#projectDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogEyebrow = document.querySelector("#dialogEyebrow");
const dialogContent = document.querySelector("#dialogContent");

document.querySelectorAll(".project-more").forEach(button => {
  button.addEventListener("click", () => {
    const note = projectNotes[button.dataset.project];
    if (!note) return;
    dialogEyebrow.textContent = note.eyebrow;
    dialogTitle.textContent = note.title;
    dialogContent.innerHTML = note.body;
    dialog.showModal();
  });
});

document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const toast = document.querySelector("#toast");
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelector("#copyEmail").addEventListener("click", async event => {
  const email = event.currentTarget.dataset.email;
  if (!email || email === "YOUR_EMAIL_HERE") {
    showToast("Add your real email address in index.html first.");
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard.");
  } catch {
    showToast(`Email: ${email}`);
  }
});

document.querySelectorAll("[data-placeholder-link]").forEach(link => {
  link.addEventListener("click", event => {
    if (link.getAttribute("href").startsWith("YOUR_")) {
      event.preventDefault();
      showToast("Replace this placeholder with your real profile URL.");
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
