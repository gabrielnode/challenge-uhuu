import { IVehicle } from '@/domain/model'

export interface IVehicleUsecase {
  getVehicleAll: () => Promise<IVehicle[]>
  addVehicle: (data: IVehicle) => Promise<IVehicle>
  updateVehicle: (id: string, data: IVehicle) => Promise<IVehicle>
  deleteVehicle: (id: string) => Promise<void>
}
