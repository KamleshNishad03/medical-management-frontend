import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNotification } from "../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
  const { unreadCount } = useNotification();
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 60, right: 12 });

  useEffect(() => {
    const updatePosition = () => {
      if (!bellRef.current) return;

      const rect = bellRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        setDropdownPos({
          top: rect.bottom + 8,
          right: 12,
        });
      } else {
        setDropdownPos({
          top: rect.bottom + 8,
          right: Math.max(window.innerWidth - rect.right, 12),
        });
      }
    };

    if (open) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        const dropdown = document.getElementById("notification-dropdown-portal");
        if (dropdown && dropdown.contains(e.target)) return;
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <>
      <div
        ref={bellRef}
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "22px",
            position: "relative",
          }}
        >
          🔔
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-8px",
                background: "red",
                color: "#fff",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </div>

      {open &&
        createPortal(
          <div
            id="notification-dropdown-portal"
            style={{
              position: "fixed",
              top: `${dropdownPos.top}px`,
              right: `${dropdownPos.right}px`,
              width: isMobile ? "calc(100vw - 24px)" : "320px",
              maxWidth: isMobile ? "calc(100vw - 24px)" : "320px",
              zIndex: 9999,
            }}
          >
            <NotificationDropdown closeDropdown={() => setOpen(false)} />
          </div>,
          document.body
        )}
    </>
  );
};

export default NotificationBell;