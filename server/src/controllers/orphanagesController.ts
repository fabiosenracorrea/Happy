import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../entities/Orphanage';

import AppError from '../Errors/AppError';

import OrphanageView from '../views/orphanageViews';
import CreateOrphanageService from '../services/createOrphanageService';

export default class OrphanagesControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanageList = await orphanagesRepository.find({
      relations: ['images'],
    });

    return response.status(200).json(OrphanageView.renderMany(orphanageList));
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!orphanage) {
      throw new AppError('Invalid Orphanage ID provided');
    }

    return response.status(200).json(OrphanageView.render(orphanage));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanageImages = request.files as Express.Multer.File[];
    const images = orphanageImages.map(file => ({ path: file.filename }));

    const createOrphanageService = new CreateOrphanageService();

    const createdOrphanage = await createOrphanageService.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    return response.status(201).json(createdOrphanage);
  }
}
