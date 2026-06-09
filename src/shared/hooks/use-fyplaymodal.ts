"use client";

import { useState } from "react";

export default function useFyPlaymodal() {
  const [altera, setAltera] = useState<boolean>(false);

  return {
    altera,
    setAltera,
  };
}
