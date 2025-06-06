const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const typingPreview = document.getElementById("typing-preview");

// 🧠 Keywords mapped to question IDs
const faqVariants = {
  "how to send photo on whatsapp": "send_photo_whatsapp",
  "send image on whatsapp": "send_photo_whatsapp",
  "share picture on whatsapp": "send_photo_whatsapp",
  "whatsapp photo send": "send_photo_whatsapp",
  "how to create whatsapp group": "create_group_whatsapp",
  "make whatsapp group": "create_group_whatsapp",
  "whatsapp group create": "create_group_whatsapp",
  "how to delete whatsapp chat": "delete_chat_whatsapp",
  "remove chat in whatsapp": "delete_chat_whatsapp",
  "clear whatsapp conversation": "delete_chat_whatsapp",
  "how to send document on whatsapp": "send_doc_whatsapp",
  "send pdf whatsapp": "send_doc_whatsapp",
  "share file on whatsapp": "send_doc_whatsapp",
  "how to secure whatsapp": "secure_whatsapp",
  "whatsapp privacy settings": "secure_whatsapp",
  "enable 2 step whatsapp": "secure_whatsapp",
  "check balance on paytm": "check_balance_paytm",
  "paytm balance check": "check_balance_paytm",
  "wallet balance paytm": "check_balance_paytm",
  "recharge phone using paytm": "recharge_paytm",
  "mobile recharge paytm": "recharge_paytm",
  "how to top up using paytm": "recharge_paytm",
  "how to send money on paytm": "send_money_paytm",
  "transfer money paytm": "send_money_paytm",
  "paytm money transfer": "send_money_paytm",
  "delete paytm account": "delete_account_paytm",
  "close paytm account": "delete_account_paytm",
  "what is google pay": "intro_google_pay",
  "google pay meaning": "intro_google_pay",
  "explain google pay": "intro_google_pay",
  "how to send money google pay": "send_money_gpay",
  "transfer money google pay": "send_money_gpay",
  "add bank in google pay": "add_bank_gpay",
  "link bank google pay": "add_bank_gpay",
  "google pay limit": "gpay_limit",
  "how much can i send google pay": "gpay_limit",
  "use google maps": "use_google_maps",
  "navigate using google maps": "use_google_maps",
  "get directions maps": "use_google_maps",
  "share location on whatsapp": "share_location",
  "send location google maps": "share_location",
  "location sharing": "share_location",
  "voice navigation maps": "voice_nav_maps",
  "enable voice google maps": "voice_nav_maps",
  "what is upi": "intro_upi",
  "upi meaning": "intro_upi",
  "explain upi": "intro_upi",
  "update whatsapp": "update_whatsapp",
  "how to update whatsapp": "update_whatsapp",
  "upgrade whatsapp": "update_whatsapp",
  "scan qr in paytm": "scan_qr_paytm",
  "qr code scanner paytm": "scan_qr_paytm"
};

// 📚 FAQs by ID
const faqAnswers = {
  send_photo_whatsapp: `📸 Send Photo on WhatsApp:\n1. Open the chat.\n2. Tap 📎 or camera.\n3. Select/take photo.\n4. Tap send.`,
  create_group_whatsapp: `👥 Create WhatsApp Group:\n1. Tap 3-dot menu > New Group.\n2. Select contacts.\n3. Name your group and tap ✅.`,
  delete_chat_whatsapp: `🗑️ Delete WhatsApp Chat:\n1. Long press the chat.\n2. Tap trash 🗑️ icon.\n3. Confirm delete.`,
  send_doc_whatsapp: `📄 Send Document:\n1. Tap 📎 > Document.\n2. Pick file.\n3. Tap send.`,
  secure_whatsapp: `🔒 Secure WhatsApp:\n1. Go to Settings > Account > Two-step verification.\n2. Enable & add PIN.`,
  check_balance_paytm: `💰 Check Paytm Balance:\n1. Open Paytm.\n2. Tap "Balance & History".`,
  recharge_paytm: `📱 Recharge via Paytm:\n1. Tap "Mobile Recharge".\n2. Enter number and amount.\n3. Tap Pay.`,
  send_money_paytm: `💸 Send Money via Paytm:\n1. Tap "Scan & Pay" or enter number.\n2. Add amount.\n3. Confirm.`,
  delete_account_paytm: `⚠️ Delete Paytm:\n1. Go to Help & Support.\n2. Search "Close Account".`,
  intro_google_pay: `💸 Google Pay: a digital wallet to send/receive money, pay bills & shop.`,
  send_money_gpay: `💵 Google Pay Send:\n1. Tap Pay > contact or UPI ID.\n2. Enter amount & UPI PIN.`,
  add_bank_gpay: `🏦 Add Bank:\n1. Tap Profile > Bank Account.\n2. Choose & verify bank.`,
  gpay_limit: `📊 GPay limit:\nMax ₹1 lakh/day or 10 transactions/day.`,
  use_google_maps: `🗺️ Use Google Maps:\n1. Search place.\n2. Tap "Directions" > "Start".`,
  share_location: `📍 Share Location:\nIn WhatsApp tap 📎 > Location > Send.`,
  voice_nav_maps: `🎙️ Voice Navigation:\nTap speaker icon during directions.`,
  intro_upi: `🔗 UPI allows real-time bank transfers using mobile apps like Paytm, GPay.`,
  update_whatsapp: `🔄 Update WhatsApp:\nGo to Play Store > WhatsApp > Tap "Update".`,
  scan_qr_paytm: `📲 Scan QR in Paytm:\nOpen app > Tap "Scan & Pay" > Use camera.`
};

// ✅ Show typing preview
function showTypingPreview() {
  const currentText = userInput.value;
  typingPreview.textContent = currentText ? `Typing: ${currentText}` : "";
}

// ✅ Send message
function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  typingPreview.textContent = "";

  const reply = getBotReply(msg.toLowerCase());
  setTimeout(() => addMessage(reply, "bot"), 800);

  userInput.value = "";
}

// ✅ Display chat bubbles
function addMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
  msgDiv.innerText = message;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ✅ Generate bot reply
function getBotReply(msg) {
  for (let key in faqVariants) {
    if (msg.includes(key)) {
      const faqKey = faqVariants[key];
      return faqAnswers[faqKey] || "🤖 I know this topic but don't have a detailed answer yet!";
    }
  }
  return "🤔 I don’t know that yet. Try asking about WhatsApp, Paytm, or Google Maps.";
}
