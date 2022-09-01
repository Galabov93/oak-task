import { Button } from 'pages/HomePage/PhaseStep';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompletePage() {
  const navigate = useNavigate();
  const [fact, setFact] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/random.json').then((response) => {
      response.json().then((json) => {
        setFact(json.text);
      });
    });
  }, []);

  const onReset = () => {
    window.localStorage.clear();
    navigate('/');
  };

  if (!fact) return <p>Loading...</p>;

  return (
    <div>
      <h1 style={{ margin: 16, textAlign: 'center' }}>{fact}</h1>
      <Button style={{ display: 'block', margin: '0 auto' }} onClick={onReset}>
        Start from the beginning
      </Button>
    </div>
  );
}

export default CompletePage;
