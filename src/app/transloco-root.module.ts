import {
  provideTransloco,
  TranslocoModule
} from '@ngneat/transloco';
import { isDevMode, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';


@NgModule({
  exports: [ TranslocoModule ],
  providers: [
      provideTransloco({
        config: {
          availableLangs: ['en', 'es','fr', 'ca',' ru','zh','ja'],
          defaultLang: 'ca',
          fallbackLang: 'ca',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
          missingHandler: {
            logMissingKey: true // Muestra un mensaje cuando faltan claves
          }
        },
        loader: TranslocoHttpLoader
      }),
  ],
})
export class TranslocoRootModule {}
