import { inject, TestBed } from '@angular/core/testing';

import { AuthenticatedUserGuard } from './authenticated-user.guard';

describe('AuthenticatedUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatedUserGuard]
    });
  });

  it('should ...', inject([AuthenticatedUserGuard], (guard: AuthenticatedUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
