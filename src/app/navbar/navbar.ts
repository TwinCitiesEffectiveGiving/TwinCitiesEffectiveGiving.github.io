import { Component } from '@angular/core';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly site = siteConfig;

  protected readonly navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Get Involved', href: '#join' },
    { label: 'Contact', href: '#contact' },
  ];
}
