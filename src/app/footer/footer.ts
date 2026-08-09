import { Component } from '@angular/core';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly site = siteConfig;
  protected readonly year = new Date().getFullYear();
}
