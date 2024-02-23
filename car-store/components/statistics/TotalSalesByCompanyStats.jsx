import React from 'react';

const TotalSalesByCompanyStats = ({ stats }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Total Sales by Company</h2>
      <ul>
        {stats.map((company, index) => (
          <li key={index}>
            {company.company} - Total Sales: {company.totalSales}, Total Revenue: {company.totalRevenue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalSalesByCompanyStats;
