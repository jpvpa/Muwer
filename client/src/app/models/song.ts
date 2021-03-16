export class Song {
    constructor(
       public number:Number,
       public name: String,
       public duration:String,
       public file:any,
       public explicit: Boolean,
       public album: string,
       public _id?:string
    ){}
}