import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'pt-header',
  templateUrl: './pt-header.component.html',
  styleUrls: ['./pt-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PtHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
