import React, { useState } from 'react';

function FullTextSearch() {
  const [value, setValue] = useState('');
  return (
    <div className="w-50" data-bs-theme="dark">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search everywhere..."
      />
    </div>
  );
}

export default FullTextSearch;
