// api/visitas.js
let visitas = 0;

export default function handler(req, res) {
    if (req.method === 'GET') {
        visitas++;
        res.status(200).json({ visitas });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
