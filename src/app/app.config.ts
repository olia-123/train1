// import { ApplicationConfig, ModuleWithProviders, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
// import{TranslateModule,TranslateService,TranslateLoader} from'@ngx-translate/core';
// import{TranslateHttpLoader} from '@ngx-translate/http-loader';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
// importProvaidersForm(
//   HttpClientModule,
//   TranslateModule.forRoot({
//     loader:{
//       provide:TranslateLoader,
//       useFactory:HttpLoaderFactory,
//       deps:[HttpClient]
//     }
//   })

// )
//   ]
// };

// export function HttpLoaderFactory(http:HttpClient){
//   return new TranslateHttpLoader(http,'/118n/' ,'/json/' )
// }

// function importProvaidersForm(HttpClientModule: typeof HttpClientModule, arg1: ModuleWithProviders<TranslateModule>): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
//   throw new Error('Function not implemented.');
// }
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '/i18n/', '/json/');
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}