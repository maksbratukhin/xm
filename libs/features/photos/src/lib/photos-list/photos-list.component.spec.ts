import { PhotosListComponent } from './photos-list.component';

describe('PhotosListComponent', () => {
  it('should be defined', () => {
    expect(PhotosListComponent).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof PhotosListComponent).toBe('function');
  });

  it('should have a name', () => {
    expect(PhotosListComponent.name).toBe('PhotosListComponent');
  });
});
