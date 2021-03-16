import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ulist = [
    {
      description: "Play any track"
    },
    {
      description: "Listen offline"
    },
    {
      description: "No ad interruptions"
    },
    {
      description: "Unlimited skips"
    },
    {
      description: "High quality audio"
    },
    {
      description: "Shuffle play"
    }
  ];

  hiw = [
    {
      title: "Create an account",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis praesentium minima nobis sint illo voluptatibus.",
      image: "../../../assets/images/undraw_sculpting_1c9p.svg"
    },
    {
      title: "Choose a plan",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aliquam mollitia delectus similique necessitatibus rerum explicabo maxime.",
      image: "../../../assets/images/undraw_discoverable_xwsc.svg"
    },
    {
      title: "Download Music",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sunt quaerat cum dignissimos hic expedita vero labore reprehenderit.",
      image: "../../../assets/images/undraw_download_files_aydf.svg"
    }
  ]
}
