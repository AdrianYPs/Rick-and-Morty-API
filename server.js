// server.js
app.get('/characters', async (req, res) => {
    try {
      const page = req.query.page || 1;
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      const characters = response.data.results;
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  