import { TestBed } from '@angular/core/testing';

import { LibroServicio } from './libro-servicio';

describe('LibroServicio', () => {
  let service: LibroServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
