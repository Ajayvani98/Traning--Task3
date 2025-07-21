let step = 0;
let clinics = [
  { name: "Vasantha Hospital", location: "2 km" },
  { name: "City Health Center", location: "3.5 km" },
  { name: "GreenCare Clinic", location: "5 km" }
];
let selectedClinic = null;

const appointment = {
  name: "",
  reason: "",
  date: "",
  time: "",
  phone: "",
  clinic: ""
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, "user-message");
  input.value = "";

  setTimeout(() => {
    const reply = processMessage(message);
    appendMessage(reply, "bot-message");
  }, 500);
}

function appendMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = `message ${className}`;
  msg.innerHTML = text;
  const chat = document.getElementById("chatMessages");
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function processMessage(input) {
  switch (step) {
    case 0:
      step++;
      appointment.name = input;
      return `Hi ${appointment.name}, what is the reason for your visit?`;
    case 1:
      step++;
      appointment.reason = input;
      return "Please enter a preferred date (YYYY-MM-DD):";
    case 2:
      if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return "Please use YYYY-MM-DD format.";
      appointment.date = input;
      step++;
      return "And time? (HH:MM)";
    case 3:
      if (!/^\d{2}:\d{2}$/.test(input)) return "Please use HH:MM format.";
      appointment.time = input;
      step++;
      return "Please share your phone number (10 digits):";
    case 4:
      if (!/^\d{10}$/.test(input)) return "Enter a valid 10-digit phone number.";
      appointment.phone = input;
      step++;
      return "Would you like to find nearby clinics? (yes/no)";
    case 5:
      if (input.toLowerCase() === "yes") {
        step++;
        return showClinics();
      } else {
        step = 999; // end
        return "Appointment booked without selecting a clinic. ✅ Thank you!";
      }
    case 6:
      const choice = parseInt(input);
      if (isNaN(choice) || choice < 1 || choice > clinics.length) {
        return "Please enter a valid number to select a clinic.";
      }
      selectedClinic = clinics[choice - 1];
      appointment.clinic = selectedClinic.name;
      step++;
      return confirmBooking();
    default:
      return "✅ Your appointment is already booked. Refresh to book another.";
  }
}

function showClinics() {
  let msg = "📍 Here are clinics near you:<br>";
  clinics.forEach((c, i) => {
    msg += `${i + 1}. <strong>${c.name}</strong> (${c.location})<br>`;
  });
  msg += "<br>Type the number to select one.";
  return msg;
}

function confirmBooking() {
  const token = Math.floor(10000 + Math.random() * 90000);
  return `
    ✅ <strong>Appointment Confirmed!</strong><br><br>
    <strong>Name:</strong> ${appointment.name}<br>
    <strong>Reason:</strong> ${appointment.reason}<br>
    <strong>Date:</strong> ${appointment.date}<br>
    <strong>Time:</strong> ${appointment.time}<br>
    <strong>Phone:</strong> ${appointment.phone}<br>
    <strong>Clinic:</strong> ${appointment.clinic}<br>
    <strong>Token #:</strong> ${token}<br><br>
    Thank you! 🩺
  `;
}

// Start
window.onload = () => {
  appendMessage("👋 Welcome! What is your full name?", "bot-message");
};
