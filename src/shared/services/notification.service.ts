export type NotificationVariant = "error" | "success" | "warning" | "info";

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  variant: NotificationVariant;
}

export interface ShowNotificationInput {
  title: string;
  message?: string;
}

type NotificationListener = (notifications: NotificationItem[]) => void;

class NotificationService {
  private notifications: NotificationItem[] = [];

  private readonly listeners = new Set<NotificationListener>();

  private readonly timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  private nextId = 0;

  subscribe(listener: NotificationListener) {
    this.listeners.add(listener);
    listener(this.notifications);

    return () => {
      this.listeners.delete(listener);
    };
  }

  getNotifications() {
    return this.notifications;
  }

  show(variant: NotificationVariant, input: ShowNotificationInput) {
    const notification: NotificationItem = {
      id: this.createId(),
      title: input.title,
      message: input.message,
      variant,
    };

    this.notifications = [...this.notifications, notification];
    this.emit();

    return notification.id;
  }

  showForSeconds(
    variant: NotificationVariant,
    input: ShowNotificationInput,
    seconds: number
  ) {
    const notificationId = this.show(variant, input);
    this.removeInSeconds(notificationId, seconds);

    return notificationId;
  }

  showError(input: ShowNotificationInput) {
    return this.show("error", input);
  }

  showErrorForSeconds(input: ShowNotificationInput, seconds: number) {
    return this.showForSeconds("error", input, seconds);
  }

  showSuccess(input: ShowNotificationInput) {
    return this.show("success", input);
  }

  showSuccessForSeconds(input: ShowNotificationInput, seconds: number) {
    return this.showForSeconds("success", input, seconds);
  }

  showWarning(input: ShowNotificationInput) {
    return this.show("warning", input);
  }

  showWarningForSeconds(input: ShowNotificationInput, seconds: number) {
    return this.showForSeconds("warning", input, seconds);
  }

  showInfo(input: ShowNotificationInput) {
    return this.show("info", input);
  }

  showInfoForSeconds(input: ShowNotificationInput, seconds: number) {
    return this.showForSeconds("info", input, seconds);
  }

  remove(notificationId: string) {
    this.clearTimeout(notificationId);
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId
    );
    this.emit();
  }

  removeInSeconds(notificationId: string, seconds: number) {
    this.clearTimeout(notificationId);

    const timeout = setTimeout(() => {
      this.remove(notificationId);
    }, this.normalizeSeconds(seconds) * 1000);

    this.timeouts.set(notificationId, timeout);
  }

  clear() {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts.clear();
    this.notifications = [];
    this.emit();
  }

  private createId() {
    this.nextId += 1;
    return `notification-${this.nextId}`;
  }

  private normalizeSeconds(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return 0;
    }

    return seconds;
  }

  private clearTimeout(notificationId: string) {
    const timeout = this.timeouts.get(notificationId);

    if (!timeout) {
      return;
    }

    clearTimeout(timeout);
    this.timeouts.delete(notificationId);
  }

  private emit() {
    const snapshot = [...this.notifications];
    this.listeners.forEach((listener) => listener(snapshot));
  }
}

export const notificationService = new NotificationService();
