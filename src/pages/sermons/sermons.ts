import { Component, Provider } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AudioProvider } from 'ionic-audio';


@IonicPage()
@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html',
})
export class SermonsPage {
  myTracks: any[];
  allTracks: any[];
  selectedTrack;
  constructor( public navCtrl: NavController, public navParams: NavParams) {

    /* private _audioProvider: AudioProvider,
    this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'assets/imgs/Play-Icon.png',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    },
    {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'assets/imgs/Play-Icon.png',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }]; */


  }

  /* ngAfterContentInit() {

    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
     // use AudioProvider to control selected track
     this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad SermonsPage');
  }

}
