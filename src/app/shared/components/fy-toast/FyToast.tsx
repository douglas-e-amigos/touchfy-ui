"use client";

import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  NotificationItem,
  NotificationVariant,
  notificationService,
} from "../../services/notification.service";

const variantStyles: Record<
  NotificationVariant,
  {
    container: string;
    icon: typeof CircleX;
    iconClassName: string;
    badge: string;
    label: string;
  }
> = {
  error: {
    container: "border-red-200 bg-red-50 text-red-950 shadow-red-100/80",
    icon: CircleX,
    iconClassName: "text-red-600",
    badge: "bg-red-100 text-red-700",
    label: "Erro",
  },
  success: {
    container:
      "border-emerald-200 bg-emerald-50 text-emerald-950 shadow-emerald-100/80",
    icon: CircleCheck,
    iconClassName: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Sucesso",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-950 shadow-amber-100/80",
    icon: CircleAlert,
    iconClassName: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    label: "Alerta",
  },
  info: {
    container: "border-sky-200 bg-sky-50 text-sky-950 shadow-sky-100/80",
    icon: Info,
    iconClassName: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
    label: "Informativo",
  },
};

export default function FyToast() {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    return notificationService.subscribe(setNotifications);
  }, []);

  useEffect(() => {
    notificationService.clear();
  }, [pathname]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div className="flex w-full max-w-2xl flex-col gap-3">
        {notifications.map((notification) => {
          const styles = variantStyles[notification.variant];
          const Icon = styles.icon;

          return (
            <div
              key={notification.id}
              className={[
                "pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-200",
                styles.container,
              ].join(" ")}
            >
              <div className="mt-0.5 shrink-0">
                <Icon className={styles.iconClassName} size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
                      styles.badge,
                    ].join(" ")}
                  >
                    {styles.label}
                  </span>
                  <strong className="truncate text-sm font-semibold">
                    {notification.title}
                  </strong>
                </div>

                {notification.message ? (
                  <p className="text-sm/5 opacity-80">{notification.message}</p>
                ) : null}
              </div>

              <button
                type="button"
                aria-label={`Fechar notificação ${notification.title}`}
                className="cursor-pointer rounded-full p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100"
                onClick={() => notificationService.remove(notification.id)}
              >
                <X size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}