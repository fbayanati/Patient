import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pt-footer',
  templateUrl: './pt-footer.component.html',
  styleUrls: ['./pt-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PtFooterComponent {
  currentYear = () => new Date().getFullYear();
}
