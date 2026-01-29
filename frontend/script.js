const API = "http://localhost:3000/api";

// Load doctors on page load
async function loadDoctors() {
  const res = await fetch(`${API}/doctors`);
  const doctors = await res.json();

  const select = document.getElementById("doctorSelect");

  doctors.forEach(doc => {
    const option = document.createElement("option");
    option.value = doc._id;               // 👈 hidden doctorId
    option.textContent =
      `${doc.name} (${doc.specialization})`;
    select.appendChild(option);
  });
}

// Book token
async function bookToken() {
  const patientName = document.getElementById("patientName").value;
  const doctorId = document.getElementById("doctorSelect").value;

  if (!doctorId) {
    alert("Please select a doctor");
    return;
  }

  const res = await fetch(`${API}/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patientName, doctorId })
  });

  const data = await res.json();
  document.getElementById("tokenResult").innerText =
    `✅ Your Token Number: ${data.tokenNumber}`;
}

// Auto load doctors
window.onload = loadDoctors;
