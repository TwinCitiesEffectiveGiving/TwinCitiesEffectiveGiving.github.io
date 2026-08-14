import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { siteConfig } from './site-config';

export interface CalendarEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  detail: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly http = inject(HttpClient);

  private readonly eventsSignal = signal<CalendarEvent[]>([]);
  private readonly loadingSignal = signal(false);

  readonly events = computed(() => this.eventsSignal());
  readonly loading = computed(() => this.loadingSignal());

  loadEvents(): void {
    if (this.loadingSignal()) {
      return;
    }
    this.loadingSignal.set(true);
    const calendarId = encodeURIComponent(siteConfig.calendarId);
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${siteConfig.googleCalendarApiKey}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&maxResults=8`;
    this.http.get<{ items?: unknown[] }>(url).subscribe({
      next: ({ items = [] }) => {
        const events = items
          .map((item) => formatEvent(item))
          .filter((event): event is CalendarEvent => event !== null);
        this.eventsSignal.set(events);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.eventsSignal.set([]);
        this.loadingSignal.set(false);
      },
    });
  }
}

function formatEvent(item: unknown): CalendarEvent | null {
  const raw = item as {
    id?: string;
    summary?: string;
    location?: string;
    start?: { dateTime?: string; date?: string };
    end?: { dateTime?: string; date?: string };
  };
  const startValue = raw.start?.dateTime ?? raw.start?.date;
  if (!raw.id || !startValue) {
    return null;
  }
  const start = new Date(startValue);
  const detailParts: string[] = [];
  if (raw.start?.dateTime && raw.end?.dateTime) {
    detailParts.push(`${formatTime(start)} \u2013 ${formatTime(new Date(raw.end.dateTime))}`);
  } else {
    detailParts.push('All day');
  }
  if (raw.location) {
    detailParts.push(raw.location);
  }
  return {
    id: raw.id,
    title: raw.summary ?? 'Untitled event',
    month: start.toLocaleString('en-US', { month: 'short' }),
    day: String(start.getDate()),
    detail: detailParts.join(' \u00b7 '),
  };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
