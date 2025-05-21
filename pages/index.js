import { useState } from 'react';

export default function Home() {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function compareAddresses() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/compareAddresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address1, address2 }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Something went wrong' });
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Address Comparison</h1>
      <input
        type="text"
        placeholder="Address 1"
        value={address1}
        onChange={e => setAddress1(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <input
        type="text"
        placeholder="Address 2"
        value={address2}
        onChange={e => setAddress2(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={compareAddresses} disabled={loading || !address1 || !address2} style={{ padding: '10px 20px' }}>
        {loading ? 'Comparing...' : 'Compare'}
      </button>
      {result && (
        <div style={{ marginTop: 20 }}>
          {result.error ? (
            <div style={{ color: 'red' }}>{result.error}</div>
          ) : (
            <div>
              <strong>Match:</strong> {result.match ? 'Yes' : 'No'} <br />
              <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
            </div>
          )}
        </div>
      )}
    </div>
  );
}
