const form = document.getElementById("place-form");
const input = document.getElementById("place-input");
const statusEl = document.getElementById("status");
const placeList = document.getElementById("place-results");
const idResults = document.getElementById("identification-results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  placeList.innerHTML = "";
  idResults.innerHTML = "";
  statusEl.textContent = "Searching...";

  try {
    const response = await fetch(`/api/places?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!response.ok) {
      statusEl.textContent = data.error;
      return;
    }

    if (data.places.length === 0) {
      statusEl.textContent = "No places found.";
      return;
    }

    statusEl.textContent = "Choose a place:";
    renderPlaces(data.places);
  } catch (err) {
    statusEl.textContent = "Something went wrong. Try again.";
  }
});

function renderPlaces(places) {
  places.forEach((place) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = place.name;
    button.dataset.placeId = place.id;
    li.appendChild(button);
    placeList.appendChild(li);
  });
}

placeList.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const placeId = button.dataset.placeId;
  idResults.innerHTML = "";
  statusEl.textContent = `Loading identifications for ${button.textContent}...`;

  try {
    const response = await fetch(`/api/identifications?place_id=${placeId}`);
    const data = await response.json();

    if (!response.ok) {
      statusEl.textContent = data.error;
      return;
    }

    if (data.identifications.length === 0) {
      statusEl.textContent = "No identifications found for this place.";
      return;
    }

    statusEl.textContent = `Identifications for ${button.textContent}:`;
    renderIdentifications(data.identifications);
  } catch (err) {
    statusEl.textContent = "Something went wrong. Try again.";
  }
});

function renderIdentifications(identifications) {
  identifications.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.photo) {
      const img = document.createElement("img");
      img.src = item.photo;
      img.alt = item.name;
      img.loading = "lazy";
      card.appendChild(img);
    }

    const name = document.createElement("h3");
    name.textContent = item.name;
    card.appendChild(name);

    const sci = document.createElement("p");
    sci.textContent = item.scientificName;
    sci.className = "scientific";
    card.appendChild(sci);

    idResults.appendChild(card);
  });
}