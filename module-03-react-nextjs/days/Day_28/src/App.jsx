import React, { useState } from 'react';
import Header from './Header';
import Menu from './Menu';

export default function App() {
  const [totalETB, setTotalETB] = useState(0);

  return (
    <div>
      <Header totalETB={totalETB} />
      <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1rem' }}>
        <Menu totalETB={totalETB} setTotalETB={setTotalETB} />
      </main>
    </div>
  );
}