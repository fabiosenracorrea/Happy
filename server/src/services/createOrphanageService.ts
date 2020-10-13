import { getRepository } from 'typeorm';

import Orphanage from '../entities/Orphanage';

import AppError from '../Errors/AppError';

interface OrphanageDTO {
  name: string;
  about: string;
  instructions: string;
  open_on_weekends: boolean;
  opening_hours: string;
  latitude: number;
  longitude: number;
  images: { path: string }[];
}

class CreateOrphanageService {
  public async execute(orphanageData: OrphanageDTO): Promise<Orphanage> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    } = orphanageData;

    if (
      !name ||
      !instructions ||
      !longitude ||
      !latitude ||
      !about ||
      open_on_weekends === undefined ||
      !opening_hours ||
      !images.length
    ) {
      throw new AppError('Missing required orphanage information', 401);
    }

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = orphanageRepository.create(orphanageData);

    await orphanageRepository.save(orphanage);

    return orphanage;
  }
}

export default CreateOrphanageService;
