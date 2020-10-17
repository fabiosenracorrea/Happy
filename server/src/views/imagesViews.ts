import Image from '../entities/Images';

export default class ImageView {
  public static render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  }

  public static renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
}
