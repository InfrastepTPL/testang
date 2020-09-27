import Icon from 'src/assets/plugins/formvalidation/src/js/plugins/Icon';

export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
        } ,
        {
          title: 'Customers',

          desc: 'Customers',
          alignment: 'left',
          page: '/customers',
          icon: 'flaticon-line-graph'
        },
        {
          title: 'Order',

          desc: 'Order',
          alignment: 'left',
          page: '/order'
        }
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Customers',

          desc: 'Customers',
          alignment: 'left',
          page: '/customerse',
          icon: 'flaticon-line-graph'
        },
        {
          title: 'Order',

          desc: 'Order',
          alignment: 'left',
          page: '/order',
          //icon: './assets/media/svg/icons/Communication/Clipboard-check.svg'
        }
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
