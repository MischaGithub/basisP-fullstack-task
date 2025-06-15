import * as Sentry from "@sentry/nextjs";

type LogLevel = "fatal" | "error" | "warning" | "info" | "debug";

export function logEvent(
  message: string,
  category: string = "general",
  data?: Record<string, any>,
  level: LogLevel = "info",
  error?: unknown
) {
  Sentry.addBreadcrumb({
    category,
    message,
    data,
    level,
  });

  if (error) {
    Sentry.captureException(error, { extra: data });
  } else {
    Sentry.captureMessage(message, level);
  }
}

export function trackPingEvent(
  userId: string,
  pingId: string,
  latitude: number,
  longitude: number,
  eventType: "New Ping" | "Response"
) {
  Sentry.captureEvent({
    message: `Ping ${eventType} Created`,
    level: "info",
    tags: {
      feature: "ping",
      event_type: eventType,
    },
    extra: {
      userId,
      pingId,
      latitude,
      longitude,
    },
  });
}

export function captureAuthError(error: Error) {
  Sentry.captureException(error, {
    tags: { module: "authentication" },
    level: "error",
  });
}

export function captureApiError(error: Error, endpoint: string) {
  Sentry.captureException(error, {
    tags: { module: "api", endpoint },
    level: "error",
  });
}
