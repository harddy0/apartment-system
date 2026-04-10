import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  create(createPropertyDto: CreatePropertyDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const property = this.propertyRepository.create(createPropertyDto);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.propertyRepository.save(property);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.propertyRepository, {
      sortableColumns: ['id', 'name', 'code', 'created_at', 'updated_at'],
      searchableColumns: ['name', 'code', 'city', 'province', 'country'],
      filterableColumns: {
        status: true,
        city: true,
        province: true,
      },
      defaultSortBy: [['created_at', 'DESC']],
      defaultLimit: 10,
      maxLimit: 50,
    });
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property) throw new NotFoundException(`Property #${id} not found`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const property = await this.propertyRepository.preload({
      id,
      ...updatePropertyDto,
    });
    if (!property) throw new NotFoundException(`Property #${id} not found`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.propertyRepository.save(property);
  }

  async remove(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const property = await this.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.propertyRepository.remove(property);
  }
}
