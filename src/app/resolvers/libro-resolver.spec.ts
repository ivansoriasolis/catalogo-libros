import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { libroResolver } from './libro-resolver';

describe('libroResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => libroResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
