import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Platform } from '@ionic/angular';
import { SearchImage } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details-search',
  templateUrl: './details-search.component.html',
  styleUrls: ['./details-search.component.scss'],
})
export class DetailsSearchComponent implements OnInit {

  @Input() resultSearch: SearchImage;

  hasVideoPreview: boolean;
  isApp: boolean;
  srcVideoPreview: string;

  constructor(
    private api: ApiService,
    private video: VideoPlayer,
    public platform: Platform
  ) { }

  ngOnInit() {
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
  }

  imageThumbnail(objectImage): string {
    return this.api.imageThumbnail(objectImage);
  }

  formatTime(beginTime, endTime): string {
    let beginTimeResult: string = new Date(beginTime * 1000).toISOString().substr(11, 8);
    let endTimeResult = new Date(endTime * 1000).toISOString().substr(11, 8);
    return beginTimeResult + " " + endTimeResult;
  }

  playVideoPreview(objectVideo): void {
    this.hasVideoPreview = true;
    this.srcVideoPreview = this.api.videoPreview(objectVideo);
    if (this.isApp) {
      this.video.play(this.srcVideoPreview);
    }
  }

  closedVideoPreview(): void {
    this.hasVideoPreview = false;
    this.srcVideoPreview = undefined;
  }

}
