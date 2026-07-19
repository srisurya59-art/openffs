// OpenFFS Payment Handler
// Detects country and routes to appropriate payment processor

let selectedTier = null;

function selectTier(tier) {
  selectedTier = tier;
  document.getElementById("payment-section").style.display = "block";
  document.getElementById("payment-section").scrollIntoView({ behavior: "smooth" });
}

function detectCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && (tz.toLowerCase().includes("kolkata") || tz.toLowerCase().includes("calcutta"))) {
      return "IN";
    }
  } catch (e) {}
  return "GLOBAL";
}

function openStripe() {
  const stripeLinks = {
    individual: "https://buy.stripe.com/YOUR_INDIVIDUAL_LINK",
    enterprise: "https://buy.stripe.com/YOUR_ENTERPRISE_LINK"
  };
  const url = stripeLinks[selectedTier];
  if (url && !url.includes("YOUR_")) {
    window.open(url, "_blank");
  } else {
    alert("Stripe payment link not configured yet. Please contact hello@openffs.engineering to purchase.");
  }
}

function openRazorpay() {
  const razorpayLinks = {
    individual: "https://rzp.io/l/YOUR_INDIVIDUAL_LINK",
    enterprise: "https://rzp.io/l/YOUR_ENTERPRISE_LINK"
  };
  const url = razorpayLinks[selectedTier];
  if (url && !url.includes("YOUR_")) {
    window.open(url, "_blank");
  } else {
    alert("Razorpay payment link not configured yet. Please contact hello@openffs.engineering to purchase.");
  }
}

const observer = new MutationObserver(() => {
  const paymentSection = document.getElementById("payment-section");
  if (paymentSection && paymentSection.style.display === "block") {
    const country = detectCountry();
    if (country === "IN") {
      const rzpBtn = document.querySelector(".payment-options button:nth-child(2)");
      if (rzpBtn) {
        rzpBtn.style.background = "#1a4d8f";
        rzpBtn.style.color = "white";
      }
    } else {
      const stripeBtn = document.querySelector(".payment-options button:nth-child(1)");
      if (stripeBtn) {
        stripeBtn.style.background = "#1a4d8f";
        stripeBtn.style.color = "white";
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

console.log("OpenFFS landing page loaded");

