import { BadRequestException } from '@nestjs/common';
import { RegistryType } from '../enums/registry-type.enum';
import { v4 } from 'uuid';

export class ClokingEvents {
  id: string;
  userId: string;
  date: Date;
  time: Date;
  type: RegistryType;

  constructor(
    type: RegistryType,
    userId: string,
    date?: Date,
    id?: string,
    time?: Date,
  ) {
    if (![RegistryType.IN, RegistryType.OUT].includes(type)) {
      throw new Error('Tipo de registro inválido.');
    }

    if (!userId) {
      throw new Error('O ID do usuário é obrigatório.');
    }
    this.date = date ?? new Date();
    this.time = time ?? new Date();
    this.type = type;
    this.userId = userId;
    this.id = id ?? v4();
  }

  checkDateDifference(otherDate: Date): void {
    const differenceInMilliseconds = Math.abs(
      this.time.getTime() - otherDate.getTime(),
    );
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    if (differenceInMinutes <= 1) {
      throw new BadRequestException(
        'As duas datas não têm mais que um minuto de diferença.',
      );
    }
  }
}
