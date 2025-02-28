// api/descargas.js
let descargas = 0;

export default function handler(req, res) {
    if (req.method === 'POST') {
        descargas++;
        res.status(200).json({ descargas });
    } else if (req.method === 'GET') {
        res.status(200).json({ descargas });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
