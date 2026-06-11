import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSiderbar } from "./useSidebar";

describe("useSideBar", () => {
  it("muda o estado do sidebar", () => {
    const { result } = renderHook(() => useSiderbar());

    act(() => result.current.handleSidebarToggle());
    expect(result.current.isSidebarOpen).toBe(true);
    expect(result.current.isUserMenuOpen).toBe(false);

    act(() => result.current.handleSidebarToggle());
    expect(result.current.isSidebarOpen).toBe(false);

    act(() => result.current.handleSidebarClose());
    expect(result.current.isSidebarOpen).toBe(false);
    expect(result.current.isUserMenuOpen).toBe(false);
  });
});
