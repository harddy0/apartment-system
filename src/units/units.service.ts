import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  create(createUnitDto: CreateUnitDto) {
    const unit = this.unitRepository.create({
      ...createUnitDto,
      property: { id: createUnitDto.property_id },
    });
    return this.unitRepository.save(unit);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.unitRepository, {
      sortableColumns: ['id', 'unit_number', 'created_at', 'updated_at'],
      searchableColumns: ['unit_number'],
      filterableColumns: {
        status: true,
        is_active: true,
        property_id: true,
      },
      defaultSortBy: [['created_at', 'DESC']],
      defaultLimit: 10,
      maxLimit: 50,
      relations: ['property'],
    });
  }

  async findOne(id: number) {
    const unit = await this.unitRepository.findOne({ where: { id }, relations: ['property'] });
    if (!unit) throw new NotFoundException(`Unit #${id} not found`);
    return unit;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.unitRepository.preload({
      id,
      ...updateUnitDto,
      property: updateUnitDto.property_id ? { id: updateUnitDto.property_id } : undefined,
    });
    if (!unit) throw new NotFoundException(`Unit #${id} not found`);
    return this.unitRepository.save(unit);
  }

  async remove(id: number) {
    const unit = await this.findOne(id);
    return this.unitRepository.remove(unit);
  }
}
