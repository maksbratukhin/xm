import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;

  beforeEach(() => {
    component = new LoadingSpinnerComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a standalone component', () => {
    expect(LoadingSpinnerComponent).toBeDefined();
  });
});

