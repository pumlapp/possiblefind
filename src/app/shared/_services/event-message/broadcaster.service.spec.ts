import { TestBed, inject } from '@angular/core/testing';

import { Broadcaster } from './broadcaster.service';

describe('BroadcasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Broadcaster]
    });
  });

  it('should be created', inject([Broadcaster], (service: Broadcaster) => {
    expect(service).toBeTruthy();
  }));
});
