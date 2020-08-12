import { Component, OnInit } from '@angular/core';

import { Flower } from '../../components/flower';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'app-foods-in-bloom',
  templateUrl: './foods-in-bloom.component.html',
  styleUrls: ['./foods-in-bloom.component.css']
})
export class FoodsInBloomComponent implements OnInit {
  flowers: Flower[];

  constructor(private flowerService: FlowerService) { }

  ngOnInit() {
    this.getFlowers();
  }

  getFlowers(): void {
    this.flowerService.getFlowers()
      .subscribe(flowers => this.flowers = flowers);
  }

  displayFlower(image: string): void {
    const preview = document.getElementById('flower-preview');
    preview.style.display = 'block';
    preview.style.backgroundImage = `url(../../../..${image})`;
    preview.style.backgroundSize = 'cover';
    preview.style.filter = 'opacity(.2)';
  }
}
