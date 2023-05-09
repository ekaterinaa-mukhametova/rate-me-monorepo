import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table({ content }) {
  const [columnNames, setColumnNames] = useState([]);
  const [columnContent, setColumnContent] = useState([]);

  useEffect(() => {
    if (content?.length) {
      setColumnNames(Object.keys(content[0]));
      const newColumnContent = content.map((el) => Object.values({ ...el }));
      setColumnContent(newColumnContent);
    }
  }, [content]);

  if (columnNames?.length > 0 && columnContent?.length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            {columnNames.map((el) => <th key={el} scope="col">{el.includes('Button') ? '' : el}</th>)}
          </tr>
        </thead>
        <tbody>
          {columnContent.map((row) => (
            <tr key={`${row.join('')}`}>
              {row.map((el) => <td key={el}>{el}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="container custom-loader-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

Table.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
};

export default Table;
