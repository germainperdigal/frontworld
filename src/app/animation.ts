import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeAnimation =

  trigger('fadeAnimation', [

    transition( '* => *', [

      query(':enter',
        [
          style({transform: 'translateX(100%)'})
        ],
        { optional: true }
      ),

      query(':leave',
        [
          style({transform: 'translateX(0%)'}),
          animate('0.3s ease', style({transform: 'translateX(-100%)'}))
        ],
        { optional: true }
      ),

      query(':enter',
        [
          style({transform: 'translateX(100%)'}),
          animate('0.3s ease', style({transform: 'translateX(0%)'}))
        ],
        { optional: true }
      )

    ])

  ]);
