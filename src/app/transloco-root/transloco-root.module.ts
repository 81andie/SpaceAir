import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { TranslocoLoaderService } from '../vuelos/services/translocoLoader.service';


@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['ca', 'en', 'es', 'fr', 'de', 'ru', 'zh'],
        defaultLang: 'ca',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoLoaderService,
    }),
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TranslocoRootModule { }
