import React, { useEffect } from 'react';

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Not Found 404</h1>
    </div>
  );
};

export default PageNotFound;
