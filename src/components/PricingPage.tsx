import React, { useState } from 'react';

const PricingPage = () => {
  const [pricingTerm, setPricingTerm] = useState('monthly');

  const handlePricingTermChange = (term: 'monthly' | 'annual') => {
    setPricingTerm(term);
  };

  return (
    <div>
      <h1>Pricing</h1>
      <div>
        <button onClick={() => handlePricingTermChange('monthly')} className={pricingTerm === 'monthly' ? 'active' : ''}>
          Monthly
        </button>
        <button onClick={() => handlePricingTermChange('annual')} className={pricingTerm === 'annual' ? 'active' : ''}>
          Annual
        </button>
      </div>
      <div>
        {pricingTerm === 'monthly' ? (
          <ul>
            <li>Basic: $9.99/month</li>
            <li>Premium: $19.99/month</li>
            <li>Enterprise: $49.99/month</li>
          </ul>
        ) : (
          <ul>
            <li>Basic: $99.99/year</li>
            <li>Premium: $199.99/year</li>
            <li>Enterprise: $499.99/year</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default PricingPage;