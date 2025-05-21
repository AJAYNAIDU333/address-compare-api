export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { address1, address2 } = req.body;
  if (!address1 || !address2) {
    return res.status(400).json({ error: 'Please provide both addresses' });
  }

  // Simple comparison logic
  const a1 = address1.toLowerCase().replace(/\s+/g, '');
  const a2 = address2.toLowerCase().replace(/\s+/g, '');

  // Check if they match exactly or partially
  const confidence = a1 === a2 ? 1.0 : (a1.includes(a2) || a2.includes(a1) ? 0.85 : 0.4);
  const match = confidence > 0.8;

  res.status(200).json({ match, confidence });
}
