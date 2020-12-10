import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchImage } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL da API
  baseUrl: string = "https://trace.moe/";

  constructor(
    private http: HttpClient
  ) {}

  /*
   *  Procura o anime por imagem
   *  ImageBase64 -> Imagem em base64
   */
  searchImageBase64(ImageBase64: any): Observable<SearchImage> {
    return this.http.post<SearchImage>( this.baseUrl + "api/search", { image: ImageBase64} );
  }
  searchImageUrl(ImageUrl: any): Observable<SearchImage> {
    return this.http.get<SearchImage>( this.baseUrl + "api/search?url=" + ImageUrl );
  }

  imageThumbnail(objectImage): string {
    return this.baseUrl + "thumbnail.php?anilist_id=" + objectImage.anilist_id + "&file=" + encodeURIComponent(objectImage.filename) + "&t=" + objectImage.at + "&token=" + objectImage.tokenthumb;
  }

  videoPreview(objectVideo): string {
    return "https://media.trace.moe/video/" + objectVideo.anilist_id + "/" + encodeURIComponent(objectVideo.filename) + "?t=" + objectVideo.at + "&token=" + objectVideo.tokenthumb;
  }
}
