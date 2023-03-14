import { Request, Response } from "express";
import {
  IRealEstate,
  IRealEstateReturn,
} from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstate/createRealEstate.services";
import { listRealEstateService } from "../services/realEstate/listRealEstate.services";

export const createRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateData: IRealEstate = request.body;

  const newRealEstate: IRealEstateReturn = await createRealEstateService(
    realEstateData
  );

  return response.status(201).json(newRealEstate);
};

export const listRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstates = await listRealEstateService();

  return response.json(realEstates);
};
