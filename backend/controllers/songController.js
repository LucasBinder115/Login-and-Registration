export function getSongs(req, res) {
  res.json({ message: 'List of songs', songs: [] });
}

export function streamSong(req, res) {
  const filename = req.params.filename;
  res.send(`Streaming file: ${filename}`);
}