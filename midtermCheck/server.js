import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${url}`);
  }
  return response.json();
}

app.use(express.static("public"));

app.get("/api/places", async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Invalid query parameter" });
  }

  try {
    const data = await fetchJson(
      `https://api.inaturalist.org/v1/places/autocomplete?q=${encodeURIComponent(query)}`
    );

    const places = data.results.map((place) => ({
      id: place.id,
      name: place.display_name || place.name,
    }));

    res.json({ places });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Could not get data from iNaturalist" });
  }
});

app.get("/api/identifications", async (req, res) => {
  const placeId = Number(req.query.place_id);

  // Validation: place_id must be a real number
  if (!Number.isInteger(placeId) || placeId <= 0) {
    return res.status(400).json({ error: "Invalid place_id" });
  }

  try {
    const idData = await fetchJson(
      `https://api.inaturalist.org/v1/identifications?place_id=${placeId}&per_page=50`
    );

    const taxonIds = [...new Set(idData.results.map((item) => item.taxon?.id).filter(Boolean))].slice(0, 30);

    if (taxonIds.length === 0) {
      return res.json({ identifications: [] });
    }

    const taxaData = await fetchJson(`https://api.inaturalist.org/v1/taxa/${taxonIds.join(",")}`);

    const identifications = taxaData.results.map((taxon) => ({
      id: taxon.id,
      name: taxon.preferred_common_name || taxon.name,
      scientificName: taxon.name,
      photo: taxon.default_photo?.medium_url || null,
    }));

    res.json({ identifications });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Could not get data from iNaturalist" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
