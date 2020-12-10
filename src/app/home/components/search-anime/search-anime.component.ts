import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { SearchImage } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss'],
})
export class SearchAnimeComponent implements OnInit {

  imageUrl: string;
  imageBase64: string;
  imagePreview: string;

  resultSearch: SearchImage;

  @Output() changeResultSearch: EventEmitter<any> = new EventEmitter();

  hasErrorImagePreview: boolean;
  isConcluiedLoading: boolean;
  loading: any;

  constructor(
    private camera: Camera,
    private api: ApiService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message
    });
    return this.loading.present();
  }

  selectedImage(): void {
    var options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
    };
    this.presentLoading('Renderizando imagem...');
    this.camera.getPicture(options).then((imageData) => {
      this.imageBase64 = "data:image/png;base64," + imageData;
      this.imagePreview = "data:image/png;base64," + imageData;
    }, (error) => {
      this.loading.dismiss();
    });
  }

  search(): void {

    this.presentLoading('Procurando...');

    if (this.imageUrl && !this.imageBase64) {
      this.api.searchImageUrl(this.imageUrl).subscribe((data) => {
        this.resultSearch = data;
        this.changeResultSearch.emit(this.resultSearch.docs.filter(t=>t.is_adult == false));
        console.log(this.resultSearch);
        this.loading.dismiss();
      });
    }
    else if (!this.imageUrl && this.imageBase64) {
      this.api.searchImageBase64(this.imageBase64).subscribe((data) => {
        this.resultSearch = data;
        this.changeResultSearch.emit(this.resultSearch.docs.filter(t=>t.is_adult == false));
        console.log(this.resultSearch);
        this.loading.dismiss();
      });
      
    }
    
  }

  clear(): void {
    this.imageUrl = undefined;
    this.imageBase64 = undefined;
    this.imagePreview = undefined;
    this.resultSearch = undefined;
    this.changeResultSearch.emit(undefined);
    this.isConcluiedLoading = false;
  }

  onChangeUrl($event){
    this.imagePreview = $event.target.value;
    this.hasErrorImagePreview = false;
    this.presentLoading('Renderizando imagem...');
  }

  errorLoading(): void {
    this.hasErrorImagePreview = true;
    this.loading.dismiss();
  }

  concluiedLoading(): void {
    this.isConcluiedLoading = true;
    this.loading.dismiss();
  }

}
