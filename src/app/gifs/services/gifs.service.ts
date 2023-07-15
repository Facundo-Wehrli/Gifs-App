import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gif.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'CnbAxMAAmWjr7KoVsu7dgUV0G7uHbIZX';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  /**
   * The `organizeHistory` function takes a tag as input, converts it to lowercase, removes any
   * occurrences of the tag from the history, adds the tag to the beginning of the history, and keeps
   * only the last 10 tags in the history.
   * @param {string} tag - The `tag` parameter is a string that represents a tag to be organized in the
   * history.
   */
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    // si no hay nada en el historial, no se hace nada
    if(this._tagsHistory.length === 0)return;

// If there is something, you will look for the first element of the history
    this.searchTag(this._tagsHistory[0]);
  }
 
  searchTag(tag: string): void {
    // it prevents a blank tag from appearing in the sidebar if the user press enter
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    /*  creating an instance of the `HttpParams` class and setting three parameters:
`api_key`, `limit`, and `q`. */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    /*  making an HTTP GET request to the Giphy API to search for GIFs based on a given
tag. */
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
