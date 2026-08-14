import { Component, type OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { EventsService } from './events.service';
import { siteConfig } from './site-config';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly eventsService = inject(EventsService);

  protected readonly site = siteConfig;
  protected readonly calendarUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(siteConfig.calendarEmbedUrl);
  protected readonly mailtoLink = `mailto:${siteConfig.email}`;
  protected readonly events = this.eventsService.events;
  protected readonly eventsLoading = this.eventsService.loading;

  protected email = '';

  ngOnInit(): void {
    this.eventsService.loadEvents();
  }

  protected readonly pillars = [
    {
      title: 'Research-driven',
      description:
        'We draw on effective altruism research and charity evaluators like GiveWell to find interventions with strong evidence of impact.',
    },
    {
      title: 'Pooled giving',
      description:
        'Members contribute to a shared fund, so even small donations add up to grants that make a real difference.',
    },
    {
      title: 'Local community',
      description:
        'Monthly meetups for conversation, guest speakers, and deciding together where our next grant goes.',
    },
  ];

  protected onSubscribe(): void {
    if (!this.email) {
      return;
    }
    const subject = encodeURIComponent('Email list signup');
    const body = encodeURIComponent(`Please add me to your email list.\nMy email: ${this.email}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }
}
