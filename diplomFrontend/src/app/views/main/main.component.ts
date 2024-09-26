import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {PopupService} from "../../shared/services/popup.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../shared/components/popup/popup.component";
import {PopupType} from "../../../types/popup.type";
import {PopupDataType} from "../../../types/popupData.type";
import {RelatedArticleType} from "../../../types/related-article.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  populars: RelatedArticleType[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 1240,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      1240: {
        items: 2
      },
      2480: {
        items: 3
      },
      3720: {
        items: 4
      }
    },
    nav: false
  };

  customOptionsReviews: OwlOptions = {
    loop: true,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      800: {
        items: 3
      }
    },
    nav: false
  };

  items = [
    {
      title: 'Продвижение в Instagram для вашего бизнеса <span>-15%!</span>',
      beforeTitle: 'Предложение месяца',
      serviceTitle: 'Продвижение',
      name: 'SMM',
      image: 'MainCarousel1.png',
      description: ''
    },
    {
      title: 'Нужен грамотный <span>копирайтер</span>?',
      beforeTitle: 'Акция',
      serviceTitle: 'Копирайтинг',
      name: 'Копирайтинг',
      image: 'MainCarousel2.png',
      description: 'Весь декабрь у нас действует акция на работу копирайтера.'
    },
    {
      title: '<span>6 место</span> в ТОП-10 SMM&#8288;-&#8288;агенств Москвы!',
      beforeTitle: 'Новость дня',
      serviceTitle: 'Продвижение',
      name: 'SMM',
      image: 'MainCarousel3.png',
      description: 'Мы благодарим каждого, кто голосовал за нас!'
    }
  ];

  services = [
    {
      image: 'service1.png',
      title: 'Создание сайтов',
      name: 'Фриланс',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 'От 7 500₽',
      url: '',
    },
    {
      image: 'service2.png',
      title: 'Продвижение',
      name: 'SMM',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 'От 3 500₽',
      url: '',
    },
    {
      image: 'service3.png',
      title: 'Реклама',
      name: 'Таргет',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 'От 1 000₽',
      url: '',
    },
    {
      image: 'service4.png',
      title: 'Копирайтинг',
      name: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 'От 750₽',
      url: '',
    },
  ];

  reviews = [
    {
      image: 'review1.png',
      name: 'Станислав',
      description: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    },
    {
      image: 'review2.png',
      name: 'Алёна',
      description: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
    },
    {
      image: 'review3.png',
      name: 'Мария',
      description: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
    },
  ];

  type: PopupType = PopupType.order;
  popupTitle: string = 'Заявка на услугу';
  buttonName: string = 'Оставить заявку';

  constructor(private articleService: ArticleService,
              private popupService: PopupService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.articleService.getPopular()
      .subscribe((data: RelatedArticleType[]) => {
        this.populars = data;
      })
  }

  openPopup(type: PopupType, popupTitle: string, buttonName: string, serviceName: string) {
    const data: PopupDataType = { type, popupTitle, buttonName, serviceName };
    this.dialog.open(PopupComponent, { data })
  }

}
