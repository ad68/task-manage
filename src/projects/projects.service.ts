import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import ProjectStatusEnum from './enum/projectStatusEnum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) { }
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const newProject = this.projectRepository.create(createProjectDto)
      return await this.projectRepository.save(newProject)
    }
    catch (error) {
      throw new BadRequestException("error creating project")
    }
  }

  async findAll(status?: ProjectStatusEnum, limit: number = 10, page: number = 1) {
    const query = this.projectRepository.createQueryBuilder('projects')
    if (status) {
      query.where('status = :x', { x: status })
    }
    query.skip((page - 1) * limit).take(limit)
    return await query.getMany();
  }

  findOne(id: number) {
    return this.projectRepository.findOneBy({ id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
