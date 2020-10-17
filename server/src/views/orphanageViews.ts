import Orphanage from '../entities/Orphanage';

import ImageView from './imagesViews';

export default class OrphanageView {
  public static render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      whatsapp: orphanage.whatsapp,
      images: ImageView.renderMany(orphanage.images),
    };
  }

  public static renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  }
}
