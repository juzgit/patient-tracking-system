// DoctorSidebarWrapper.js
import React from 'react';
import HomepageContext from './HomePageContext';

const DoctorSidebarWrapper = ({ children }) => {
  const contextValue = {
    basename: '/' // Set the appropriate value here
  };

  return (
    <HomepageContext.Provider value={contextValue}>
      {children}
    </HomepageContext.Provider>
  );
};

export default DoctorSidebarWrapper;
