import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { siteConfig } from './site-config';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly site = siteConfig;
  protected readonly calendarUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(siteConfig.calendarEmbedUrl);
  protected readonly mailtoLink = `mailto:${siteConfig.email}`;

  protected email = '';

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

  protected readonly upcomingEvents = [
    {
      month: 'Aug',
      day: '14',
      title: 'Monthly Giving Circle Meetup',
      detail: '6:30pm — Discuss candidates for our next grant',
    },
    {
      month: 'Sep',
      day: '04',
      title: 'Grant Decision Night',
      detail: '7:00pm — Vote on this cycle\u2019s donation',
    },
    {
      month: 'Sep',
      day: '18',
      title: 'Guest Speaker: Local Nonprofit Leader',
      detail: '6:30pm — Inside the work behind the numbers',
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
