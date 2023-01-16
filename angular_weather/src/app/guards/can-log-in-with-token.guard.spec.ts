import { TestBed } from '@angular/core/testing';

import { CanLogInWithTokenGuard } from './can-log-in-with-token.guard';

describe('CanLogInWithTokenGuard', () => {
  let guard: CanLogInWithTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLogInWithTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
