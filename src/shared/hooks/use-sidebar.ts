"use client";

import { useState } from "react";

export function useSiderbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSidebarToggle = () => {
    if (isSidebarOpen) {
      setIsUserMenuOpen(false);
    }

    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setIsUserMenuOpen(false);
  };

  return { isSidebarOpen, isUserMenuOpen, handleSidebarClose, handleSidebarToggle, setIsUserMenuOpen };
}
