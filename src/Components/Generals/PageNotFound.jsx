import React from 'react';

const PageNotFound = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        background:"linear-gradient(180deg, #604099 0%, #4A5DA9 100%)",
      }}
    >
      <div style={{ fontSize: '64px' }}>👻</div>
      <h1 style={{ fontSize: '48px', margin: '20px 0 10px', color:"white" }}>404</h1>
      <p style={{ fontSize: '20px', marginBottom: '30px', color:"white" }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          textDecoration: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Go Home
      </a>
    </div>
  );
};

export default PageNotFound;
