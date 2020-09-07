export class Song {
    constructor(
       public number:Number,
       public name: String,
       public duration:String,
       public file:String,
       public explicit: Boolean,
       public album: string
    ){}
}