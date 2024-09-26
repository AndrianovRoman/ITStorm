
export class CategoriesNameUtil {
  static getCategoriesName(name: string | undefined | null): { nameForClients: string } {

    let nameForClients = '';

    switch (name) {
      case 'Фриланс':
        nameForClients = 'Создание сайтов';
        break;
      case 'SMM':
        nameForClients = 'Продвижение';
        break;
      case 'Таргет':
        nameForClients = 'Реклама';
        break;
      case 'Копирайтинг':
        nameForClients = 'Копирайтинг';
        break;
      case 'Дизайн':
        nameForClients = 'Дизайн';
        break;
    }

    return { nameForClients };

  }
}
