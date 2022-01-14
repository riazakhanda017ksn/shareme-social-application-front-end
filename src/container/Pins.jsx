import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed,Search, CreatePins } from '../components';
import PinsDetail from '../components/PinsDetail';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinsDetail user={user && user} />} />
          <Route path="/create-pin" element={<CreatePins user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;