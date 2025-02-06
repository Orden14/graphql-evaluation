import { NgModule } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { ApolloLink } from '@apollo/client/link/core';
import { setContext } from '@apollo/client/link/context';

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const http = httpLink.create({ uri: 'http://localhost:4000' });
        const auth = setContext((operation, context) => {
          const token = sessionStorage.getItem('JwT');
          if (token) {
            return {
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
          } else {
            return {};
          }
        });

        return {
          link: ApolloLink.from([auth, http]),
          cache: new InMemoryCache()
        };
      },
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule { }